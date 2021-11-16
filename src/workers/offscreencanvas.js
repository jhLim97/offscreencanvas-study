/* eslint-disable no-restricted-globals */
import makeImageBitMapList from "../utils/drawCharacter";
const worker = self;

worker.onmessage = async (e) => {
  const { objectList } = e.data;

  const imageBitmapList = await makeImageBitMapList(objectList);
  worker.postMessage({ imageBitmapList });
};
