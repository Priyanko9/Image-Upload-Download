const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer,filename) {
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(200, 200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    return filepath;
  }
  
  filepath(filename) {
      return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;