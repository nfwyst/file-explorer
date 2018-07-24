class ContextMenuView {
  constructor(file, i18n, n, doc) {
    this.file = file;
    this.i18n = i18n;
    this.nw = n;
    this.doc = doc;
    this.bind();
  }

  bind() {
    this.doc.addEventListener('contextmenu', (e) => {
      const el = e.target;
      if (el.className.startsWith('file-list-li-') && el.parentNode.dataset.file) {
        this.render(el.parentNode.dataset.file).popup(e.x, e.y);
      }
    });
  }

  render(fileName) {
    const menu = new this.nw.Menu();
    this.getItems(fileName).forEach(item => menu.append(new this.nw.MenuItem(item)));
    return menu;
  }

  getItems(fileName) {
    const labels = ['SHOW_FILE_IN_FOLDER', null, 'COPY', 'PASTE', null, 'DELETE', 'PASTE_FROM_CLIPBOARD'];
    return labels.map((label, index) => {
      return label ? {
        label: this.i18n.translate(label, label.replace(/_/g, ' ').toLowerCase()),
        enabled: Boolean(index === 3 ? this.file.copiedFile : index === 6 ? this.file.hasImageClip() : fileName),
        click: () => ContextMenuView[label].call(this, fileName),
      } : {type: 'separator'};
    });
  }

  static PASTE() {
    this.file.paste();
  }

  static PASTE_FROM_CLIPBOARD() {
    this.file.pasteFromClip(); 
  }

  static DELETE(fileName) {
    this.file.remove(fileName);
  }

  static SHOW_FILE_IN_FOLDER(fileName) {
    this.file.showInFolder(fileName); 
  }
  
  static COPY(fileName) {
    this.file.copy(fileName); 
  }
}

module.exports = ContextMenuView;
