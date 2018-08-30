export class CMarkdownEditor {

  options: CMarkdownEditorOptions

  element: Element

  CodeMirror: CodeMirror

  Marked: Marked

  value(): string

}

interface CMarkdownEditorOptions {
  autofocus?: boolean
  /** 占位内容 */
  placeholder?: string

  /** 图标 */
  toolbar: {
    groups?: [CMarkdownEditorOptionsToolbar] 
    separator?: string
  } 
}

/** 新增图标的格式 */
interface CMarkdownEditorOptionsToolbar {
  name: string
  action: Function
  className: string,
  title: string
}