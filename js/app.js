const TitleBarActionsView = require('./js/view/TitleBarActions.js');
const DirListView = require('./js/view/DirListView.js');
const DirService = require('./js/service/Dir.js');
const Dir = new DirService();

// handler user window actions
new TitleBarActionsView(document.querySelector('[data-bind=titlebar]'), nw);

// init dir list view and update from dir service
new DirListView(document.querySelector('[data-bind=dirList]'), Dir);
Dir.notify();