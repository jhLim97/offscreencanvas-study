import React, { useRef, useEffect } from "react";

const objCanvas = document.createElement('canvas');
const PlayerCanvas = () => {
  const canvasRef = useRef(null);
  const objectList = ['/buildBuilding.png', '/buildObject.png', '/chat.png', '/fileUpload.png', '/logout.png', '/person.png', '/setting.png', '/users.png', '/voiceChat.png'];
  let x = 50;
  let y = 50;

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    const offscreen = objCanvas.transferControlToOffscreen();
    const worker = new Worker("../../workers/offscreencanvas.js", {
      type: "module",
    });

    worker.onmessage = async (e) => {
      const { imageBitmapList } = e.data;
    
      offscreen.width = window.innerWidth;
      offscreen.height = window.innerHeight;
      const offscreenCtx = offscreen.getContext('2d');
      imageBitmapList.forEach(imageBitmap => {
        offscreenCtx.drawImage(imageBitmap, x, y, 100, 100);
        x += 110;    
      });
  
      ctx.drawImage(offscreen, 0, 0);
      worker.terminate();
    };

    const init = () => {
      worker.postMessage({ objectList: objectList });
    };
    init();
  }, []);

  return <canvas id="canvas" ref={canvasRef}></canvas>;
};

export default PlayerCanvas;
