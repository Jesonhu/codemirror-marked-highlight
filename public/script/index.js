/** 页面主要功能 */
const Page = {
  init() {
    Vm.init();
    Codemirror.init();
    Marked.init();
  }
}

/** vue 相关 */
const Vm = {
  vm: null,
  init() {
    this.vm = new Vue({
      el: '#app',
      data: {
        codeValue: '## 内容',
        parsedValue: '<h2>内容</h2>'
      },
    });
  },
  getCode() {

  }
}

/** codemirror 相关 */
const Codemirror = {
  /** codemirror 实例 */
  editor: null,
  config: {
    mode: {
      name: 'gfm',
      tokenTypeOverrides: {
        emoji: 'emoji'
      }
    },
    /** 显示行号 */
    lineNumbers: true,
    // 自动验证错误
    matchBrackets: true,
    // 缩进
    indentUnit: 4,
    // 是否换行
    lineWrapping: false,
    // 点击高亮正行
    styleActiveLine: true,
    // 配色(主题)
    theme: 'base16-dark',
    // 自动补全括号
    autoCloseBrackets: true,
    // 自动闭合标签
    autoCloseTags: true,
    // 展开折叠
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
  },
  init() {
    this.editor = CodeMirror.fromTextArea(document.getElementById('code'), this.config);
    this.setEvenHandle();
  },
  setEvenHandle() {
    this.editor.on('change', cm => {
      const content = cm.getValue();
      Marked.parse(content);
    });
  }
}

/** marked 相关 */
const Marked = {
  marked: marked,
  rendererMd: null,
  options: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  },
  init() {
    this.marked.setOptions(this.options);
  },
  parse(content) {
    const { vm } = Vm;
    vm.parsedValue = Marked.marked(content);
  }
}

Page.init();