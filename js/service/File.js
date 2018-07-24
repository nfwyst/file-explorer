const fs = require('fs');
const path = require('path');

/**
 * 复制文件
 *
 * @access public
 * @param {string} from 复制的源路径
 * @param {string} to 复制的目标路径
 * @param {function} done 复制完成的回调函数
 * @returns {undefined} none
 */
function cp(from, to, done) {
  const basename = path.basename(from);
  const dest = path.join(to, basename);

  const writer = fs.createWriteStream(dest);
  fs.createReadStream(from).pipe(writer);

  writer.on('finish', done);
}

class FileService {
  constructor(dirService, n) {
    this.dir = dirService;
    this.nw = n;
    this.copiedFile = null;
  }

  remove(file) {
    fs.unlinkSync(this.dir.getFile(file));
    this.dir.notify();
  } 

  hasImageClip() {
    const clip = this.nw.Clipboard.get();
    const types = clip.readAvailableTypes();

    return types.indexOf('png') !== -1 && clip.get('png', true);
  }

  pasteFromClip() {
    if (this.hasImageClip()) {
      const clip = this.nw.Clipboard.get();
      let has = false;

      ['png'].map(type => {
        return { 
          img: clip.get(type, true),
          type: type
        }
      }).forEach(item => {
        if (item.img) {
          const bin = Buffer.from(item.img, 'base64');
          const fileName = `${Date.now()}--img.${item.type}`;
          fs.writeFileSync(this.dir.getFile(fileName), bin);
          has = true;
        }
      })

      has ? this.dir.notify() : false;
    }
  }

  paste() {
    const file = this.copiedFile;
    if (fs.lstatSync(file).isFile()) {
      cp(file, this.dir.getDir(), () => this.dir.notify());
    }
  }

  copyImage(file, type) {
    const clip = this.nw.Clipboard.get();
    const data = fs.readFileSync(file).toString('base64');
    const html = `<img src="file:///${encodeURI(data.replace(/^\//, ''))}">`;
    clip.set([
      { type, data, raw: true },
      { type: 'html', data: html }
    ]);
  }

  getExt(file) {
    return path.parse(file).ext.substr(1);
  }

  isImg(file) {
    return ['jpg', 'jpeg', 'png'].includes(this.getExt(file));
  }

  copy(file) {
    this.copiedFile = this.dir.getFile(file); 
    if (this.isImg(this.copiedFile)) {
      const ext = this.getExt(this.copiedFile);
      // for image
      this.copyImage(this.copiedFile,  ['jpg','jpeg'].includes(ext) ? 'jpeg' : 'png');
    } else {
      // for text
      const clipboard = this.nw.Clipboard.get();
      clipboard.set(this.copiedFile, "text");
    }
  }

  open(file) {
    this.nw.Shell.openItem(this.dir.getFile(file));
  }

  showInFolder(file) {
    this.nw.Shell.showItemInFolder(this.dir.getFile(file));
  }
}

module.exports = FileService;
