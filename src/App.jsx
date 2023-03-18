import React from "react"
import LineChart from "./components/lineChart/LineChart"
import ScatterPlotChart from "./components/scatterPlotChart/ScatterPlotChart"
import StepChart from "./components/stepChart/StepChart"
import { stepChartData } from "./utils/chartData"

const App = () => {
  return (
    <div>
      <StepChart data={stepChartData} />
    </div>
  )
}

export default App
