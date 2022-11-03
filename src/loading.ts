import { $ } from "./utils"

export default (lapse: number) => {
  window.addEventListener("load", () => {
    const hifu = $("#hifu")

    const loadingScreen: HTMLElement = document.createElement("div")
    loadingScreen.className = "loading-screen"
    loadingScreen.innerHTML = `
      
    `
    hifu?.appendChild(loadingScreen)

    setTimeout(() => {
      hifu?.removeChild(loadingScreen)      
    }, lapse)
  })
}