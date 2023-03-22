import { useEffect } from "react"
import * as d3 from "d3"

const BarChart = ({ data }) => {
  useEffect(() => {
    createBarChart()
  }, [])

  const createBarChart = () => {
    const width = 300,
      height = 300
    const padding = 30

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid rgba(0,0,0,0.1)")

    const xAxisScale = d3
      .scaleBand()
      .domain(data.map((_, i) => i))
      .range([padding, width - padding])
      .padding(0.1)
    const xAxis = d3.axisBottom().scale(xAxisScale)

    const yAxisScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - padding, padding])
    const yAxis = d3.axisLeft().scale(yAxisScale)

    const xAxisTranslate = width - padding
    svg
      .append("g")
      .attr("class", "x-axis")
      .call(xAxis)
      .attr("transform", `translate(0, ${xAxisTranslate})`)
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .attr("transform", `translate(${padding}, 0)`)
    svg.append("g").attr("class", "val")

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("height", (d) => height - yAxisScale(d) - padding)
      .attr("width", xAxisScale.bandwidth())
      .attr("x", (d, i) => xAxisScale(i))
      .attr("y", (d) => yAxisScale(d))
      .attr("fill", "orange")
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)

    svg
      .select(".val")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => xAxisScale(i) + xAxisScale.bandwidth() / 2)
      .attr("y", (d) => yAxisScale(d))
      .text((d) => d)
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
    // .attr("display", "none")

    function onMouseOut(_, i) {
      d3.select(this).transition().duration(400).style("fill", "orange")
      d3.select(".val")
        .selectAll("text")
        .filter((d, index) => index === i)
        .attr("display", "none")
    }

    function onMouseOver(_, i) {
      d3.select(this).transition().duration(400).style("fill", "red")
      d3.select(".val")
        .selectAll("text")
        .filter((d, index) => index === i)
        .attr("display", "block")
    }
  }

  return <></>
}

export default BarChart
