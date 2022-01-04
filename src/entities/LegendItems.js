import LegendItem from "./LegendItem"

const legendItems = [
  new LegendItem("50,000 +", "#2e436b", (cases) => cases > 50_000, "white"),
  new LegendItem(
    "10,000 - 50,000",
    "#4565a1",
    (cases) => cases > 10_000 && cases <= 50_000,
    "white"
  ),
  new LegendItem(
    "1,000 - 10,000",
    "#829bc9",
    (cases) => (cases > 1_000) & (cases <= 10_000),
    "black"
  ),
  new LegendItem(
    "0 - 1,000",
    "#c9d4e8",
    (cases) => (cases >= 0) & (cases <= 1_000),
    "black"
  ),
]

export default legendItems
