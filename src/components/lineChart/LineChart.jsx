import { useEffect } from "react"
import * as d3 from "d3"

const LineChart = ({ data }) => {
  useEffect(() => {
    createChart()
  }, [])

  const createChart = () => {
    const width = 400
    const height = 400
    const margin = { top: 40, right: 40, bottom: 40, left: 40 }

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([margin.left, width - margin.right])

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top])

    const xAxis = (g) => {
      return g
        .attr("transform", `translate(0, ${height})`)
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
    }

    const yAxis = (g) => {
      return g
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          d3.axisLeft(y).tickValues([0, 20, 40, 60, 80, 100]).tickSize(-width)
        )
        .call(d3.axisLeft(y))
        .attr("class", "gird")
    }

    svg.append("g").call(xAxis)
    svg.append("g").call(yAxis)

    // svg
    //   .append("g")
    //   .selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", (d) => x(d.date) + x.bandwidth() / 2)
    //   .attr("cy", (d) => y(d.value))
    //   .attr("r", 5)
    //   .attr("fill", "steelblue")

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (data) => x(data.date) + x.bandwidth() / 2 - 10)
      .attr("y", (data) => y(data.value))
      .attr("width", 20)
      .attr("height", (data) => y(0) - y(data.value))
      .attr("class", "bar-chart")
      .attr("fill", "steelblue")

    const line = d3
      .line()
      .x((d) => x(d.date) + x.bandwidth() / 2)
      .y((d) => y(d.value))

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("d", line)

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.date) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .text((d) => d.value)
      .attr("fill", "black")
      .attr("font-family", "Tahoma")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")

    return <></>
  }
}

export default LineChart
