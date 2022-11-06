import './style.css'
import { initialValues } from './constants'
import setLoadingScreen from './loading'
import { generateRandomLogoForMenu, newWindow, updateOutput, copyToClipboard, resultToFullScreen, shareToTwitter } from './utils'
import { alertMessage } from './alerts'
import { $html, $css, $js, $logoimg, $copyButton, $fullscreenBtn, $newTabButton, $shareButton } from './elements'

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

export const htmlEditor = monaco.editor.create($html, {
  value: initialValues.html,
  language: 'html',
  theme: 'vs-dark',
  fontSize: 20
})

export const cssEditor = monaco.editor.create($css, {
  value: initialValues.css,
  language: 'css',
  theme: 'vs-dark',
  fontSize: 20
})

export const jsEditor = monaco.editor.create($js, {
  value: initialValues.js,
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
  // const url = new URL(window.location.href)
  // url.searchParams.set('html', htmlEditor.getValue())
  // url.searchParams.set('css', cssEditor.getValue())
  // url.searchParams.set('js', jsEditor.getValue())
  // navigator.clipboard.writeText(url.toString())
  // alertMessage('Copied to clipboard', 'success', 2500)
  alertMessage('We are working on this feature!', 'warning', 2500)
  shareToTwitter()
})

$fullscreenBtn.addEventListener("click", resultToFullScreen)

setLoadingScreen(2000)
generateRandomLogoForMenu($logoimg)
updateOutput()