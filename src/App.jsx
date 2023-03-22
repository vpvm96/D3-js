import React from "react"
import LineChart from "./components/lineChart/LineChart"
import ScatterPlotChart from "./components/scatterPlotChart/ScatterPlotChart"
import StepChart from "./components/stepChart/StepChart"
import SplineChart from "./components/splineChart/SplineChart"
import BarChart from "./components/barChart/BarChart"
import { splineChartData, barChartData } from "./utils/chartData"

const App = () => {
  return <BarChart data={barChartData} />
}

export default App
