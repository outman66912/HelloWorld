$(function(){
var width=400;
var height=400;
var padding={top:20,right:20,bottom:20,left:80}
var rectStep=35;
var rectWidth=30;
var dataset=[50,43,120,87,99,167,142];
var xAxisWidth=300;
var yAxisWidth=300;

var center=[[0.5,0.5],[0.7,0.8],[0.4,0.9],[0.11,0.32],[0.88,0.25],[0.75,0.12],[0.5,0.1],[0.2,0.3],[0.4,0.1],[0.6,0.7]];

var dataset2=[{country:"china",gdp:[[2000,11920],[2001,13170],[2002,14550],[2003,16500],[2004,19440],[2005,22870],[2006,27930]]},
              {country:"japan",gdp:[[2000,47310],[2001,41590],[2002,39800],[2003,43020],[2004,46550],[2005,45710],[2006,43560]]}];

eventBinding();
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

function draw(){
    d3.selectAll("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var updateRect=svg.selectAll(".rect").data(dataset);
    var enterRect=updateRect.enter();
    var exitRect=updateRect.exit();
    var updateText=svg.selectAll(".text").data(dataset);
    var enterText=updateText.enter();
    var exitText=updateText.exit();

     var xScale=d3.scaleBand()
                 .domain(dataset)
                 .rangeRound([0,xAxisWidth])
                 .paddingInner(0.5)
                 .paddingOuter(0.2);

    var yScale=d3.scaleLinear()
                 .domain([0,d3.max(dataset)])
                 .range([0,yAxisWidth]);

//    alert(xScale.step())
    updateRect.attr("fill","steelblue")
            .attr("x",function(d,i){
                return padding.left+xScale(d);
            })
            .attr("y",function(d){
                return height-padding.bottom-yScale(d);
            })
            .attr("width",xScale.bandwidth())
            .attr("height",function(d){
                return yScale(d);
            });

    enterRect.append("rect")
            .attr("fill","steelblue")
            .attr("x",function(d,i){
                return padding.left+xScale(d);
            })
            .attr("y",function(d){
                return height-padding.bottom-yScale(d);
            })
            .attr("width",xScale.bandwidth())
            .attr("height",function(d){
                return yScale(d);
            });
    exitRect.remove();
    updateText.attr("fill","white")
            .attr("font-size","14px")
            .attr("text-anchor","middle")
            .attr("x",function(d,i){
                return padding.left+xScale(d);
            })
            .attr("y",function(d){
                return height-padding.bottom-yScale(d);
            })
            .attr("dx",xScale.bandwidth()/2)
            .attr("dy","1em")
            .text(function(d){
                return d;
            });
    enterText.append("text")
            .attr("fill","white")
            .attr("font-size","14px")
            .attr("text-anchor","middle")
            .attr("x",function(d,i){
                return padding.left+xScale(d);
            })
            .attr("y",function(d){
                return height-padding.bottom-yScale(d);
            })
            .attr("dx",xScale.bandwidth()/2)
            .attr("dy","1em")
            .text(function(d){
                return d;
            });
    exitText.remove();

    var xAxis = d3.axisBottom().scale(xScale).tickSizeOuter(0);
    yScale.range([yAxisWidth,0]);
    var yAxis=d3.axisLeft().scale(yScale).tickSizeOuter(0).tickFormat(d3.format("$0.1f"));
    svg.append("g").attr("class","axis").attr("transform","translate("+padding.left+","+(height-padding.bottom)+")").call(xAxis);
    svg.append("g").attr("class","axis").attr("transform","translate("+padding.left+","+(height-padding.bottom-yAxisWidth)+")").call(yAxis);



}
function draw2(){
//    d3.select("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var updateCircle=svg.selectAll(".circle").data(center);
    var enterCircle=updateCircle.enter();
    var exitCircle=updateCircle.exit();


     var xScale=d3.scaleLinear()
                  .domain([0,1.2*d3.max(center,function(d){return d[0]})])
                  .range([0,xAxisWidth]);

    var yScale=d3.scaleLinear()
                 .domain([0,1.2*d3.max(center,function(d){return d[1]})])
                 .range([0,yAxisWidth]);

    updateCircle.attr("fill","black")
            .attr("cx",function(d){
                return padding.left+xScale(d[0]);
            })
            .attr("cy",function(d){
                return height-padding.bottom-yScale(d[1]);
            })
            .attr("r",5);


    enterCircle.append("circle")
           .attr("fill","black")
           .attr("cx",function(d){
                return padding.left+xScale(d[0]);
            })
            .attr("cy",function(d){
                return height-padding.bottom-yScale(d[1]);
            })
            .attr("r",5);
    exitCircle.remove();


    var xAxis = d3.axisBottom().scale(xScale).tickSizeOuter(0);
    yScale.range([yAxisWidth,0]);
    var yAxis=d3.axisLeft().scale(yScale).tickSizeOuter(0);
    svg.append("g").attr("class","axis").attr("transform","translate("+padding.left+","+(height-padding.bottom)+")").call(xAxis);
    svg.append("g").attr("class","axis").attr("transform","translate("+padding.left+","+(height-padding.bottom-yAxisWidth)+")").call(yAxis);



}
function draw3(){
   d3.selectAll("svg").remove();
    var maxGdp=0;
    for(var i=0;i<dataset2.length;i++){
    var temp=d3.max(dataset2[i].gdp,function(d){return d[1]});
    if(temp>maxGdp){
        maxGdp=temp;
    }
    }

    var xScale=d3.scaleLinear()
                .domain([2000,2005])
                .range([0,width-padding.left-padding.right]);
    var yScale=d3.scaleLinear()
                .domain([0,maxGdp])
                .range([height-padding.top-padding.bottom,0]);

    var linePath=d3.line()
                   .x(function(d){return xScale(d[0]);})
                   .y(function(d){return yScale(d[1]);})
                   .curve(d3.curveBasis);


    var colors=[d3.rgb(0,0,255),d3.rgb(0,255,0)];
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var updatePath=svg.selectAll(".path").data(dataset2);
    var enterPath=updatePath.enter();
    var exitPath=updatePath.exit();
    enterPath.append("path")
             .attr("transform","translate("+padding.left+","+padding.top+")")
             .attr("d",function(d){return linePath(d.gdp)})
             .attr("fill","none")
             .attr("stroke-width",3)
             .attr("stroke",function(d,i){
                return colors[i];
             });
    updatePath.attr("transform","translate("+padding.left+","+padding.top+")")
             .attr("d",function(d){return linePath(d.gdp)})
             .attr("fill","none")
             .attr("stroke-width",3)
             .attr("stroke",function(d,i){
                return colors[i];
             });
    exitPath.remove();
    var xAxis = d3.axisBottom().scale(xScale).tickSizeOuter(0).ticks(5).tickFormat(d3.format("d"));
    var yAxis=d3.axisLeft().scale(yScale).tickSizeOuter(0);
    svg.append("g").attr("class","axis").attr("transform","translate("+padding.left+","+(height-padding.bottom)+")").call(xAxis);
    svg.append("g").attr("class","axis").attr("transform","translate("+padding.left+","+(padding.top)+")").call(yAxis);
}



function eventBinding(){
$("#sort").on("click",function(){
        dataset.sort(d3.ascending);
        draw();
});
$("#add").on("click",function(){
    dataset.push(Math.floor(Math.random()*100));
    draw();
});
$("#example1").on("click",function(){
    draw();
    draw2();
});
$("#example2").on("click",function(){
    draw3();
});
}
})
