import * as monaco from 'monaco-editor'

import { $selectCSSLibrary, $selectTheme, $settingsMenu } from "./elements"
import { updateOutput } from './utils'

export const openSettings = () => {
  $settingsMenu.classList.toggle('hidden')
}

export const changeTheme = (theme: string) => {
  monaco.editor.setTheme(theme)
}

export const saveConfigInLocalStorage = () => {
  localStorage.setItem('css-library', $selectCSSLibrary.value)
  localStorage.setItem('theme', $selectTheme.value)
}

export const loadConfigFromLocalStorage = () => {
  if (localStorage.getItem('css-library')) {
    $selectCSSLibrary.value = localStorage.getItem('css-library')!
    updateOutput()
  }
  if (localStorage.getItem('theme')) {
    $selectTheme.value = localStorage.getItem('theme')!
    changeTheme($selectTheme.value)
  }
}