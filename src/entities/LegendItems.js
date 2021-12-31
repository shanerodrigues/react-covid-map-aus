import LegendItem from "./LegendItem"

const legendItems = [
  new LegendItem("15,000 +", "#2e436b", (cases) => cases > 15_000, "white"),
  new LegendItem(
    "5,000 - 15,000",
    "#4565a1",
    (cases) => cases > 5_000 && cases <= 15_000,
    "white"
  ),
  new LegendItem(
    "1,000 - 5,000",
    "#829bc9",
    (cases) => (cases > 1_000) & (cases <= 5_000),
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
