import React from "react"
import "./NationalStats.css"

const NationalStats = (data) => {
  const dayBefore = data.national[0]
  const day = data.national[1]

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  const ConfirmedStats = () => {
    let difference = Number(day.confirmed) - Number(dayBefore.confirmed)
    if (difference > 0) {
      return (
        <span className="difference">
          +<span id="new-confirmed">{numberWithCommas(difference)}</span> cases
          in the past week{" "}
        </span>
      )
    } else {
      return <span className="difference">No new cases in the past week</span>
    }
  }
  const DeathsStats = () => {
    let difference = Number(day.deaths) - Number(dayBefore.deaths)
    if (difference > 0) {
      return (
        <span className="difference">
          +<span id="new-deaths">{numberWithCommas(difference)}</span> deaths in
          the past week{" "}
        </span>
      )
    } else {
      return <span className="difference">No new deaths in the past week</span>
    }
  }
  return (
    <div id="box">
      <div id="confirmed-card">
        <span>
          <b>Confirmed</b>
        </span>
        <span id="confirmed">{numberWithCommas(day.confirmed)}</span>
        <div id="new-confirmed-box">
          <ConfirmedStats />
        </div>
      </div>
      <div id="deaths-card">
        <span>
          <b>Deaths</b>
        </span>
        <span id="deaths">{numberWithCommas(day.deaths)}</span>
        <div id="new-deaths-box">
          <DeathsStats />
        </div>
      </div>
    </div>
  )
}

export default NationalStats
