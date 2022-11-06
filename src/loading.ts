import { $ } from "./elements"

export default (lapse: number) => {
  window.addEventListener("load", () => {
    const hifu = $("#hifu")

    const random = new Date().getTime()

    const loadingScreen: HTMLElement = document.createElement("div")
    loadingScreen.className = "loading-screen"
    loadingScreen.innerHTML = `
      <div class="loading-container">
        <h2>Hifu!</h2>
        <p>Loading...</p>
        <img alt="Hifu!" src="https://avatars.dicebear.com/api/big-smile/${random}.svg"/>
      </div>
    `
    hifu?.appendChild(loadingScreen)

    setTimeout(() => {
      hifu?.removeChild(loadingScreen)      
    }, lapse)
  })
}