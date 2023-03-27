import React from "react"
import ConnectedScatterplotChart from "./components/scatterPlotChart/ConnectedScatterplotChart"
import { scatterPlotChartData } from "./utils/chartData"

const App = () => {
  return <ConnectedScatterplotChart data={scatterPlotChartData} />
}

export default App
