import React from "react"
import "./Footer.css"

const Footer = (data) => {
  let oldDateFormat = data.national[1].date.split("-")
  let date = oldDateFormat[2] + "-" + oldDateFormat[1] + "-" + oldDateFormat[0]
  return (
    <div id="last-updated">
      Data last updated: <b>{date}</b>
      <div>
        Data sourced from:{" "}
        <a
          aria-label="covid data from covid19data.com.au"
          href="https://github.com/M3IT/COVID-19_Data"
        >
          COVID19Data.com.au
        </a>
      </div>
    </div>
  )
}

export default Footer
