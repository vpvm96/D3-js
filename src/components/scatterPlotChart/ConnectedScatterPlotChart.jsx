import { useEffect } from "react"
import * as d3 from "d3"

const ConnectedScatterplotChart = ({ data }) => {
  useEffect(() => {
    creatorConnectedScatterplotChart()
  }, [])

  const creatorConnectedScatterplotChart = () => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 700 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

    data.forEach((d) => {
      parseDate = d3.timeParse("%Y")
      d.date = parseDate(d.date)
      d.wage = +d.wage
    })

    data.sort((a, b) => a.date - b.date)

    const x = d3.scaleTime().range([0, width])
    const y = d3.scaleLinear().range([height, 0])

    x.domain(d3.extent(data, (d) => d.date))
    y.domain(d3.extent(data, (d) => d.wage))

    const valueLine = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.wage))

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueLine)
      .attr("stroke", "#32CD32")
      .attr("stroke-width", 2)
      .attr("fill", "#FFFFFF")

    const path = svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.wage))
      .attr("stroke", "#32CD32")
      .attr("stroke-width", 2)
      .attr("fill", "#FFFFFF")

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    svg.append("g").call(
      d3.axisLeft(y).tickFormat(function (d) {
        return "$" + d3.format(".2f")(d)
      })
    )
  }
}

export default ConnectedScatterplotChart
