import papa from "papaparse"

class LoadNationalTask {
  covid19DataUrl =
    "https://raw.githubusercontent.com/M3IT/COVID-19_Data/master/Data/COVID_AU_national_cumulative.csv"

  setState = null

  loadNational = (setState) => {
    this.setState = setState
    papa.parse(this.covid19DataUrl, {
      download: true,
      header: true,
      complete: (res) => this.#meme(res.data),
    })
  }

  #meme = (nationalData) => {
    nationalData.pop()
    let currentNationalCovidInfo = nationalData.slice(
      nationalData.length - 2,
      nationalData.length
    )
    this.setState(currentNationalCovidInfo)
  }
}

export default LoadNationalTask
