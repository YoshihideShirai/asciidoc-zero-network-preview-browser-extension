declare global {
  interface Window {
    MathJax?: {
      startup: {
        promise: Promise<unknown>;
      };
      typesetPromise(targets?: Element[]): Promise<unknown>;
    };
    mermaid?: any;
    nomnoml?: any;
    vega?: any;
    vegaLite?: any;
    vegaInterpreter?: any;
    WaveDrom?: any;
    JSON5?: any;
    bitfield?: any;
  }
}

export {};
