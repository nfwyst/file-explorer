const filesize = require('filesize');

class FileListView {
  constructor(el, service, n, i18n) {
    this.el = el;
    this.dir = service;
    this.nw = n;
    this.i18n = i18n;

    service.on('update', () => this.update(service.getFileList()));
    i18n.on('update', () => this.update(service.getFileList()));
    this.bind();
  } 

  static formatTime(timeString, locale) {
    const date = new Date(Date.parse(timeString));
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };
    return date.toLocaleString(locale, options);
  }

  update(collections) {
    this.el.innerHTML = '';
    collections.unshift(0);
    collections.forEach(info => {
      this.el.insertAdjacentHTML('beforeend', `
          <li data-file="${info === 0 ? null : info.fileName}" class="file-list-li ${ info === 0 ? 'file-list-head' : '' }">
            <span class="file-list-li-name">${ info === 0 ? this.i18n.translate('NAME', 'Name') : info.fileName }</span>
            <span class="file-list-li-size">${ info === 0 ? this.i18n.translate('SIZE', 'Size') : filesize(info.stats.size) }</span>
            <span class="file-list-li-time">${ info === 0 ? this.i18n.translate('MODIFIED', 'Modified') : FileListView.formatTime(info.stats.mtime, this.i18n.locale) }</span>
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
