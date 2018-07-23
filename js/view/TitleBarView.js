class TitleBarView {
  constructor(el, service) {
    this.el = el;
    this.dir = service;

    service.on('update', this.update.bind(this));
  }

  update() {
    this.el.innerHTML = this.dir.getDir();
  }
}

module.exports = TitleBarView;
