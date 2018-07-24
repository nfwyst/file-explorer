const EventEmitter = require('events');

class I18nService extends EventEmitter {
  constructor(dic) {
    super();
    this.__locale = 'en-US';
    this.dictionary = dic;
  }

  translate(token, defval) {
    const dic = this.dictionary[this.locale];
    return dic[token] || defval;
  }

  get locale () {
    return this.__locale;
  }

  set locale(locale) {
    this.__locale = locale;
  }

  notify() {
    this.emit('update');
  }
}

module.exports = I18nService;
