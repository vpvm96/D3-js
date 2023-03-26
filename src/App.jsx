import React from "react"
import DoughnutChart from "./components/doughnutChart/DoughnutChart"
import { doughnutChartData } from "./utils/chartData"

const App = () => {
  return <DoughnutChart data={doughnutChartData} />
}

export default App
