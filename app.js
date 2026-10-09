/**
 * Shriya - COA (25CST-238) Academic Platform
 * Core Application Logic & Interactive Hardware Simulators
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initAboutTabs();
  initToolTabs();
  initNumberConverter();
  initInstructionFormator();
  initGallery();
  initAssignment();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  const currentTheme = localStorage.getItem('shriya_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme, themeIcon);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('shriya_theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-moon theme-icon';
  } else {
    icon.className = 'fa-solid fa-sun theme-icon';
  }
}

/* ==========================================================================
   2. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Active section scrollspy
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. ABOUT ME TABS
   ========================================================================== */
function initAboutTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. COA TOOLS TAB SWITCHER
   ========================================================================== */
function initToolTabs() {
  const switchBtns = document.querySelectorAll('.tool-switch-btn');
  const toolViews = document.querySelectorAll('.tool-view');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      toolViews.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. NUMBER SYSTEM CONVERTER (COA TOOL 1)
   ========================================================================== */
function initNumberConverter() {
  const inputEl = document.getElementById('converterInput');
  const inputBaseEl = document.getElementById('inputBase');
  const outputBaseEl = document.getElementById('outputBase');
  const outputEl = document.getElementById('converterOutput');
  const swapBtn = document.getElementById('swapBaseBtn');
  const clearBtn = document.getElementById('clearInputBtn');
  const copyBtn = document.getElementById('copyOutputBtn');
  const validationEl = document.getElementById('inputValidationMsg');

  function runConversion() {
    const rawVal = inputEl.value.trim().toUpperCase();
    const inBase = parseInt(inputBaseEl.value, 10);
    const outBase = parseInt(outputBaseEl.value, 10);

    if (!rawVal) {
      outputEl.value = '';
      validationEl.textContent = '';
      updateAllBases(null);
      renderExplanation(null, inBase, outBase);
      return;
    }

    // Validate Input based on input base
    const validPattern = getValidationRegex(inBase);
    if (!validPattern.test(rawVal)) {
      validationEl.textContent = `Invalid character for Base ${inBase} (${getBaseName(inBase)}). Allowed digits: ${getBaseDigits(inBase)}`;
      outputEl.value = 'Invalid Input';
      updateAllBases(null);
      renderExplanation(null, inBase, outBase);
      return;
    }

    validationEl.textContent = '';

    try {
      // Parse to BigInt or Integer
      // Support for fractional numbers as well
      let decValue = 0;
      let isFractional = rawVal.includes('.');
      let result = '';

      if (!isFractional) {
        // Standard Integer conversion
        const decimalInt = parseInt(rawVal, inBase);
        if (isNaN(decimalInt)) throw new Error('NaN');
        result = decimalInt.toString(outBase).toUpperCase();
        outputEl.value = result;
        updateAllBases(decimalInt);
        renderExplanation({ raw: rawVal, dec: decimalInt, res: result, isFrac: false }, inBase, outBase);
      } else {
        // Fractional conversion
        const [intPart, fracPart] = rawVal.split('.');
        let decInt = parseInt(intPart || '0', inBase);
        let decFrac = 0;
        for (let i = 0; i < fracPart.length; i++) {
          const digit = parseInt(fracPart[i], inBase);
          decFrac += digit / Math.pow(inBase, i + 1);
        }
        const totalDec = decInt + decFrac;

        // Convert to outBase
        const outIntPart = decInt.toString(outBase).toUpperCase();
        let outFracPart = '';
        let remFrac = decFrac;
        let precision = 6;
        while (remFrac > 0 && precision-- > 0) {
          remFrac *= outBase;
          const whole = Math.floor(remFrac);
          outFracPart += whole.toString(outBase).toUpperCase();
          remFrac -= whole;
        }

        result = outFracPart ? `${outIntPart}.${outFracPart}` : outIntPart;
        outputEl.value = result;
        updateAllBases(totalDec);
        renderExplanation({ raw: rawVal, dec: totalDec, res: result, isFrac: true }, inBase, outBase);
      }

      // Update output meta
      const meta = document.getElementById('outputMeta');
      if (meta) {
        meta.textContent = `Length: ${result.replace('.', '').length} symbols • Base: ${outBase} (${getBaseName(outBase)})`;
      }
    } catch (err) {
      validationEl.textContent = 'Conversion error: Number exceeds supported range';
      outputEl.value = 'Overflow';
    }
  }

  // Event Listeners
  inputEl.addEventListener('input', runConversion);
  inputBaseEl.addEventListener('change', runConversion);
  outputBaseEl.addEventListener('change', runConversion);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      runConversion();
      inputEl.focus();
    });
  }

  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const prevInBase = inputBaseEl.value;
      const prevOutBase = outputBaseEl.value;
      const prevOutVal = outputEl.value;

      inputBaseEl.value = prevOutBase;
      outputBaseEl.value = prevInBase;
      if (prevOutVal && prevOutVal !== 'Invalid Input') {
        inputEl.value = prevOutVal;
      }
      runConversion();
      showToast('Swapped Input & Output Bases', 'info');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const val = outputEl.value;
      if (val && val !== 'Invalid Input') {
        copyText(val);
      }
    });
  }

  // Initial Run
  runConversion();
}

function getValidationRegex(base) {
  switch (base) {
    case 2: return /^[01]+(\.[01]+)?$/;
    case 8: return /^[0-7]+(\.[0-7]+)?$/;
    case 10: return /^[0-9]+(\.[0-9]+)?$/;
    case 16: return /^[0-9A-F]+(\.[0-9A-F]+)?$/i;
    default: return /^[0-9]+$/;
  }
}

function getBaseName(base) {
  switch (base) {
    case 2: return 'Binary';
    case 8: return 'Octal';
    case 10: return 'Decimal';
    case 16: return 'Hexadecimal';
    default: return `Base ${base}`;
  }
}

function getBaseDigits(base) {
  switch (base) {
    case 2: return '0, 1';
    case 8: return '0 through 7';
    case 10: return '0 through 9';
    case 16: return '0-9, A, B, C, D, E, F';
    default: return 'valid digits';
  }
}

function updateAllBases(num) {
  const allDec = document.getElementById('allDec');
  const allBin = document.getElementById('allBin');
  const allHex = document.getElementById('allHex');
  const allOct = document.getElementById('allOct');

  if (num === null || isNaN(num)) {
    allDec.textContent = '-';
    allBin.textContent = '-';
    allHex.textContent = '-';
    allOct.textContent = '-';
    return;
  }

  const intVal = Math.floor(num);
  allDec.textContent = intVal.toString(10);

  // Format binary into 4-bit nibbles
  let binStr = intVal.toString(2);
  while (binStr.length % 4 !== 0) binStr = '0' + binStr;
  binStr = binStr.match(/.{1,4}/g)?.join(' ') || binStr;
  allBin.textContent = binStr;

  allHex.textContent = '0x' + intVal.toString(16).toUpperCase();
  allOct.textContent = '0' + intVal.toString(8);
}

function renderExplanation(data, inBase, outBase) {
  const container = document.getElementById('stepBreakdownText');
  if (!container) return;

  if (!data) {
    container.textContent = 'Please enter a valid number above to generate step-by-step conversion steps.';
    return;
  }

  let text = `========================================================\n`;
  text += `CONVERSION BREAKDOWN: (${data.raw}) in Base ${inBase}  -->  (?) in Base ${outBase}\n`;
  text += `========================================================\n\n`;

  // Step 1: Source to Decimal
  if (inBase !== 10) {
    text += `[STEP 1] Convert Source Base ${inBase} (${getBaseName(inBase)}) to Decimal (Base 10):\n`;
    text += `Formula: Expand using positional powers of ${inBase}:\n`;
    const str = data.raw.split('.')[0];
    let expansionTerms = [];
    const len = str.length;
    for (let i = 0; i < len; i++) {
      const digit = str[i];
      const val = parseInt(digit, inBase);
      const power = len - 1 - i;
      expansionTerms.push(`(${digit} * ${inBase}^${power} [=${val * Math.pow(inBase, power)}])`);
    }
    text += `   = ${expansionTerms.join(' + ')}\n`;
    text += `   = Decimal value: ${Math.floor(data.dec)}\n\n`;
  } else {
    text += `[STEP 1] Number is already in Decimal (Base 10) = ${data.raw}\n\n`;
  }

  // Step 2: Decimal to Target Base
  if (outBase !== 10) {
    text += `[STEP 2] Convert Decimal (${Math.floor(data.dec)}) to Target Base ${outBase} (${getBaseName(outBase)}):\n`;
    text += `Method: Successive division by ${outBase} (collect remainders from bottom to top):\n\n`;

    let quotient = Math.floor(data.dec);
    let steps = [];
    if (quotient === 0) {
      steps.push(`   0 / ${outBase} = 0, Remainder = 0`);
    } else {
      while (quotient > 0) {
        const rem = quotient % outBase;
        const nextQ = Math.floor(quotient / outBase);
        const remSymbol = rem.toString(outBase).toUpperCase();
        steps.push(`   ${quotient} / ${outBase} = ${nextQ} with Remainder ${rem} (${remSymbol})`);
        quotient = nextQ;
      }
    }
    text += steps.join('\n') + `\n\n`;
    text += `Reading remainders from last to first gives:\n`;
    text += `   ==> Final Result in Base ${outBase}: ${data.res}\n`;
  } else {
    text += `[STEP 2] Target is Decimal (Base 10). Value is ${data.res}\n`;
  }

  container.textContent = text;
}

window.toggleExplanation = function() {
  const content = document.getElementById('explanationContent');
  const chevron = document.getElementById('expChevron');
  if (content.style.display === 'none') {
    content.style.display = 'block';
    chevron.classList.remove('open');
  } else {
    content.style.display = 'none';
    chevron.classList.add('open');
  }
};

window.setConverterSample = function(val, inBase, outBase) {
  const inputEl = document.getElementById('converterInput');
  const inputBaseEl = document.getElementById('inputBase');
  const outputBaseEl = document.getElementById('outputBase');
  inputEl.value = val;
  inputBaseEl.value = inBase;
  outputBaseEl.value = outBase;
  inputEl.dispatchEvent(new Event('input'));
  showToast(`Loaded sample: ${val} (Base ${inBase})`, 'info');
};

window.setBaseFromCell = function(base) {
  const outputBaseEl = document.getElementById('outputBase');
  outputBaseEl.value = base;
  outputBaseEl.dispatchEvent(new Event('change'));
};

/* ==========================================================================
   6. INSTRUCTION FORMATOR (COA TOOL 2)
   0, 1, 2, 3 Address Instruction Generation
   ========================================================================== */
function initInstructionFormator() {
  const exprInput = document.getElementById('exprInput');
  const formatBtn = document.getElementById('formatExprBtn');

  function runFormatting() {
    const raw = exprInput.value.trim();
    if (!raw) return;

    try {
      const parsed = parseAlgebraicExpression(raw);
      renderInstructionOutputs(parsed);
    } catch (err) {
      const errBox = document.getElementById('exprValidationMsg');
      if (errBox) errBox.textContent = `Syntax Error: ${err.message}. Please use format like X = (A + B) * (C - D)`;
    }
  }

  if (formatBtn) {
    formatBtn.addEventListener('click', runFormatting);
  }

  exprInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runFormatting();
  });

  // Initial Run
  runFormatting();
}

window.setInstructionExpr = function(expr) {
  const exprInput = document.getElementById('exprInput');
  exprInput.value = expr;
  exprInput.focus();
  const formatBtn = document.getElementById('formatExprBtn');
  if (formatBtn) formatBtn.click();
  showToast(`Loaded expression: ${expr}`, 'info');
};

/**
 * Expression Parser & Compiler into 0, 1, 2, 3 Address Code
 */
function parseAlgebraicExpression(inputStr) {
  const errBox = document.getElementById('exprValidationMsg');
  if (errBox) errBox.textContent = '';

  let targetVar = 'X';
  let exprRHS = inputStr;

  if (inputStr.includes('=')) {
    const parts = inputStr.split('=');
    targetVar = parts[0].trim();
    exprRHS = parts.slice(1).join('=').trim();
  }

  // Tokenize RHS: identifiers, operators (+, -, *, /), parentheses
  const tokens = exprRHS.match(/[A-Za-z0-9_]+|[\+\-\*\/\(\)]/g);
  if (!tokens || tokens.length === 0) {
    throw new Error('Invalid or empty expression');
  }

  // Convert to Postfix (Shunting-Yard)
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const outputQueue = [];
  const opStack = [];

  for (let token of tokens) {
    if (/^[A-Za-z0-9_]+$/.test(token)) {
      outputQueue.push(token);
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (
        opStack.length > 0 &&
        opStack[opStack.length - 1] !== '(' &&
        precedence[opStack[opStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(opStack.pop());
      }
      opStack.push(token);
    } else if (token === '(') {
      opStack.push(token);
    } else if (token === ')') {
      while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
        outputQueue.push(opStack.pop());
      }
      if (opStack.length === 0) throw new Error('Mismatched parentheses');
      opStack.pop(); // discard '('
    }
  }

  while (opStack.length > 0) {
    const top = opStack.pop();
    if (top === '(' || top === ')') throw new Error('Mismatched parentheses');
    outputQueue.push(top);
  }

  return {
    target: targetVar,
    infix: exprRHS,
    tokens: tokens,
    postfix: outputQueue
  };
}

function renderInstructionOutputs(parsed) {
  const { target, infix, postfix } = parsed;

  // 1. Trace Information
  document.getElementById('traceInfix').textContent = `${target} = ${infix}`;
  document.getElementById('tracePostfix').textContent = postfix.join(' ');

  // 2. 0-Address Instruction Generator (Stack Architecture)
  const res0 = generate0AddressCode(postfix, target);
  document.getElementById('res0Address').innerHTML = formatCodeHtml(res0);

  // 3. 1-Address Instruction Generator (Accumulator Architecture)
  const res1 = generate1AddressCode(postfix, target);
  document.getElementById('res1Address').innerHTML = formatCodeHtml(res1);

  // 4. 2-Address Instruction Generator (Register/Memory)
  const res2 = generate2AddressCode(postfix, target);
  document.getElementById('res2Address').innerHTML = formatCodeHtml(res2);

  // 5. 3-Address Instruction Generator (General Register / RISC)
  const res3 = generate3AddressCode(postfix, target);
  document.getElementById('res3Address').innerHTML = formatCodeHtml(res3);

  // Update trace registers and temps
  document.getElementById('traceRegisters').textContent = res3.registersUsed.join(', ') || 'R1';
  document.getElementById('traceTemps').textContent = res1.tempsUsed.join(', ') || 'T1';
}

function getOpcodeName(op) {
  switch (op) {
    case '+': return 'ADD';
    case '-': return 'SUB';
    case '*': return 'MUL';
    case '/': return 'DIV';
    default: return 'OP';
  }
}

/**
 * 0-Address Generator (Stack / Reverse Polish Notation)
 */
function generate0AddressCode(postfix, target) {
  const lines = [];
  lines.push({ code: '; --- 0-Address (Stack Architecture) ---', comment: '' });
  lines.push({ code: '; Arithmetic operations implicitly operate on Top of Stack (TOS)', comment: '' });
  
  for (let token of postfix) {
    if (['+', '-', '*', '/'].includes(token)) {
      const opc = getOpcodeName(token);
      lines.push({
        code: `${opc.padEnd(8)}`,
        comment: `; TOS <- (Second TOS) ${token} (Top TOS)`
      });
    } else {
      lines.push({
        code: `PUSH    ${token}`,
        comment: `; Push operand '${token}' onto Stack`
      });
    }
  }

  lines.push({
    code: `POP     ${target}`,
    comment: `; Pop result from TOS and store into Memory M[${target}]`
  });

  return lines;
}

/**
 * 1-Address Generator (Accumulator Architecture)
 */
function generate1AddressCode(postfix, target) {
  const lines = [];
  const stack = [];
  let tempCount = 1;
  const tempsUsed = [];

  lines.push({ code: '; --- 1-Address (Accumulator Architecture) ---', comment: '' });
  lines.push({ code: '; Implicit Accumulator Register (AC)', comment: '' });

  for (let token of postfix) {
    if (['+', '-', '*', '/'].includes(token)) {
      const op2 = stack.pop();
      const op1 = stack.pop();
      const opc = getOpcodeName(token);

      // We load op1, perform operation with op2, store in a temporary
      const tempVar = `T${tempCount++}`;
      tempsUsed.push(tempVar);

      lines.push({ code: `LOAD    ${op1}`, comment: `; AC <- M[${op1}]` });
      lines.push({ code: `${opc.padEnd(8)}${op2}`, comment: `; AC <- AC ${token} M[${op2}]` });
      lines.push({ code: `STORE   ${tempVar}`, comment: `; M[${tempVar}] <- AC` });

      stack.push(tempVar);
    } else {
      stack.push(token);
    }
  }

  // The final temporary or value moves to target
  if (stack.length > 0) {
    const finalVal = stack.pop();
    if (finalVal !== target) {
      lines.push({ code: `LOAD    ${finalVal}`, comment: `; AC <- M[${finalVal}]` });
      lines.push({ code: `STORE   ${target}`, comment: `; M[${target}] <- AC` });
    }
  }

  return { lines, tempsUsed };
}

/**
 * 2-Address Generator (Two-Operand Register/Memory Architecture)
 */
function generate2AddressCode(postfix, target) {
  const lines = [];
  const stack = [];
  let regCount = 1;
  const regsUsed = [];

  lines.push({ code: '; --- 2-Address (Register-Memory) ---', comment: '' });
  lines.push({ code: '; Format: OP Dest, Src  ==>  Dest <- Dest OP Src', comment: '' });

  for (let token of postfix) {
    if (['+', '-', '*', '/'].includes(token)) {
      const op2 = stack.pop();
      const op1 = stack.pop();
      const opc = getOpcodeName(token);

      const reg = `R${regCount++}`;
      regsUsed.push(reg);

      lines.push({ code: `MOV     ${reg}, ${op1}`, comment: `; ${reg} <- M[${op1}]` });
      lines.push({ code: `${opc.padEnd(8)}${reg}, ${op2}`, comment: `; ${reg} <- ${reg} ${token} ${op2}` });

      stack.push(reg);
    } else {
      stack.push(token);
    }
  }

  if (stack.length > 0) {
    const finalReg = stack.pop();
    lines.push({ code: `MOV     ${target}, ${finalReg}`, comment: `; M[${target}] <- ${finalReg}` });
  }

  return { lines, regsUsed };
}

/**
 * 3-Address Generator (Register-Register Architecture / RISC)
 */
function generate3AddressCode(postfix, target) {
  const lines = [];
  const stack = [];
  let regCount = 1;
  const registersUsed = [];

  lines.push({ code: '; --- 3-Address (General Register RISC) ---', comment: '' });
  lines.push({ code: '; Format: OP Dest, Src1, Src2  ==>  Dest <- Src1 OP Src2', comment: '' });

  for (let i = 0; i < postfix.length; i++) {
    const token = postfix[i];
    if (['+', '-', '*', '/'].includes(token)) {
      const op2 = stack.pop();
      const op1 = stack.pop();
      const opc = getOpcodeName(token);

      // Check if it's the very last operation
      const isLast = (i === postfix.length - 1);
      const dest = isLast ? target : `R${regCount++}`;
      if (!isLast) registersUsed.push(dest);

      lines.push({
        code: `${opc.padEnd(8)}${dest}, ${op1}, ${op2}`,
        comment: `; ${dest} <- ${op1} ${token} ${op2}`
      });

      stack.push(dest);
    } else {
      stack.push(token);
    }
  }

  return { lines, registersUsed };
}

function formatCodeHtml(obj) {
  const lines = Array.isArray(obj) ? obj : obj.lines;
  return lines.map(item => {
    return `<div class="code-line"><span>${escapeHtml(item.code)}</span><span class="code-comment">${escapeHtml(item.comment)}</span></div>`;
  }).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

window.copyInstructions = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const text = container.innerText;
  copyText(text);
};

/* ==========================================================================
   7. GALLERY & LIGHTBOX
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Close lightbox on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

window.openLightbox = function(src, title, desc) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const downloadBtn = document.getElementById('lightboxDownloadBtn');

  img.src = src;
  titleEl.textContent = title;
  descEl.textContent = desc;
  downloadBtn.href = src;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

/* ==========================================================================
   8. ASSIGNMENT 1 (COA 25CST-238) INTERACTION
   ========================================================================== */
function initAssignment() {
  const searchInput = document.getElementById('assignmentSearch');
  const clearBtn = document.getElementById('clearSearchBtn');
  const qaItems = document.querySelectorAll('.qa-item');
  const countBadge = document.getElementById('questionCount');

  // Open first question by default
  if (qaItems.length > 0) {
    qaItems[0].classList.add('open');
  }

  // Live Search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      if (q) {
        clearBtn.style.display = 'block';
      } else {
        clearBtn.style.display = 'none';
      }

      qaItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        const keywords = item.getAttribute('data-keywords') || '';
        if (text.includes(q) || keywords.includes(q)) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (countBadge) countBadge.textContent = visibleCount;
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }
  }
}

window.toggleQA = function(headerElement) {
  const item = headerElement.closest('.qa-item');
  if (item) {
    item.classList.toggle('open');
  }
};

let allAccordionsOpen = false;
window.toggleAllAccordions = function() {
  const qaItems = document.querySelectorAll('.qa-item');
  const toggleText = document.getElementById('toggleAllText');
  allAccordionsOpen = !allAccordionsOpen;

  qaItems.forEach(item => {
    if (allAccordionsOpen) {
      item.classList.add('open');
    } else {
      item.classList.remove('open');
    }
  });

  if (toggleText) {
    toggleText.textContent = allAccordionsOpen ? 'Collapse All' : 'Expand All';
  }
};

window.copyQAText = function(button) {
  const qaItem = button.closest('.qa-item');
  if (!qaItem) return;
  const question = qaItem.querySelector('.qa-q-left h4')?.innerText || '';
  const answer = qaItem.querySelector('.qa-content')?.innerText || '';
  const fullText = `Q: ${question}\n\nAnswer:\n${answer}`;
  copyText(fullText);
};

/* ==========================================================================
   9. UTILITIES & TOAST SYSTEM
   ========================================================================== */
window.copyText = function(text, event) {
  if (event) event.stopPropagation();
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Copied to clipboard!', 'success');
  });
};

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-circle-check text-green';
  if (type === 'info') icon = 'fa-circle-info text-blue';
  if (type === 'error') icon = 'fa-triangle-exclamation text-red';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }, 2600);
}
