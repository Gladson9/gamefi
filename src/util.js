//resize images

export const smallImage = (imagePath, size) => {
  if (!imagePath) {
    return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  }
  const imageURL = imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        "/media/screenshots",
        `/media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`);
  return imageURL;
};
