import './style/main.css'
import setLoadingScreen from './loading'
import { generateRandomLogoForMenu, newWindow, updateOutput, copyToClipboard, resultToFullScreen, loadFromLocalStorage, saveInLocalStorage } from './utils'
import { alertMessage } from './alerts'
import { $html, $css, $js, $logoimg, $copyButton, $fullscreenBtn, $newTabButton, $shareButton, $saveButton, $settingsButton, $selectTheme, $selectCSSLibrary, $downloadButton } from './elements'

import { editor } from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { changeTheme, loadConfigFromLocalStorage, openSettings, saveConfigInLocalStorage, toggleTheme } from './settings'
import { downloadResultZippedFiles } from './download'

window.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    switch (label) {
      case 'html': return new HtmlWorker()
      case 'javascript': return new JsWorker()
      case 'css': return new CssWorker()
      default: return new EditorWorker()
    }
  }
}

export const htmlEditor = editor.create($html, {
  value: "",
  language: 'html',
  theme: 'vs-dark',
  fontSize: 16
})

export const cssEditor = editor.create($css, {
  value: "",
  language: 'css',
  theme: 'vs-dark',
  fontSize: 16
})

export const jsEditor = editor.create($js, {
  value: "",
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 16
})


htmlEditor.onDidChangeModelContent(updateOutput)

cssEditor.onDidChangeModelContent(updateOutput)

jsEditor.onDidChangeModelContent(updateOutput)

$logoimg.addEventListener("click", () => generateRandomLogoForMenu($logoimg))

$copyButton.addEventListener("click", copyToClipboard)

$newTabButton.addEventListener("click", () => newWindow())

$shareButton.addEventListener("click", () => alertMessage('We are working on this! Coda is coming', 'warning', 2500))

$saveButton.addEventListener("click", saveInLocalStorage)

$downloadButton.addEventListener("click", downloadResultZippedFiles)

$settingsButton.addEventListener("click", openSettings)

$selectTheme.addEventListener("change", (e: any) => changeTheme(e.target.value ? e.target.value : 'vs-dark'))

$selectCSSLibrary.addEventListener("change", () => {
  saveConfigInLocalStorage()
  updateOutput()
})

$fullscreenBtn.addEventListener("click", resultToFullScreen)

document.addEventListener("keydown", (e) => {
  if(!e.ctrlKey) {
    return
  }
  if(e.key === 's') {
    e.stopPropagation()
    e.preventDefault()
    saveInLocalStorage()
    return
  }
  if(e.key === 'l') {
    e.stopPropagation()
    e.preventDefault()
    toggleTheme()
    return
  }
})

window.onunload = () => saveInLocalStorage()

setLoadingScreen(2000)  
generateRandomLogoForMenu($logoimg)
loadFromLocalStorage()
loadConfigFromLocalStorage()
