/**
 * 处理用户窗口事件
 * @access public
 */
class TitleBarActionsView {
  /**
   * 获取关闭按钮并调用绑定事件方法
   *
   * @access private 
   * @param {HTMLElement} root the root element that contains close btn
   * @param {Object} n nw 实例 防止error
   * @returns {object}  the instance of TitleBarActionsView
   */
  constructor(root, n, i18n) {
    this.close = root.querySelector("[data-bind=close]");
    this.min = root.querySelector("[data-bind=min]");
    this.max = root.querySelector("[data-bind=max]");
    this.unmax = root.querySelector("[data-bind=unmax]");
    this.nw = n;
    this.i18n = i18n;
    this.bind();
    i18n.on('update', () => this.translate());
  }

  translate() {
    this.unmax.title = this.i18n.translate('RESTORE_WIN', 'restore window');
    this.max.title = this.i18n.translate('MAXIMIZE_WIN', 'maximize window');
    this.min.title = this.i18n.translate('MINIMIZE_WIN', 'minimize window');
    this.close.title = this.i18n.translate('CLOSE_WIN', 'close window');
  }

  /**
   * 为按钮绑定事件
   *
   * @access private 
   * @returns {undefined} none
   */
  bind() {
    this.close.addEventListener('click', this.onClose.bind(this));
    this.min.addEventListener('click', this.onMin.bind(this));
    this.max.addEventListener('click', this.onMax.bind(this));
    this.unmax.addEventListener('click', this.onUnmax.bind(this));
  }

  /**
   * 最小化窗口
   *
   * @access public
   * @returns {undefined} none
   */
  onMin() {
    this.nw.Window.get().minimize(); 
  }

  /**
   * 在最大化与取消最大化之间切换
   *
   * @access public
   * @returns {undefined } none
   */
  toggleMax() {
    this.max.classList.toggle("is-hidden");
    this.unmax.classList.toggle("is-hidden");
  }

  /**
   * 最大化窗口
   *
   * @access public
   * @returns {undefined} none
   */
  onMax() {
    this.nw.Window.get().maximize();
    this.toggleMax();
  }

  /**
   * 取消最大化窗口
   *
   * @access public
   * @returns {undefined} none
   */
  onUnmax() {
    this.nw.Window.get().unmaximize();
    this.toggleMax();
  }

  /**
   * 关闭window
   *
   * @access private
   * @returns {undefined} none
   */
  onClose() {
    this.nw.Window.get().close();
  }
}

module.exports = TitleBarActionsView;
