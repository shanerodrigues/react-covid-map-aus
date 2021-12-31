import papa from "papaparse"
import * as stateMap from "../data/australia.json"
import legendItems from "../entities/LegendItems"

class LoadStatesTask {
  covid19DataUrl =
    "https://raw.githubusercontent.com/M3IT/COVID-19_Data/master/Data/COVID_AU_cumulative.csv"

  setState = null

  loadStates = (setState) => {
    let country = stateMap
    this.setState = setState
    papa.parse(this.covid19DataUrl, {
      download: true,
      header: true,
      complete: (res) => this.#processCovidData(res.data, country),
    })
  }

  #processCovidData = (stateCovidInfo, countryJSON) => {
    let countryFeatures = countryJSON.default.features

    // removes last item which is an empty object
    // stores last eight items of data that correspond to the most recent data of the eight states/territories
    stateCovidInfo.pop()
    let currentStatesCovidInfo = stateCovidInfo.slice(
      Math.max(stateCovidInfo.length - 8)
    )

    for (let i = 0; i < countryFeatures.length; i++) {
      const currentState = countryFeatures[i]
      const currentStateInfo = currentStatesCovidInfo.find(
        (state) =>
          state.administrative_area_level_2 ===
          currentState.properties.STATE_NAME
      )

      currentState.properties.confirmed = 0
      currentState.properties.recovered = 0
      currentState.properties.deaths = 0
      currentState.properties.confirmedText = "0"
      currentState.properties.recoveredText = "0"
      currentState.properties.deathsText = "0"

      if (currentStateInfo !== null) {
        const confirmed = Number(currentStateInfo.confirmed)
        currentState.properties.confirmed = confirmed
        currentState.properties.confirmedText =
          this.#numberWithCommas(confirmed)
        const recovered = Number(currentStateInfo.recovered)
        currentState.properties.recovered = recovered
        currentState.properties.recoveredText =
          this.#numberWithCommas(recovered)
        const deaths = Number(currentStateInfo.deaths)
        currentState.properties.deaths = deaths
        currentState.properties.deathsText = this.#numberWithCommas(deaths)
      }

      this.#setCountryColor(currentState)
    }
    this.setState(countryFeatures)
  }

  #setCountryColor = (mapState) => {
    const legendItem = legendItems.find((legendItem) =>
      legendItem.isFor(mapState.properties.confirmed)
    )
    if (legendItem != null) {
      mapState.properties.color = legendItem.color
    }
  }

  #numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
}

export default LoadStatesTask
