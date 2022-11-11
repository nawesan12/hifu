import './style.css'
import setLoadingScreen from './loading'
import { generateRandomLogoForMenu, newWindow, updateOutput, copyToClipboard, resultToFullScreen, loadFromLocalStorage, saveInLocalStorage } from './utils'
import { alertMessage } from './alerts'
import { $html, $css, $js, $logoimg, $copyButton, $fullscreenBtn, $newTabButton, $shareButton, $saveButton, $settingsButton } from './elements'

import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { openSettings } from './settings'

window.MonacoEnvironment?({
  getWorkerUrl: (_: any, label: string) => {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'javascript') return new JsWorker()
    return
  }
}):null

export const htmlEditor = monaco.editor.create($html, {
  value: "",
  language: 'html',
  theme: 'vs-dark',
  fontSize: 20
})

export const cssEditor = monaco.editor.create($css, {
  value: "",
  language: 'css',
  theme: 'vs-dark',
  fontSize: 20
})

export const jsEditor = monaco.editor.create($js, {
  value: "",
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 20
})


htmlEditor.onDidChangeModelContent(updateOutput)

cssEditor.onDidChangeModelContent(updateOutput)

jsEditor.onDidChangeModelContent(updateOutput)

$logoimg.addEventListener("click", () => generateRandomLogoForMenu($logoimg))

$copyButton.addEventListener("click", copyToClipboard)

$newTabButton.addEventListener("click", () => newWindow())

$shareButton.addEventListener("click", () => {
  alertMessage('We are working on this feature!', 'warning', 2500)
})

$saveButton.addEventListener("click", saveInLocalStorage)

$settingsButton.addEventListener("click", openSettings)

$fullscreenBtn.addEventListener("click", resultToFullScreen)

window.onunload = () => saveInLocalStorage()

setLoadingScreen(2000)  
generateRandomLogoForMenu($logoimg)
loadFromLocalStorage()