import React, { useState, useEffect } from "react"
import Loading from "./Loading"
import CovidMap from "./CovidMap"
import LoadNationalTask from "../tasks/LoadNationalTask"
import NationalStats from "./NationalStats"
import Legend from "./Legend"
import legendItems from "../entities/LegendItems"
import Footer from "./Footer"
import LoadStatesTask from "../tasks/LoadStatesTask"

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
        textAlign: "center",
      }}
    >
      <h1>COVID 19 Statistics for Australia</h1>
      <hr />
    </div>
  )
}

const Main = () => {
  const [country, setCountry] = useState([])
  const [national, setNational] = useState([])
  const legendItemsInReverse = [...legendItems].reverse()

  const loadStates = () => {
    const loadStates = new LoadStatesTask()
    loadStates.loadStates(setCountry)
  }

  const loadNational = () => {
    const loadNationalTask = new LoadNationalTask()
    loadNationalTask.loadNational(setNational)
  }

  useEffect(() => {
    loadStates()
    loadNational()
  }, [])

  return (
    <div>
      {country.length === 0 || national.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <NationalStats national={national} />
          <CovidMap country={country} />
          <Legend legendItems={legendItemsInReverse} />
          <Footer national={national} />
        </div>
      )}
    </div>
  )
}

export default Main
