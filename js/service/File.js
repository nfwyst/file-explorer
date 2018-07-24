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

  paste() {
    const file = this.copiedFile;
    if (fs.lstatSync(file).isFile()) {
      cp(file, this.dir.getDir(), () => this.dir.notify());
    }
  }

  copy(file) {
    this.copiedFile = this.dir.getFile(file); 
  }

  open(file) {
    this.nw.Shell.openItem(this.dir.getFile(file));
  }

  showInFolder(file) {
    this.nw.Shell.showItemInFolder(this.dir.getFile(file));
  }
}

module.exports = FileService;
