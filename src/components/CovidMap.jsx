import React, { useState } from "react"
import { MapContainer, GeoJSON, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./CovidMap.css"
import L from "leaflet"
import { Media } from "js-media-query"

const CovidMap = ({ country }) => {
  const [paneStats, setPaneStats] = useState("Hover to Inspect")

  const mapStyle = {
    fillColor: "#dbe2f0",
    fillOpacity: 1,
    weight: 2,
    opacity: 1,
    color: "#ffffff",
    dashArray: "2",
  }
  let highlight = {
    fillColor: "#1f2d47",
    weight: 2,
    opacity: 1,
  }
  const onEachState = (state, layer) => {
    let stateName = state.properties.STATE_NAME
    const confirmedText = state.properties.confirmedText
    const recoveredText = state.properties.recoveredText
    const deathsText = state.properties.deathsText

    layer.options.fillColor = state.properties.color

    const legendColor = {
      fillColor: state.properties.color,
      fillOpacity: 1,
      weight: 2,
      opacity: 1,
      color: "#ffffff",
      dashArray: "2",
    }

    layer.on("mouseout", () => {
      layer.setStyle(legendColor)
      document.querySelector("#info-pane").innerHTML = "Hover to Inspect"
    })

    let content = `
    <div style="text-align: center">
    <p><b>${stateName}</b>
    \n
    <p style="font-weight: 300"> Confirmed:
    <span style="color: orange; font-weight: 500">${confirmedText}</span>
    \n
    <p style="font-weight: 300"> Recovered:
    <span style="color: green; font-weight: 500">${recoveredText} </span>

    \n
    <p style="font-weight: 300"> Deaths:
    <span style="color: red; font-weight: 500">${deathsText}</span>

    </div>
    `

    // on mouseover highlight selected state and show that state's info
    layer.on("mouseover", () => {
      layer.setStyle(highlight)
      document.querySelector("#info-pane").innerHTML = content
    })

    layer.on("click", function (e) {
      document.querySelector("#info-pane").innerHTML = "Hover to Inspect"
      layer.setStyle(highlight)
    })
    layer.bindPopup(content)
  }

  function SetResizeListener() {
    const map = useMap()
    window.addEventListener("resize", () => {
      let viewportWidth = window.innerWidth
      let viewportHeight = window.innerHeight
      if (viewportWidth < 768 && viewportHeight < 768) {
        map.setZoom(3.25)
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        map.setZoom(3.5)
      } else {
        map.setZoom(4.25)
      }
    })
    return null
  }

  function SetInitialMapZoom() {
    let map = useMap()
    if (Media.min(768)) {
      map.setZoom(4)
    } else if (Media.min(480)) {
      map.setZoom(3.5)
    } else {
      map.setZoom(3.3)
    }
    return null
  }

  return (
    <div>
      <MapContainer
        center={[-28.734968, 134.489563]}
        zoom={4}
        maxZoom={4}
        scrollWheelZoom={false}
        zoomSnap={0.1}
        zoomControl={false}
        interactive={false}
        dragging={false}
        doubleClickZoom={false}
        layers={[
          L.tileLayer("", {
            attribution: "Map data &copy; OpenStreetMap contributors",
          }),
        ]}
      >
        <GeoJSON style={mapStyle} data={country} onEachFeature={onEachState} />
        <SetResizeListener />
        <SetInitialMapZoom />
        <div id="info-pane" className="leaflet-bar">
          {paneStats}
        </div>
      </MapContainer>
    </div>
  )
}

export default CovidMap
