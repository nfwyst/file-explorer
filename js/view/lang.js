class Lang {
  constructor(el, name, i18n) {
    this.el = el;
    this.i18n = i18n;
    this.name = name;

    this.bind();
    i18n.on('update', () => this.name.innerHTML = this.i18n.translate('APPNAME', 'File Explorer'));
  }

  bind() {
    this.el.addEventListener('change', this.onChange.bind(this));
  }

  onChange(e) {
    this.i18n.locale = e.target.value;
    this.i18n.notify();
  }
}

module.exports = Lang;
