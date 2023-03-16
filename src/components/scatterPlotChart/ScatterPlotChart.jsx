import * as d3 from "d3"

const ScatterPlotChart = () => {
  const svg = d3.select("div").attr("width", 1200).attr("height", 500)

  const width = +svg.attr("width")
  const height = +svg.attr("height")

  const render = (data) => {
    const xValue = (d) => d.horsepower
    const xAxisLabel = "Horsepower"

    const yValue = (d) => d.weight
    const yAxisLabel = "Weight"

    const margin = { top: 80, right: 40, bottom: 70, left: 150 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const circleRadius = 10

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice()

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight])
      .nice()

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const xAixs = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(15)
    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10)

    const yaixsG = g.append("g").call(yAxis)

    yaixsG.selectAll(".domain").remove()
    yaixsG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -80)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel)

    const xaixsG = g
      .append("g")
      .call(xAixs)
      .attr("transform", `translate(0, ${innerHeight})`)

    xaixsG.select(".domain").remove()
    xaixsG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 60)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabel)

    g.append("text").attr("class", "title").attr("y", -10).text("Cars")

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", circleRadius)
  }

  d3.csv("https://vizhub.com/curran/datasets/auto-mpg.csv")
    .then((data) => {
      data.forEach((d) => {
        d.map = +d.map
        d.cylinders = +d.cylinders
        d.displacement = +d.displacement
        d.horsepower = +d.horsepower
        d.weight = +d.weight
        d.acceleration = +d.acceleration
        d.year = +d.year
      })
      render(data)
    })
    .catch((error) => console.log(error))
}

export default ScatterPlotChart
