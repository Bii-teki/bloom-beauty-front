
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ProductAnalytics = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    
    axios.get('https://bloom-beauty.onrender.com/products')
      .then((response) => {
        const productData = response.data;

        // Group products by category and calculate the total price and quantity for each category
        const categories = [...new Set(productData.map(product => product.category))];
        const categoryData = categories.map(category => {
          // Filter products by category and calculate totalQuantity
          console.log("productData:", productData);

          const totalQuantity = productData
            .filter(product => product.category === category)
            .reduce((total, product) => {
              console.log("Quantity:", product.quantity);
              const quantity = parseInt(product.quantity);
              console.log("Parsed Quantity:", quantity);
              if (!isNaN(quantity)) {
                return total + quantity;
              } else {
                console.log("Invalid quantity for product:", product);
                return total;
              }
            }, 0);

          console.log("Total Quantity for category", category, "is", totalQuantity);

                  
          // Filter products by category and calculate totalPrice
          const totalPrice = productData
            .filter(product => product.category === category)
            .reduce((total, product) => total + product.price, 0);
        
          return {
            category,
            totalQuantity,
            totalPrice,
          };
        });
              
        // Set up dimensions and margins for the chart
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Create an SVG element within the chart div
        const svg = d3
          .select(chartRef.current)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        // Extract categories, quantities, and prices from the data
        const category = categoryData.map((category) => category.category);
        const totalQuantities = categoryData.map((category) => category.totalQuantity);
        const totalPrices = categoryData.map((category) => category.totalPrice);
        

        // Create scales for x and y axes
        const x = d3.scaleBand().domain(categories).range([0, width]).padding(0.1);
        const yQuantity = d3.scaleLinear().domain([0, d3.max(totalQuantities)]).nice().range([height, 0]);
        const yPrice = d3.scaleLinear().domain([0, d3.max(totalPrices)]).nice().range([height, 0]);

        // Create the quantity line
        const quantityLine = d3.line()
          .x((d, i) => x(categories[i]) + x.bandwidth() / 2)
          .y(d => yQuantity(d))
          .curve(d3.curveMonotoneX);

        svg.append('path')
          .datum(totalQuantities)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(75, 192, 192, 0.6)')
          .attr('stroke-width', 2)
          .attr('d', quantityLine);

        // Create the price line
        const priceLine = d3.line()
          .x((d, i) => x(categories[i]) + x.bandwidth() / 2)
          .y(d => yPrice(d))
          .curve(d3.curveMonotoneX);

        svg.append('path')
          .datum(totalPrices)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(255, 99, 132, 0.6)')
          .attr('stroke-width', 2)
          .attr('d', priceLine);

        // Create the x and y axes
        svg.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));

        svg.append('g')
          .call(d3.axisLeft(yQuantity));

        // Add a legend
        svg.append('rect')
          .attr('x', 10)
          .attr('y', 10)
          .attr('width', 20)
          .attr('height', 20)
          .style('fill', 'rgba(75, 192, 192, 0.6)');

        svg.append('text')
          .attr('x', 40)
          .attr('y', 20)
          .text('Quantity');

        svg.append('rect')
          .attr('x', 10)
          .attr('y', 40)
          .attr('width', 20)
          .attr('height', 20)
          .style('fill', 'rgba(255, 99, 132, 0.6)');

        svg.append('text')
          .attr('x', 40)
          .attr('y', 50)
          .text('Price');
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Product Analytics</h1>
      <div ref={chartRef}></div>
    </div>
  );
};

export default ProductAnalytics;
