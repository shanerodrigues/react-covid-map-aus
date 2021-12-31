import React, { useState, useEffect } from "react"
import Loading from "./Loading"
import CovidMap from "./CovidMap"
import LoadNationalTask from "../tasks/LoadNationalTask"
import NationalStats from "./NationalStats"
import Legend from "./Legend"
import legendItems from "../entities/LegendItems"
import Footer from "./Footer"
import LoadStatesTask from "../tasks/LoadStatesTask"
import GithubCorner from "react-github-corner"
import Header from "./Header"

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
          <GithubCorner
            href={"https://github.com/shanerodrigues/react-covid-map-aus"}
            bannerColor="#151513"
            octoColor="#fff"
            size={80}
            direction="right"
          />
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
