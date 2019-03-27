//load SVG container
window.onload = function(){
//stylize and size svg container
    var w = 1000, h = 500;
    var container = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "container")
        .style("background-color", "rgba(0,0,0,0.2)");
    var innerRect = container.append("rect")
        .datum(400)
        .attr("width", function(d){
            return d * 2.25;
        })
        .attr("height", function(d){
            return d;
        })
        .attr("class", "innerRect")
        .attr("x", 50)
        .attr("y", 50)
        .style("fill", "#FFFFFF");
//define the city population variables
    var cityPop = [
               {
                   city: 'Berlin',
                   population: 6004857
               },
               {
                   city: 'Hamburg',
                   population: 5107429
               },
               {
                   city: 'Stuttgart',
                   population: 5200000
               },
               {
                   city: 'Munich',
                   population: 2606021
               }
           ];
//apply scales to the center points of the city points on the plot
    var x = d3.scaleLinear()
               .range([90, 810])
               .domain([0, 3]);
    var minPop = d3.min(cityPop, function(d){
               return d.population;
           });
    var maxPop = d3.max(cityPop, function(d){
               return d.population;
           });
    var y = d3.scaleLinear()
               .range([450, 50])
               .domain([0, 7200000]);
//apply a color scaling color scheme based on population
    var color = d3.scaleLinear()
               .range([
                   "#7ec0ee",
                   "#003153"
               ])
               .domain([
                   minPop,
                   maxPop
               ]);
//create the scaling circles that represent the cities on the plot sized based on population
    var circles = container.selectAll(".circles")
               .data(cityPop)
               .enter()
               .append("circle")
               .attr("class", "circles")
               .attr("id", function(d){
                   return d.city;
               })
               .attr("r", function(d){

                   var area = d.population * 0.00075;
                   return Math.sqrt(area/Math.PI);
               })
               .attr("cx", function(d, i){

                   return 90 + (i * 180);
               })
               .attr("cy", function(d){

                   return 500 - (d.population * 0.00005);
               })
               .attr("cx", function(d, i){

                   return x(i);
               })
               .attr("cy", function(d){
                   return y(d.population);
               })
               .attr("cy", function(d){
                   return y(d.population);
               })
               .style("fill", function(d, i){
                   return color(d.population);
               })
               .style("stroke", "#000");
//create the axes and format the scale as well as the position and font
    var yAxis = d3.axisLeft(y);

    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    var labels = container.selectAll(".labels")
            .data(cityPop)
            .enter()
            .append("text")
            .attr("class", "labels")
            .attr("text-anchor", "left")
            .attr("y", function(d){

                return y(d.population) + 5;
            });

//formatting the lines and names next to the circles to clean up appearance
    var nameLine = labels.append("tspan")
            .attr("class", "nameLine")
            .attr("x", function(d,i){

                return x(i) + Math.sqrt(d.population * 0.001 / Math.PI) + 5;
            })
            .text(function(d){
                return d.city;
            });

   var format = d3.format(",");

   var popLine = labels.append("tspan")
            .attr("class", "popLine")
            .attr("x", function(d,i){

                return x(i) + Math.sqrt(d.population * 0.001 / Math.PI) + 5;
            })
            .attr("dy", "15")
            .text(function(d){
                return "Pop. " + format(d.population);
            });

};
