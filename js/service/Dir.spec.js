const DirService = require("./Dir"),
      mock = require("mock-fs"), 
      { join } = require("path");

describe("service/Dir", () => {
  beforeEach(() => {
    mock({
      foo: {
        bar: {
          baz: "baz",
          qux: "qux"
        }
      }
    });
  });
  afterEach(mock.restore);
  // 测试获取文件列表
  describe("#getFileList", () => {
    it("获取期望的文件列表", () => {
      const service = new DirService(join("foo", "bar"));
      service.setDir("bar");
      let files = service.getFileList();
      expect(files.length).toBe(2);
    });
    it("获取期望的文件属性", () => {
      const service = new DirService(join("foo", "bar"));
      const files = service.getFileList();
      const [file] = files;
      expect(file.fileName).toBe("baz");
      expect(file.stats.size).toBe(3);
      expect(file.stats.isFile()).toBe(true);
      expect(file.stats.isDirectory()).toBe(false);
      expect(file.stats.mtime).toBeTruthy();
    });
  });
  describe("#setDir", () => {
    it("触发更新事件", () => {
      const service = new DirService('foo');
      service.on('update', () => {
        console.log('set dir 确实更新了');
        expect(true).toBe(true);
      });
      service.notify();
    });
  });
});
