$(function(){
var width=400;
var height=400;
var padding={top:20,right:20,bottom:20,left:20}
var rectStep=35;
var rectWidth=30;
var dataset=[50,43,120,87,99,167,142];
draw();
scale();
scale2()
function draw(){
    d3.select("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var updateRect=svg.selectAll(".rect").data(dataset);
    var enterRect=updateRect.enter();
    var exitRect=updateRect.exit();
    var updateText=svg.selectAll(".text").data(dataset);
    var enterText=updateText.enter();
    var exitText=updateText.exit();
    updateRect.attr("fill","steelblue")
            .attr("x",function(d,i){
                return padding.left+i*rectStep;
            })
            .attr("y",function(d){
                return height-padding.bottom-d;
            })
            .attr("width",rectWidth)
            .attr("height",function(d){
                return d;
            });

    enterRect.append("rect")
            .attr("fill","steelblue")
            .attr("x",function(d,i){
                return padding.left+i*rectStep;
            })
            .attr("y",function(d){
                return height-padding.bottom-d;
            })
            .attr("width",rectWidth)
            .attr("height",function(d){
                return d;
            });
    exitRect.remove();
    updateText.attr("fill","white")
            .attr("font-size","14px")
            .attr("text-anchor","middle")
            .attr("x",function(d,i){
                return padding.left+i*rectStep;
            })
            .attr("y",function(d){
                return height-padding.bottom-d;
            })
            .attr("dx",rectWidth/2)
            .attr("dy","1em")
            .text(function(d){
                return d;
            });
    enterText.append("text")
            .attr("fill","white")
            .attr("font-size","14px")
            .attr("text-anchor","middle")
            .attr("x",function(d,i){
                return padding.left+i*rectStep;
            })
            .attr("y",function(d){
                return height-padding.bottom-d;
            })
            .attr("dx",rectWidth/2)
            .attr("dy","1em")
            .text(function(d){
                return d;
            });
    exitText.remove();

}
$("#sort").on("click",function(){
        dataset.sort(d3.ascending);
        draw();
});
$("#add").on("click",function(){
    dataset.push(Math.floor(Math.random()*100));
    draw();
});

function scale(){
    var svg=d3.select("body").append("svg")
              .attr("width",width)
              .attr("height",height);
    var xScale=d3.scaleLinear()
                 .domain([0,10])
                 .range([0,300]);
    var axis = d3.axisBottom()
                .scale(xScale);

    var axis1=d3.axisLeft().scale(xScale).ticks(5).tickSize(6)
    .tickSizeInner(10).tickSizeOuter(88).tickFormat(d3.format("$0.1f"));
    var axis2=d3.axisLeft().scale(xScale).tickValues([3,4,5,6]);
    var axis3=d3.axisLeft().scale(xScale).tickArguments([10, "s"]);
    var gAxis=svg.append("g").attr("transform","translate(80,80)");
//    axis(gAxis);
    axis1(gAxis);
//    axis2(gAxis);
//    axis3(gAxis);
}

function scale2(){
    var svg=d3.select("body").append("svg")
              .attr("width",width)
              .attr("height",height);

    var xScale=d3.scaleLinear()
                 .domain([0,10])
                 .rangeRound([0,300]);
    var xScale2=d3.scalePow().exponent(2)
                 .domain([0,10])
                 .rangeRound([0,310]);

    var xScale3=d3.scaleTime()
                 .domain([new Date(2000, 0, 1, 0), new Date(2000, 0,1, 5)])
                 .rangeRound([0,300]);
    var axis=d3.axisBottom().scale(xScale3).ticks(d3.timeMinute.every(60));

    var gAxis=svg.append("g").attr("transform","translate(80,80)");
    gAxis.call(axis);
}
})
