import React from "react"
import LineChart from "./components/lineChart/LineChart"
import ScatterPlotChart from "./components/scatterPlotChart/ScatterPlotChart"
import StepChart from "./components/stepChart/StepChart"
import SplineChart from "./components/splineChart/SplineChart"
import { splineChartData } from "./utils/chartData"

const App = () => {
  return <SplineChart data={splineChartData} />
}

export default App
