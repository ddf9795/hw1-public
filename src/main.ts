import './reset.css'
import './styles/main.css'
import {subtitles} from './data.ts'
import {getRandomItemFrom} from './utils.ts'

//Get and store our form objects
const colorOption = document.querySelector("#color") as HTMLSelectElement
const numOption = document.querySelector("#tilenum") as HTMLInputElement
const sizeOption = document.querySelector("#tilesize") as HTMLInputElement
const widthOption = document.querySelector("#borderwidth") as HTMLInputElement
const multOption = document.querySelector("#brightmult") as HTMLSelectElement
const stepOption = document.querySelector("#brightsteps") as HTMLInputElement

const submitButton = document.querySelector("#submit") as HTMLButtonElement

const resetButton = document.querySelector("#reset") as HTMLButtonElement

const bodyElement = document.querySelector("body") as HTMLBodyElement

const subtitleElement = document.querySelector("#subtitle") as HTMLHeadingElement

//URL base
const urlBase = "https://php-noise.com/noise.php?"

const randomizeSubtitle = () => {
    subtitleElement.innerText = getRandomItemFrom(subtitles)
}

window.onload = randomizeSubtitle

//Function to put together our query
const gatherInput = () => {
    const query: QueryObject = {
        hex: colorOption.value,
        tiles: numOption.value,
        tileSize: sizeOption.value,
        borderWidth: widthOption.value,
        multi: multOption.value,
        steps: stepOption.value
    }

    if (colorOption.value == "") { delete query.hex }

    submitQuery(query)
}

submitButton.addEventListener("click", gatherInput)

const reset = () => {
    randomizeSubtitle()
    bodyElement.className = "preparing"
    bodyElement.style.backgroundImage = "url('../styles/background.png')"
    bodyElement.style.backgroundSize = "cover"
    colorOption.value = ""
    numOption.value = "50"
    sizeOption.value = "7"
    widthOption.value = "0"
    multOption.value = "1.5"
    stepOption.value = "5"
}

resetButton.addEventListener("click", reset)

export const submitQuery = async (queryObject: {hex?: string, tiles?: string, tileSize?: string, borderWidth?: string, multi?: string, steps?: string}) => {
    const params = new URLSearchParams(queryObject)
    const request = new Request(urlBase + params + "&json", { method: 'GET'})

    fetch(request)
    .then((response) => {
        if (!response.ok) {}
        return response.json()
    })
    .then((data) => {
        processData(data)
    })
}

const processData = (data: Noise) => {
    bodyElement.className = "displaying"
    bodyElement.style.backgroundImage = "url(" + data.uri + ")"
    bodyElement.style.backgroundSize = "auto"
}

interface Noise {
    uri: string
}

interface QueryObject {
    hex?: string,
    tiles?: string,
    tileSize?: string,
    borderWidth?: string,
    multi?: string,
    steps?: string
}