globalThis.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true,
  },
  loader: {
    paths: {
      mathjax: chrome.runtime.getURL('media/mathjax'),
      'mathjax-newcm': chrome.runtime.getURL('media/mathjax-newcm'),
    },
  },
  startup: {
    typeset: false,
  },
};
