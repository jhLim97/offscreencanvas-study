/* eslint-disable no-restricted-globals */
import draw from "../utils/drawCharacter";
const worker = self;

worker.onmessage = (e) => {
  const { canvas } = e.data;
  console.log(e.data, canvas);

  const ctx = canvas.getContext("2d");
  draw(ctx);

  worker.postMessage({ msg: "getCanvas and draw image on that" });
};
