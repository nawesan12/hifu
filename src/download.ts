//@ts-nocheck comment at the top of the file

import JSZip from 'jszip'
import { htmlEditor, cssEditor, jsEditor } from "./main"

export const downloadResultZippedFiles = () => {
  const zip = new JSZip()
  zip.file("index.html", htmlEditor.getValue())
  zip.file("style.css", cssEditor.getValue())
  zip.file("script.js", jsEditor.getValue())
  zip.file("README.md", `
# Hifu Project
### This is a README file for your project. You can edit it as you want.

## Stack used: 
  - HTML
  - CSS
  - JavaScript
### Config: 
  - ${localStorage.getItem('theme') === 'vs-dark' ? 'VS Dark' : 'VS Light'} Theme
  - ${localStorage.getItem('css-library')} CSS Library

### This project was created with Hifu[https://hifu.vercel.app]
  `)
  
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "My Hifu.zip")
  })
}
