import { useEffect } from "react"
import * as d3 from "d3"

const SplineChart = ({ data }) => {
  useEffect(() => {
    createSplineChart()
  }, [])

  const createSplineChart = () => {
    const margin = { top: 20, right: 20, bottom: 50, left: 50 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const xScale = d3.scaleLinear().range([0, width])

    const yScale = d3.scaleLinear().range([height, 0])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    const line = d3
      .line()
      .curve(d3.curveCardinal)
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))

    xScale.domain(d3.extent(data, (d) => d.x))
    yScale.domain(d3.extent(data, (d) => d.y))

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    svg.append("g").attr("class", "y axis").call(yAxis)

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
  }
}

export default SplineChart
