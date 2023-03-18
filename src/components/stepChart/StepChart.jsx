import { useEffect } from "react"
import * as d3 from "d3"

const StepChart = ({ data }) => {
  useEffect(() => {
    createStepChart()
  }, [])

  const createStepChart = () => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 }
    const width = 600 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x)])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([height, 0])

    const step = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveStepAfter)

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("trasnform", `translate(${margin.left}, ${margin.top})`)

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale))

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", step)

    svg
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 3)
      .attr("fill", "black")
  }

  return <></>
}

export default StepChart
