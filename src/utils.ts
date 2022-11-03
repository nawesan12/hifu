export const $ = (e: string) => document.querySelector<HTMLElement>(e)

export const generateRandomLogoForMenu = (e: HTMLImageElement) => {
  const random = new Date().getTime()
  e.src = `https://avatars.dicebear.com/api/miniavs/${random}.svg`  
  
  const randomToSixLengthHex = () => {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  e.style.border = `4px solid #${randomToSixLengthHex()}`
}