// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 610;

// Define the chart's margins as an object
var chartMargin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter ID, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data from data.csv
d3.csv("data.csv").then(function (journalData) {

    // // Print the tvData
    // console.log(journalData);


    // Step 1: Parse data and cast the healthcare and poverty value to a number for each state
    // ==============================

    journalData.forEach(function (state) {
        state.healthcare = +state.healthcare;
        state.poverty = +state.poverty;
    });

    // Step 2: Create scale functions
    // ==============================

    var xScale = d3.scaleLinear()
        .domain([(d3.min(journalData, d => d.poverty)) - 1, d3.max(journalData, d => d.poverty) + 1])
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([(d3.min(journalData, d => d.healthcare)) - 1, d3.max(journalData, d => d.healthcare) + 1])
        .range([chartHeight, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(journalData)
        .enter()

    circlesGroup
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "10")
        .attr("class", function (d) {
            return "stateCircle " + d.abbr;
        });

    // Create state labels for circles
    circlesGroup.append("text")
        .text(d => d.abbr)
        .attr("dx", d => xScale(d["poverty"]))
        .attr("dy", d => yScale(d["healthcare"]) + 10 / 2.5)
        .attr("font-size", 10)
        .attr("class", "stateText")
    // .on("mouseover", function (d) {
    //     // Show the tooltip
    //     toolTip.show(d);
    //     // Highlight the state circle's border
    //     d3.select("." + d.abbr).style("stroke", "#323232");
    // })
    // .on("mouseout", function (d) {
    //     // Remove tooltip
    //     toolTip.hide(d);
    //     // Remove highlight
    //     d3.select("." + d.abbr).style("stroke", "#e3e3e3");
    // });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare Access (%)");


    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top - 5})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");

}).catch(function (error) {
    console.log(error);
});