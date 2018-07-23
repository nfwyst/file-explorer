const DirListView = require("./DirListView.js");
const DirService = require("../service/Dir.js");

let sandbox;

describe("view/DirListView", function() {
  beforeEach(() => {
    sandbox = document.getElementById("sandbox");
    sandbox.innerHTML = `<ul data-bind="dirList"></ul>`;
  });
  afterEach(() => {
    sandbox.innerHTML = '';
  });
  describe("#update", function() {
    it("从给定的文件夹列表中更新", () => {
      const Dir = new DirService(),
            view = new DirListView(sandbox.querySelector("[data-bind=dirList]"), Dir);
      view.update([{
        fileName: "foo"
      }, {
        fileName: "bar"
      }]);
      expect(sandbox.querySelectorAll(".dir-list-li").length).toBe(2);
    });
  });
});
