class Lang {
  constructor(el, name, i18n, doc) {
    this.el = el;
    this.i18n = i18n;
    this.name = name;
    this.doc = doc;

    this.bind();
    i18n.on('update', () => this.name.innerHTML = this.i18n.translate('APPNAME', 'File Explorer'));
  }

  bind() {
    this.el.addEventListener('change', this.onChange.bind(this));
    this.el.addEventListener('click', () => {
      this.doc.body.style.overflow = 'hidden';
    });
  }

  onChange(e) {
    this.i18n.locale = e.target.value;
    this.i18n.notify();
    this.doc.body.style.overflow = 'auto';
  }
}

module.exports = Lang;
