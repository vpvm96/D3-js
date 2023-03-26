import { useEffect } from "react"
import * as d3 from "d3"

const DoughnutChart = ({ data }) => {
  useEffect(() => {
    createDoughnutChart()
  }, [])

  const createDoughnutChart = () => {
    const width = 450,
      height = 450,
      margin = 40

    const radius = Math.min(width, height) / 2 - margin

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    const color = d3
      .scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    const pie = d3.pie().value((d) => d[1])

    const data_ready = pie(Object.entries(data))

    svg
      .selectAll("whatever")
      .data(data_ready)
      .join("path")
      .attr("d", d3.arc().innerRadius(100).outerRadius(radius))
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  }

  return <></>
}

export default DoughnutChart
