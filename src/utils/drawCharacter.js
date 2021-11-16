const makeImageBitMapList = async (objectList) => {
  const list = await Promise.all(objectList.map(async(objectURL) => await getImageBitMap(objectURL)));
  return list;
};

const getImageBitMap = async (imgUrl) => {
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const imageBitmap = await createImageBitmap(blob);
  return imageBitmap;
}

export default makeImageBitMapList;
