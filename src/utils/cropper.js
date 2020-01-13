import { dataURItoBlob } from 'utils/app.utils';

const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export default async function getCroppedImage(imageSrc, pixelCrop, imageSize = 256) {

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = imageSize;
  canvas.height = imageSize;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    imageSize,
    imageSize
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // Convert Base64 image to binary
  return dataURItoBlob(canvas.toDataURL());

  // // As a blob
  // return new Promise((resolve, reject) => {
  //   canvas.toBlob(file => {
  //     resolve(URL.createObjectURL(file));
  //   }, 'image/jpeg');
  // });
}
