import React from "react"
import LineChart from "./components/lineChart/LineChart"
import { data } from "./utils/chartData"

const App = () => {
  return <LineChart data={data} />
}

export default App
