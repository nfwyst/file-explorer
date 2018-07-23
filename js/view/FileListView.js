const filesize = require('filesize');

class FileListView {
  constructor(el, service, n) {
    this.el = el;
    this.dir = service;
    this.nw = n;

    service.on('update', () => this.update(service.getFileList()));
    this.bind();
  } 

  static formatTime(timeString) {
    const date = new Date(Date.parse(timeString));
    return date.toDateString();
  }

  update(collections) {
    this.el.innerHTML = '';
    collections.unshift(0);
    collections.forEach(info => {
      this.el.insertAdjacentHTML('beforeend', `
          <li data-file="${info === 0 ? null : info.fileName}" class="file-list-li ${ info === 0 ? 'file-list-head' : '' }">
            <span class="file-list-li-name">${ info === 0 ? 'Name' : info.fileName }</span>
            <span class="file-list-li-size">${ info === 0 ? 'Size' : filesize(info.stats.size) }</span>
            <span class="file-list-li-time">${ info === 0 ? 'Modified' : FileListView.formatTime(info.stats.mtime) }</span>
          </li>
      `);
    });
  }

  bind() {
    this.el.addEventListener('click', (e) => {
      let el;
      if (e.target.nodeName === 'SPAN') {
        el = e.target.parentElement;
      }
      const val = el.getAttribute('data-file') || el.dataset.file;
      if (val) {
        this.nw.Shell.openItem(this.dir.getFile(val)); 
      } else {
        return false;
      }
    });
  }
}

module.exports = FileListView;
