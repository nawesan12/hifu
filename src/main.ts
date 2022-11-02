import './style.css'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

window.MonacoEnvironment?({
  getWorkerUrl: (_: any, label: string) => {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'javascript') return new JsWorker()
    return
  }
}):null

const $ = (e: string) => document.querySelector<HTMLElement>(e)

const $html = $('#html') as HTMLElement
const $css = $('#css') as HTMLElement
const $js = $('#js') as HTMLElement
const $output = $('#output') as HTMLIFrameElement

const $logoimg = $('#img-logo') as HTMLImageElement
const $copyButton = $('#copy-to-clipboard') as HTMLLIElement
const $fullscreenBtn = $('.fullscreen-btn') as HTMLButtonElement

const htmlEditor = monaco.editor.create($html, {
  value: '<h1>Hifu!</h1>',
  language: 'html',
  theme: 'vs-dark',
  fontSize: 20
})

const cssEditor = monaco.editor.create($css, {
  value: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  
body {
  font-size: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}`,
  language: 'css',
  theme: 'vs-dark',
  fontSize: 20
})

const jsEditor = monaco.editor.create($js, {
  value: '',
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 20
})

const generateOutput = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${cssEditor.getValue()}
        </style>
      </head>
      <body>
        ${htmlEditor.getValue()}
        <script>
          ${jsEditor.getValue()}
        </script>
      </body>
    </html>
  `
}

const updateOutput = () => {
  $output.srcdoc = generateOutput()
}

const generateRandomLogoForMenu = () => {
  const random = new Date().getTime()
  $logoimg.src = `https://avatars.dicebear.com/api/croodles/${random}.svg`  
  
  const randomToSixLengthHex = () => {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  $logoimg.style.border = `4px solid #${randomToSixLengthHex()}`
}

const copyToClipboard = () => {
  navigator.clipboard.writeText($output.srcdoc)
  alert("Copied to clipboard!")
}

const resultToFullScreen = () => {
  $output.requestFullscreen()
}

htmlEditor.onDidChangeModelContent(updateOutput)

cssEditor.onDidChangeModelContent(updateOutput)

jsEditor.onDidChangeModelContent(updateOutput)

$logoimg.addEventListener("click", generateRandomLogoForMenu)

$copyButton.addEventListener("click", copyToClipboard)

$fullscreenBtn.addEventListener("click", resultToFullScreen)

generateRandomLogoForMenu()