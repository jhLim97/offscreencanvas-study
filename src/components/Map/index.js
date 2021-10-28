import React, { useRef, useEffect } from "react";

const PlayerCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker("../../workers/offscreencanvas.js", {
      type: "module",
    });
    worker.onmessage = (e) => {
      const reply = e.data;
      console.log(reply);
      // 아래 주석 지우면, worker thread에서 그려진 텍스트도 지워짐
      // 학습해보자
      //worker.terminate();
    };

    const init = () => {
      worker.postMessage({ canvas: offscreen }, [offscreen]);
    };
    init();
  }, []);

  return <canvas id="canvas" ref={canvasRef}></canvas>;
};

export default PlayerCanvas;
