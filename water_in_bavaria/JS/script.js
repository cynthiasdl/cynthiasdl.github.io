// script.js

const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");
const centerX = width / 2;
const centerY = height / 2;

// Wasserglas (Trapez) 
const trapezoidPoints = [
    [centerX - 70, centerY - 100],
    [centerX + 70, centerY - 100],
    [centerX + 50, centerY + 100],
    [centerX - 50, centerY + 100]
];
svg.append("polygon")
    .attr("points", trapezoidPoints.map(d => d.join(",")).join(" "))
    .attr("fill", "#C0F8F8")
    .attr("stroke", "grey")
    .attr("stroke-width", 2);

// Text auf dem Wasserglas
svg.append("text")
    .attr("class", "glass-text")
    .attr("x", centerX)
    .attr("y", centerY - 130)
    .attr("text-anchor", "middle")
    .attr("dy", ".7em")
    .text("What's");

svg.append("text")
    .attr("class", "glass-text2")
    .attr("x", centerX)
    .attr("y", centerY -65)
    .attr("text-anchor", "middle")
    .attr("dy", ".7em")
    .text("in my");  

svg.append("text")
    .attr("class", "glass-text3")
    .attr("x", centerX)
    .attr("y", centerY)
    .attr("text-anchor", "middle")
    .attr("dy", ".7em")
    .text("water");     

// Text unter dem Wasserglas
svg.append("text")
.attr("class", "hover-text")
.attr("x", centerX)
.attr("y", centerY + 130) 
.attr("text-anchor", "middle")
.text("hover on glass");

// Kreise und Text 
const circleGroup = svg.append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`)
    .attr("opacity", 0);

const numCircles = 8;
const radius = 240;
const angleStep = (2 * Math.PI) / numCircles;
const circleText = [
    "iron", 
    "magnesium", 
    "potassium", 
    "calcium", 
    "manganese", 
    "fluoride", 
    "sulphate", 
    "chloride"
];

for (let i = 0; i < numCircles; i++) {
    const angle = i * angleStep;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const circle = circleGroup.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 30) 
        .attr("fill", "#6DB9C3");

    circleGroup.append("text")
        .attr("class", "ring-text")
        .attr("x", x)
        .attr("y", y + 12) 
        .attr("text-anchor", "middle")
        .text(circleText[i]);
}

// Mouseover-Event
svg.select("polygon")
    .on("mouseover", () => {
        circleGroup.transition()
            .duration(700)
            .attr("opacity", 1)
            .selectAll("circle")
            .attr("r", 60); 
    })
    .on("mouseout", () => {
        circleGroup.transition()
            .duration(8000)
            .attr("opacity", 0)
            .selectAll("circle")
            .attr("r", 30); 
    });
