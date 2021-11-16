/* eslint-disable no-restricted-globals */
import makeImageBitMapList from "../utils/drawCharacter";
const worker = self;

worker.onmessage = async (e) => {
  const { offscreen, objectList } = e.data;

  const imageBitmapList = await makeImageBitMapList(objectList);

  const offscreenCtx = offscreen.getContext('2d');
  let x = 50;
  let y = 50;

  console.log(imageBitmapList);
  imageBitmapList.forEach(imageBitmap => {
    offscreenCtx.drawImage(imageBitmap, x, y, 100, 100);
    x += 110;    
  });

  worker.postMessage({ msg: 'Drawing images on offscreencanvas is finish', success: true });
};
