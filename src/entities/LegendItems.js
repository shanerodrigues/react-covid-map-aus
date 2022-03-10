import LegendItem from "./LegendItem"

const legendItems = [
  new LegendItem(
    "1,000,000 +",
    "#1f2d47",
    (cases) => cases > 1_000_000,
    "white"
  ),
  new LegendItem(
    "500,000 - 1,000,000",
    "#2e436b",
    (cases) => cases > 500_000 && cases <= 1_000_000,
    "white"
  ),
  new LegendItem(
    "250,000 - 550,000",
    "#4565a1",
    (cases) => cases > 250_000 && cases <= 500_000,
    "white"
  ),
  new LegendItem(
    "50,000 - 250,000",
    "#829bc9",
    (cases) => (cases > 50_000) & (cases <= 250_000),
    "black"
  ),
  new LegendItem(
    "0 - 50,000",
    "#c9d4e8",
    (cases) => (cases >= 0) & (cases <= 50_000),
    "black"
  ),
]

export default legendItems
