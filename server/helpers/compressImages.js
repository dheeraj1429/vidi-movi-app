const sharp = require("sharp");
const path = require("path");

/**
 *
 * @param { imagePath } String uploaded image path
 * @param { dir } String dir path where i want to store the image file
 * @param { imageName } string uploaded file original name
 */
const compressImage = async function (imagePath, dir, imageName) {
    await sharp(imagePath)
        .resize(200, 200)
        .jpeg({ quality: 90 })
        .toFile(path.join(__dirname, "..", "uploads", dir, imageName));
};

module.exports = compressImage;
