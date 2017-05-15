$(function(){
var width=400;
var height=400;
var padding={top:20,right:20,bottom:20,left:20}
var rectStep=35;
var rectWidth=30;
var dataset=[50,43,120,87,99,167,142];
draw();
//svg.append("circle").attr("cx","50px").attr("cy","50px").attr("r","50px").attr("fill","red");
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

})
