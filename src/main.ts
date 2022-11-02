import './style.css'

const $ = (e: string) => document.querySelector<HTMLElement>(e)

const $html = $('#html') as HTMLTextAreaElement
const $css = $('#css') as HTMLTextAreaElement
const $js = $('#js') as HTMLTextAreaElement
const $output = $('#output') as HTMLIFrameElement

const $logoimg = $('#img-logo') as HTMLImageElement
const $copyButton = $('#copy-to-clipboard') as HTMLLIElement

const generateOutput = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          ${$css.value}
        </style>
      </head>
      <body>
        ${$html.value}
        <script>
          ${$js.value}
        </script>
      </body>
    </html>
  `
}

const updateOutput = () => {
  const output = generateOutput()
  $output.srcdoc = output
}

const generateRandomLogoForMenu = () => {
  const random = new Date().getTime()
  $logoimg.src = `https://avatars.dicebear.com/api/croodles/${random}.svg`  
}

const copyToClipboard = () => {
  navigator.clipboard.writeText($output.srcdoc)
  alert("Copied to clipboard!")
}

$html.addEventListener("input", updateOutput)

$css.addEventListener("input", updateOutput)

$js.addEventListener("input", updateOutput)

$logoimg.addEventListener("click", generateRandomLogoForMenu)

$copyButton.addEventListener("click", copyToClipboard)

generateRandomLogoForMenu()

