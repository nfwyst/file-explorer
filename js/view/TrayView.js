class TrayView {
  constructor(i18n, n, wind) {
    this.i18n = i18n;
    this.nw = n;
    this.tray = null;
    this.window = wind;
    this.removeOnExit();
    this.render();

    i18n.on('update', this.update.bind(this));
  }

  update() {
    this.tray.remove();
    this.render();
  }

  render() {
    const icon = 'icon.png';
    this.tray = new this.nw.Tray({
      title: this.i18n.translate('APPNAME'),
      icon,
      iconAreTemplates: false,
    });

    const menu = new this.nw.Menu();
    menu.append(new this.nw.MenuItem({
      label: this.i18n.translate('LABEL'),
      click: () => this.nw.Window.get().close(),
    }));

    this.tray.menu = menu;
  }

  removeOnExit() {
    const win = this.nw.Window.get();
    win.on('close', () => {
      this.tray.remove();
      win.hide();
      win.close(true);
    });
    this.window.addEventListener('beforeunload', () => {
      this.tray.remove()
    }, false);
  }
}

module.exports = TrayView;
