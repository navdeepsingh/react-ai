import React, { Component } from 'react';
import * as d3 from 'd3';
import config from '../config';

// Stateless Function Component
class Results extends Component {

  componentDidMount() {
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        legendRectSize = '150',
        legendSpacing = '70',
        apiUrl= config.api_url + '/api/results';

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    // Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    var svgTwitter = d3.select("#twitter-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var svgFacebook = d3.select("#facebook-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    d3.json(apiUrl, function(error, data) {
        var dataJson = data.twitterFeeds;
        dataJson.forEach(function(d) {
            d.index = d.index;
            d.score = +d.score;
        });

      x.domain(dataJson.map(function(d) { return d.index; }));
      y.domain([d3.min(dataJson, function(d) { return d.score; }), d3.max(dataJson, function(d) { return d.score; })]);

      svgTwitter.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
      .append('text')
         .text("Twitter Sentiment Analysis")
          .style("text-anchor", "end")
          .attr("fill", "black")
          .attr("dx", function(d) {return width/2 + 20;})
          .attr("dy", "3em")
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "0.3em")
          .attr("dy", "0.7em");

      svgTwitter.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .text("Score")
          .style("text-anchor", "end")
          .attr("fill", "black");

      svgTwitter.selectAll(".bar")
          .data(dataJson)
          .enter().append("rect")
          .attr("class", function(d) {
        if (d.score > 0) {
          return 'bar positive';
        } else if (d.score < 0) {
          return 'bar negative';
        } else {
          return 'bar neutral';
        }
      })
          .attr("x", function(d) { return x(d.index); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.score); })
          .attr("height", function(d) { return height - y(d.score); })
      .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html(d.feed)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });

    d3.json(apiUrl, function(error, data) {
        var dataJson = data.facebookFeeds;
        dataJson.forEach(function(d) {
            d.index = d.index;
            d.score = +d.score;
        });

      x.domain(dataJson.map(function(d) { return d.index; }));
      y.domain([d3.min(dataJson, function(d) { return d.score; }), d3.max(dataJson, function(d) { return d.score; })]);

      svgFacebook.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
      .append('text')
         .text("Facebook Sentiment Analysis")
          .style("text-anchor", "end")
          .attr("fill", "black")
          .attr("dx", function(d) {return width/2 + 20;})
          .attr("dy", "3em")
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "0.3em")
          .attr("dy", "0.7em");

      svgFacebook.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .text("Score")
          .style("text-anchor", "end")
          .attr("fill", "black");

      svgFacebook.selectAll(".bar")
          .data(dataJson)
          .enter().append("rect")
          .attr("class", function(d) {
        if (d.score > 0) {
          return 'bar positive';
        } else if (d.score < 0) {
          return 'bar negative';
        } else {
          return 'bar neutral';
        }
      })
          .attr("x", function(d) { return x(d.index); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.score); })
          .attr("height", function(d) { return height - y(d.score); })
      .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html(d.feed)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });
  }

  render() {
    return (
            <div className="row results" id="results">
              <div className="col-md-12">
                <h2>Results</h2>
                <div id="twitter-chart"></div>
                <div id="facebook-chart"></div>
              </div>
            </div>
        )
  }
}

module.exports = Results;
