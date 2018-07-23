class DirListView {
  constructor(el, service) {
    this.dir = service;
    this.el = el;

    service.on('update', () => this.update(service.getDirList()));
    this.bind();
  }


  update(collections) {
    this.el.innerHTML = '';
    collections.forEach(info => {
      this.el.insertAdjacentHTML('beforeend', `
       <li class="dir-list-li" data-file=${info.fileName}><i class="icon">folder</i>${info.fileName}</li>
      `);
    });
  }

  onUpdate(val) {
    this.dir.setDir(val);
  }

  bind() {
    this.el.addEventListener('click', (e) => {
      const val = e.target.getAttribute('data-file') || e.target.dataset.file;
      if (val) {
        this.onUpdate(val);
      } else {
        return false;
      }
    });
  }
}

module.exports = DirListView;
