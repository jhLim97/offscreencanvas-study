import React, { useRef, useEffect } from "react";

const PlayerCanvas = () => {
  const canvasRef = useRef(null);
  const objectList = ['/buildBuilding.png', '/buildObject.png', '/chat.png', '/fileUpload.png', '/logout.png', '/person.png', '/setting.png', '/users.png', '/voiceChat.png'];

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker("../../workers/offscreencanvas.js", {
      type: "module",
    });

    worker.onmessage = async (e) => {
      const { msg, success } = e.data;
      if (success) alert(msg);

      worker.terminate();
    };

    const init = () => {
      worker.postMessage({ offscreen, objectList }, [offscreen]);
    };
    init();
  }, []);

  return <canvas id="canvas" ref={canvasRef}></canvas>;
};

export default PlayerCanvas;
