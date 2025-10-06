const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminAvif = require('imagemin-avif');
const imageminMozjpeg = require('imagemin-mozjpeg');

async function optimizeImages() {
  // Conversion WebP
  await imagemin(['images/*.{jpg,png}'], {
    destination: 'images/webp',
    plugins: [
      imageminWebp({quality: 85})
    ]
  });

  // Conversion AVIF
  await imagemin(['images/*.{jpg,png}'], {
    destination: 'images/avif',
    plugins: [
      imageminAvif({quality: 80})
    ]
  });

  // Compression JPEG
  await imagemin(['images/*.jpg'], {
    destination: 'images/optimized',
    plugins: [
      imageminMozjpeg({quality: 85})
    ]
  });
}

optimizeImages();
