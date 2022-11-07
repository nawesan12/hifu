import { htmlEditor, cssEditor, jsEditor } from "./main"
import { $output } from "./elements"
import { alertMessage } from "./alerts"

export const generateRandomLogoForMenu = (e: HTMLImageElement) => {
  const random = new Date().getTime()
  e.src = `https://avatars.dicebear.com/api/miniavs/${random}.svg`  
  
  const randomToSixLengthHex = () => {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  e.style.border = `4px solid #${randomToSixLengthHex()}`
}

export const generateOutput = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Your Hifu result!</title>
        <link rel="icon" type="image/webp" href="/thunder.webp" />
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

export const updateOutput = () => {
  $output.srcdoc = generateOutput()
}

export const copyToClipboard = () => {
  navigator.clipboard.writeText($output.srcdoc)
  alertMessage('Copied to clipboard', 'success', 2500)
}

export const resultToFullScreen = () => {
  $output.requestFullscreen()
}

export const newWindow = () => {
  const newWindow = window.open()
  newWindow?.document.write(generateOutput())
  newWindow?.document.close()
  alertMessage('Project opened in a new tab!', 'success', 2500)
}

export const generateShareUrl = () => {
  const url = new URL(window.location.href)
  url.searchParams.set('html', htmlEditor.getValue())
  url.searchParams.set('css', cssEditor.getValue())
  url.searchParams.set('js', jsEditor.getValue())
  return url.toString()
}

export const shareToTwitter = () => {
  const url = generateShareUrl()
  const text = 'Check out this cool Hifu result!'
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
  window.open(twitterUrl, '_blank')
}