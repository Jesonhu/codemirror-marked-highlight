const codemirror = {
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
  }
}
class CMarkdownEditor {
  constructor(_options) {
    this.options = _options || {
      CodderMirror: {
        config: codemirror.config
      }
    };
    this.CodeMirror = null;
    this.Marked = null;
    this.element = this.options.element;
    this.textAreaElement = this.options.element.getElementsByTagName('textArea')[0];
    this.previewElement = this.options.element.getElementsByClassName('editor-preview-side')[0]

    this.init();
  }
  /** 初始化 */
  init() {
    this.render();
  }
  /** 内容 */
  getValue() {
    return this._value;
  }

  render(el) {
    this.codemirror();
  }

  codemirror() {
    this.CodeMirror = CodeMirror.fromTextArea(this.textAreaElement, this.options.CodeMirror.config);
    this._onChange();
  }

  /** 获取 marked 处理后的内容 */
  _onChange() {
    this._value = '';
    this.CodeMirror.on('change', cm => {
      const text = cm.getValue();
      this._value = this.markdown(text);
      this.previewElement.innerHTML = this._value;
    });
  }
  markdown(text) {
    if (marked) {
      const markedOptions = {
        // renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
      }

      // marked 传了渲染方式
      if (this.options && this.options.Marked && this.options.Marked.options.highlight) {
        markedOptions.highlight = function(code) {
          return hljs.highlightAuto(code).value;
        }
      }

      // set Options
      this.Marked = marked.setOptions(markedOptions);

      // Return 
      return marked(text);
    }
  }
}