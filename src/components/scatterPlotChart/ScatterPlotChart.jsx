import { useEffect } from "react"
import * as d3 from "d3"

const ScatterPlotChart = () => {
  useEffect(() => {
    createPlotChart()
  }, [])

  const createPlotChart = () => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
    ).then((data) => {
      const x = d3.scaleLinear().domain([0, 4000]).range([0, width])
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))

      const y = d3.scaleLinear().domain([0, 500000]).range([height, 0])
      svg.append("g").call(d3.axisLeft(y))

      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
          return x(d.GrLivArea)
        })
        .attr("cy", function (d) {
          return y(d.SalePrice)
        })
        .attr("r", 1.5)
        .attr("fill", "steelblue")
    })
  }

  return <></>
}

export default ScatterPlotChart
