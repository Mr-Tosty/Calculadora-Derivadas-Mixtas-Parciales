class MathModel {
  constructor() {
    this.math = window.math;
  }

  calculateDerivative(expression, order = 1) {
    let currentExpr = expression;
    let steps = [];

    for (let i = 1; i <= order; i++) {
      let derivedNode = this.math.derivative(currentExpr, 'x');
      let resultString = derivedNode.toString();
      steps.push({
        step: i,
        type: 'Derivada',
        input: currentExpr,
        output: resultString
      });
      currentExpr = resultString;
    }

    return { steps, finalResult: currentExpr };
  }

  calculateIntegral(expression, order = 1) {
    let currentExpr = expression;
    let steps = [];

    for (let i = 1; i <= order; i++) {
      let integratedResult = this._integrateExpression(currentExpr);
      steps.push({
        step: i,
        type: 'Integral',
        input: currentExpr,
        output: integratedResult
      });
      currentExpr = integratedResult;
    }

    return { steps, finalResult: currentExpr + " + C" };
  }

  _integrateExpression(exprStr) {
    try {
      let node = this.math.parse(exprStr);
      if (node.isSymbol && node.name === 'x') return '(x^2)/2';
      if (node.isConstant) return `(${node.value} * x)`;
      if (node.isOperator && node.op === '^') {
        if (node.args[0].isSymbol && node.args[0].name === 'x' && node.args[1].isConstant) {
          let n = node.args[1].value;
          return n !== -1 ? `(x^${n + 1})/${n + 1}` : 'ln(|x|)';
        }
      }
      return `∫(${exprStr})dx`;
    } catch (err) {
      return `∫(${exprStr})dx`;
    }
  }

  calculateMixedDerivative(expression, type) {
    let steps = [];
    let finalResult = "";

    if (type === 'dx2') {
      let d1 = this.math.derivative(expression, 'x').toString();
      let d2 = this.math.derivative(d1, 'x').toString();
      steps = [{ step: 1, type: '1ª Derivada respecto a X', output: d1 }, { step: 2, type: '2ª Derivada respecto a X²', output: d2 }];
      finalResult = d2;
    } else if (type === 'dy2') {
      let d1 = this.math.derivative(expression, 'y').toString();
      let d2 = this.math.derivative(d1, 'y').toString();
      steps = [{ step: 1, type: '1ª Derivada respecto a Y', output: d1 }, { step: 2, type: '2ª Derivada respecto a Y²', output: d2 }];
      finalResult = d2;
    } else if (type === 'dydx') {
      let d1 = this.math.derivative(expression, 'x').toString();
      let d2 = this.math.derivative(d1, 'y').toString();
      steps = [{ step: 1, type: '1ª Derivada respecto a X', output: d1 }, { step: 2, type: 'Derivada Mixta (respecto a Y)', output: d2 }];
      finalResult = d2;
    } else if (type === 'dxdy') {
      let d1 = this.math.derivative(expression, 'y').toString();
      let d2 = this.math.derivative(d1, 'x').toString();
      steps = [{ step: 1, type: '1ª Derivada respecto a Y', output: d1 }, { step: 2, type: 'Derivada Mixta (respecto a X)', output: d2 }];
      finalResult = d2;
    }
    return { steps, finalResult };
  }

  evaluatePoints(expression, xValues) {
    let yValues = [];
    try {
      let compiled = this.math.compile(expression.replace(/∫|\+ C/g, ''));
      xValues.forEach(x => {
        try {
          let y = compiled.evaluate({ x: x });
          yValues.push(typeof y === 'number' && !isNaN(y) ? y : null);
        } catch {
          yValues.push(null);
        }
      });
    } catch (e) {
      yValues = xValues.map(() => null);
    }
    return yValues;
  }

  evaluateSurfacePoints(expression) {
    try {
      let compiled = this.math.compile(expression);
      let xValues = Array.from({ length: 21 }, (_, i) => -5 + i * 0.5);
      let yValues = Array.from({ length: 21 }, (_, i) => -5 + i * 0.5);
      let zMatrix = [];

      xValues.forEach(x => {
        let row = [];
        yValues.forEach(y => {
          try {
            let z = compiled.evaluate({ x: x, y: y });
            row.push(typeof z === 'number' && !isNaN(z) ? z : 0);
          } catch {
            row.push(0);
          }
        });
        zMatrix.push(row);
      });
      return { x: xValues, y: yValues, z: zMatrix };
    } catch (e) {
      return null;
    }
  }
}

class MathView {
  constructor() {
    this.functionInput = document.getElementById('function-input');
    this.operationSelect = document.getElementById('operation-type');
    this.orderSelect = document.getElementById('order-select');
    this.btnCalculate = document.getElementById('btn-calculate');
    this.btnPower = document.getElementById('btn-power');
    this.btnToggleHelp = document.getElementById('btn-toggle-help');
    this.helpContent = document.getElementById('help-content');
    this.resultsDisplay = document.getElementById('results-display');

    this.initChart();
    this.initLightbox();
  }

  initChart() {
    const canvas = document.getElementById('math-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          { label: 'Función Original f(x)', borderColor: '#3498db', data: [], borderWidth: 3, tension: 0.3 },
          { label: 'Resultado', borderColor: '#2ecc71', data: [], borderWidth: 3, borderDash: [5, 5], tension: 0.3 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  initLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox) return;

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('tutorial-img') && e.target.src) {
        lightboxImg.src = e.target.src;
        lightbox.classList.add('active');
      }
    });

    const closeLightbox = () => lightbox.classList.remove('active');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  renderResults(steps, finalResult) {
    if (!this.resultsDisplay) return;
    this.resultsDisplay.innerHTML = '';
    steps.forEach(s => {
      let div = document.createElement('div');
      div.className = 'step-item';
      div.innerHTML = `<strong>Paso ${s.step} (${s.type}):</strong> <code>${s.output}</code>`;
      this.resultsDisplay.appendChild(div);
    });
    let finalDiv = document.createElement('div');
    finalDiv.className = 'final-result';
    finalDiv.innerHTML = `✨ Resultado Final: <code>${finalResult}</code>`;
    this.resultsDisplay.appendChild(finalDiv);
  }

  renderMixedResults(steps, finalResult) {
    const display = document.getElementById('mixed-results-display');
    if (!display) return;
    display.innerHTML = '';
    steps.forEach(s => {
      let div = document.createElement('div');
      div.className = 'step-item';
      div.innerHTML = `<strong>Paso ${s.step} (${s.type}):</strong> <code>${s.output}</code>`;
      display.appendChild(div);
    });
    let finalDiv = document.createElement('div');
    finalDiv.className = 'final-result';
    finalDiv.innerHTML = `✨ Derivada Mixta Final: <code>${finalResult}</code>`;
    display.appendChild(finalDiv);
  }

  updateChart(xValues, yOriginal, yResult) {
    if (!this.chart) return;
    this.chart.data.labels = xValues;
    this.chart.data.datasets[0].data = yOriginal;
    this.chart.data.datasets[1].data = yResult;
    this.chart.update();
  }

  render3DSurface(surfaceData, title = "Superficie 3D") {
    if (!surfaceData || typeof Plotly === 'undefined') return;
    const data = [{ z: surfaceData.z, x: surfaceData.x, y: surfaceData.y, type: 'surface', colorscale: 'Viridis' }];
    const layout = { title: title, autosize: true, margin: { l: 20, r: 20, b: 20, t: 40 } };
    Plotly.newPlot('math-chart-container', data, layout, { responsive: true });
  }

  toggleHelp() {
    if (this.helpContent) this.helpContent.classList.toggle('hidden');
  }

  toggleModal(show) {
    const modal = document.getElementById('tutorial-modal');
    if (!modal) return;
    if (show) modal.classList.add('active');
    else modal.classList.remove('active');
  }

  showErrorToast(message) {
    if (!this.resultsDisplay) return;
    const existing = document.querySelector('.error-toast');
    if (existing) existing.remove();

    let toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `⚠️ ${message}`;
    this.resultsDisplay.prepend(toast);
    setTimeout(() => { toast.remove(); }, 4500);
  }
}

class MathController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bindEvents();
  }

  bindEvents() {
    const stdSectionKeys = document.querySelectorAll('.input-section .btn-key');
    stdSectionKeys.forEach(btn => {
      btn.addEventListener('click', (e) => {
        let text = e.target.getAttribute('data-insert');
        if (text && this.view.functionInput) {
          this.view.functionInput.value += text;
          this.view.functionInput.focus();
        }
      });
    });

    if (this.view.btnPower && this.view.functionInput) {
      this.view.btnPower.addEventListener('click', () => {
        this.view.functionInput.value += '^';
        this.view.functionInput.focus();
      });
    }

    const mixedInput = document.getElementById('mixed-function-input');
    const mixedSectionKeys = document.querySelectorAll('.mixed-section .btn-key');
    mixedSectionKeys.forEach(btn => {
      btn.addEventListener('click', (e) => {
        let text = e.target.getAttribute('data-insert');
        if (text && mixedInput) {
          mixedInput.value += text;
          mixedInput.focus();
        }
      });
    });

    if (this.view.btnCalculate) {
      this.view.btnCalculate.addEventListener('click', () => this.handleCalculation());
    }

    const btnCalculateMixed = document.getElementById('btn-calculate-mixed');
    if (btnCalculateMixed) {
      btnCalculateMixed.addEventListener('click', () => this.handleMixedCalculation());
    }

    if (this.view.btnToggleHelp) {
      this.view.btnToggleHelp.addEventListener('click', () => this.view.toggleHelp());
    }

    const floatingBtn = document.getElementById('btn-floating-help');
    const modalClose = document.getElementById('modal-close');
    const tutorialModal = document.getElementById('tutorial-modal');

    if (floatingBtn) {
      floatingBtn.addEventListener('click', () => this.view.toggleModal(true));
    }
    if (modalClose && tutorialModal) {
      modalClose.addEventListener('click', () => this.view.toggleModal(false));
      tutorialModal.addEventListener('click', (e) => {
        if (e.target === tutorialModal) this.view.toggleModal(false);
      });
    }
  }

  handleCalculation() {
    const exprInput = this.view.functionInput;
    if (!exprInput) return;
    let expr = exprInput.value.trim();
    const op = this.view.operationSelect.value;
    const order = parseInt(this.view.orderSelect.value);

    if (!expr) {
      this.view.showErrorToast("¡Ups, revisa tu función mágica! El campo está vacío.");
      return;
    }

    try {
      let calculationResult;
      if (op === 'derivative') {
        calculationResult = this.model.calculateDerivative(expr, order);
      } else {
        calculationResult = this.model.calculateIntegral(expr, order);
      }

      const xValues = Array.from({ length: 41 }, (_, i) => -10 + i * 0.5);
      const yOriginal = this.model.evaluatePoints(expr, xValues);
      
      if (yOriginal.every(val => val === null)) {
        throw new Error("Sintaxis inválida.");
      }

      const yResult = this.model.evaluatePoints(calculationResult.finalResult, xValues);
      this.view.renderResults(calculationResult.steps, calculationResult.finalResult);
      this.view.updateChart(xValues, yOriginal, yResult);

    } catch (error) {
      this.view.showErrorToast("¡Sintaxis incorrecta! Restaurando ejemplo válido (x^2).");
      exprInput.value = "x^2";
      let fallbackResult = this.model.calculateDerivative("x^2", 1);
      this.view.renderResults(fallbackResult.steps, fallbackResult.finalResult);
      
      const xValues = Array.from({ length: 41 }, (_, i) => -10 + i * 0.5);
      const yOriginal = this.model.evaluatePoints("x^2", xValues);
      const yResult = this.model.evaluatePoints(fallbackResult.finalResult, xValues);
      this.view.updateChart(xValues, yOriginal, yResult);
    }
  }

  handleMixedCalculation() {
    const exprInput = document.getElementById('mixed-function-input');
    if (!exprInput) return;
    let expr = exprInput.value.trim();
    const orderType = document.getElementById('mixed-order-select').value;

    if (!expr) {
      this.view.showErrorToast("¡Ups, revisa tu función multivariable! El campo está vacío.");
      return;
    }

    try {
      let result = this.model.calculateMixedDerivative(expr, orderType);
      let surfaceData = this.model.evaluateSurfacePoints(result.finalResult);
      if (!surfaceData) throw new Error("Sintaxis multivariable inválida.");

      this.view.renderMixedResults(result.steps, result.finalResult);
      this.view.render3DSurface(surfaceData, `Superficie 3D: ${result.finalResult}`);

    } catch (error) {
      this.view.showErrorToast("¡Sintaxis multivariable incorrecta! Restaurando ejemplo válido (x^2 * y + y^3).");
      exprInput.value = "x^2 * y + y^3";
      let fallbackResult = this.model.calculateMixedDerivative("x^2 * y + y^3", orderType);
      let surfaceData = this.model.evaluateSurfacePoints(fallbackResult.finalResult);
      
      this.view.renderMixedResults(fallbackResult.steps, fallbackResult.finalResult);
      this.view.render3DSurface(surfaceData, `Superficie 3D: ${fallbackResult.finalResult}`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new MathModel();
  const view = new MathView();
  new MathController(model, view);
});