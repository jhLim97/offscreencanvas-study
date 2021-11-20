/* eslint-disable no-restricted-globals */
import makeImageBitMapList from "../utils/drawCharacter";
const worker = self;
let offscreenCanvas;
let offscreenCtx;

worker.onmessage = async (e) => {
  const { offscreen, objectList } = e.data;

  if (offscreen === undefined) {
    offscreenCtx.rect(100, 300, 100, 100);
    offscreenCtx.fill();

    const backImage = offscreenCanvas.transferToImageBitmap();
    console.log(backImage);
    worker.postMessage({ msg: 'stop', backImage });
    return;
  }

  offscreenCanvas = offscreen;
  const imageBitmapList = await makeImageBitMapList(objectList);

  offscreenCtx = offscreenCanvas.getContext('2d');
  let x = 50;
  let y = 50;

  imageBitmapList.forEach(imageBitmap => {
    offscreenCtx.drawImage(imageBitmap, x, y, 100, 100);
    x += 110;    
  });

  offscreenCtx.rect(100, 500, 100, 100);
  offscreenCtx.fill();

  const backImage = offscreenCanvas.transferToImageBitmap();
  console.log(backImage);
  worker.postMessage({ msg: 'Drawing images on offscreencanvas is finish', backImage });
};
