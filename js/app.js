const TitleBarActionsView = require('./js/view/TitleBarActions.js');
const DirListView = require('./js/view/DirListView.js');
const DirService = require('./js/service/Dir.js');
const FileListView = require('./js/view/FileListView.js');
const TitleBarView = require('./js/view/TitleBarView.js');
const Lang = require('./js/view/lang.js');
const I18nService = require('./js/service/I18n.js');
const { dictionary } = require('./js/data/dictionary.js');
const Dir = new DirService();
const i18n = new I18nService(dictionary);

// handler user window actions
new TitleBarActionsView(document.querySelector('[data-bind=titlebar]'), nw);

// init dir list view and update from dir service
new DirListView(document.querySelector('[data-bind=dirList]'), Dir);

// init file list view and update from dir service
new FileListView(document.querySelector('[data-bind=fileList]'), Dir, nw, i18n);

// init path
new TitleBarView(document.querySelector('[data-bind=titlebarPath]'), Dir);

// init lang 
new Lang(document.querySelector('[data-bind=lang]'), document.querySelector('[data-bind=appname]'), i18n);

Dir.notify();
i18n.notify();
