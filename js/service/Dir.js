const fs = require('fs'),
      { join, parse } = require('path');


const EventEmitter = require('events');

class DirService extends EventEmitter {
  constructor(dir = null) {
    super();
    this.dir = dir || process.cwd();
  }

  setDir(dir = "") {
    let newDir = join(this.dir, dir);
    if (!DirService.getStats(newDir)) {
      return false; 
    }
    this.dir = newDir;
    this.notify();
  }

  notify() {
    this.emit("update");
  }

  getCollection(type) {
    return DirService.readDir(this.dir).filter(info => info.stats[type]());
  }

  getDirList() {
    const collection = this.getCollection('isDirectory');
    if(!this.isRoot()) {
      collection.unshift({ fileName: ".." });
    }
    return collection;
  }

  getFileList() {
    return this.getCollection('isFile');
  }

  isRoot() {
    const { root } = parse(this.dir);
    return root === this.dir;
  }

  static getStats(filePath) {
    try {
      return fs.statSync(filePath);
    } catch (e) {
      return false;
    }
  }

  static readDir( dir ) {
    return fs.readdirSync(dir, 'utf-8').map(fileName => {
      const filePath = join(dir, fileName),
        stats = DirService.getStats(filePath);

      if (stats === false) {
        return false; 
      }

      return {
        fileName,
        stats
      }
    }).filter(item => item);
  }
}

module.exports = DirService;
