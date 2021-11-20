import React, { useRef, useEffect } from "react";

const offscreen = new OffscreenCanvas(window.innerWidth, window.innerHeight);
let ctx;
const PlayerCanvas = () => {
  const canvasRef = useRef(null);
  const objectList = ['/buildBuilding.png', '/buildObject.png', '/chat.png', '/fileUpload.png', '/logout.png', '/person.png', '/setting.png', '/users.png', '/voiceChat.png'];

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    const worker = new Worker("../../workers/offscreencanvas.js", {
      type: "module",
    });

    worker.onmessage = async (e) => {
      const { msg, backImage } = e.data;

      // 버퍼에 대한 포인터만 가져옴 => 카피가 안 일어나서 더 효율적
      // 결론 backgroundCanvas의 전체 이미지 카피없이 포인터만으로 굉장히 효율적인 렌더링을 수행할 수 있음
      ctx.drawImage(backImage, 0, 0, window.innerWidth, window.innerHeight);

      if (msg === 'stop') return;

      worker.postMessage({ objectList }, []);
      //worker.terminate();
    };

    const init = () => {
      worker.postMessage({ offscreen, objectList }, [offscreen]);
    };
    init();
  }, []);

  return <canvas id="canvas" ref={canvasRef}></canvas>;
};

export default PlayerCanvas;
