import LegendItem from "./LegendItem"

const legendItems = [
  new LegendItem("150,000 +", "#2e436b", (cases) => cases > 150_000, "white"),
  new LegendItem(
    "50,000 - 150,000",
    "#4565a1",
    (cases) => cases > 50_000 && cases <= 150_000,
    "white"
  ),
  new LegendItem(
    "15,000 - 50,000",
    "#829bc9",
    (cases) => (cases > 15_000) & (cases <= 50_000),
    "black"
  ),
  new LegendItem(
    "1000 - 15,000",
    "#c9d4e8",
    (cases) => (cases >= 1000) & (cases <= 15_000),
    "black"
  ),
]

export default legendItems
