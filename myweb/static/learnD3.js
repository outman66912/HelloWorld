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

  var cityJson=[
  {"name": "Eve",   "parent": ""},
  {"name": "Cain",  "parent": "Eve"},
  {"name": "Seth",  "parent": "Eve"},
  {"name": "Enos",  "parent": "Seth"},
  {"name": "Noam",  "parent": "Seth"},
  {"name": "Abel",  "parent": "Eve"},
  {"name": "Awan",  "parent": "Eve"},
  {"name": "Enoch", "parent": "Awan"},
  {"name": "Azura", "parent": "Eve"}
];
var flare={
 "name": "flare",
 "children": [
  {
   "name": "animate",
   "children": [
    {"name": "Easing", "size": 17010},
    {"name": "FunctionSequence", "size": 5842},
    {
     "name": "interpolate",
     "children": [
      {"name": "ArrayInterpolator", "size": 1983},
      {"name": "ColorInterpolator", "size": 2047},
      {"name": "DateInterpolator", "size": 1375},
      {"name": "Interpolator", "size": 8746},
      {"name": "MatrixInterpolator", "size": 2202},
      {"name": "NumberInterpolator", "size": 1382},
      {"name": "ObjectInterpolator", "size": 1629},
      {"name": "PointInterpolator", "size": 1675},
      {"name": "RectangleInterpolator", "size": 2042}
     ]
    },
    {"name": "ISchedulable", "size": 1041},
    {"name": "Parallel", "size": 5176},
    {"name": "Pause", "size": 449},
    {"name": "Scheduler", "size": 5593},
    {"name": "Sequence", "size": 5534},
    {"name": "Transition", "size": 9201},
    {"name": "Transitioner", "size": 19975},
    {"name": "TransitionEvent", "size": 1116},
    {"name": "Tween", "size": 6006}
   ]
  },
  {
   "name": "data",
   "children": [
    {
     "name": "converters",
     "children": [
      {"name": "Converters", "size": 721},
      {"name": "DelimitedTextConverter", "size": 4294},
      {"name": "GraphMLConverter", "size": 9800},
      {"name": "IDataConverter", "size": 1314},
      {"name": "JSONConverter", "size": 2220}
     ]
    },
    {"name": "DataField", "size": 1759},
    {"name": "DataSchema", "size": 2165},
    {"name": "DataSet", "size": 586},
    {"name": "DataSource", "size": 3331},
    {"name": "DataTable", "size": 772},
    {"name": "DataUtil", "size": 3322}
   ]
  }

 ]
};

var data1 = [
  {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
  {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
  {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
  {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
];
var data2 = [
  {name: "PC", sales:[{year:2005,sell:3000},{year:2006,sell:1300},{year:2007,sell:3700},{year:2008,sell:4900}]},
  {name:"phone",sales:[{year:2005,sell:2000},{year:2006,sell:4000},{year:2007,sell:1810},{year:2008,sell:6540}] },
  {name:"soft",sales:[{year:2005,sell:1100},{year:2006,sell:1700},{year:2007,sell:1680},{year:2008,sell:4000}]}
];
var timeText;
eventBinding();

function topo(){
d3.selectAll("svg").remove();
 var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    d3.json("testp.json",function(err,toporoot){
 var color = d3.schemeCategory10;
        var geroot=topojson.feature(toporoot,toporoot.objects.china);

        var groups=svg.append("g");
        groups.selectAll("path")
              .data(geroot.features)
              .enter()
              .append("path")
              .style("fill",function(d,i){
              return color[i];
              }).attr("d",path)
    })
}
function treeMap(){
d3.selectAll("svg").remove();
 var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
    color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
    format = d3.format(",d");

   var x = d3.scaleLinear()
    .range([0, 300]);
       var y = d3.scaleLinear()
    .range([300, 0]);

  var root = d3.hierarchy(flare)
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
      .sum(sumBySize)
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
 var treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

     treemap(root);

       var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

        cell.append("rect")
      .attr("id", function(d) { return d.data.id; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("fill", function(d) { return color(d.parent.data.id); })
      .on('click',function(d){return zoom(d.data.id==d.parent.data.id?root:d.parent)});

        cell.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.id; })
    .append("use")
      .attr("xlink:href", function(d) { return "#" + d.data.id; });

  cell.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
    .selectAll("tspan")
      .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
      .attr("x", 4)
      .attr("y", function(d, i) { return 13 + i * 10; })
      .text(function(d) { return d; });

  cell.append("title")
      .text(function(d) { return d.data.id + "\n" + format(d.value); });
function sumByCount(d) {
  return d.children ? 0 : 1;
}

function sumBySize(d) {
  return d.size;
}

function zoom(d){
console.log(d)
    var kx=300/(d.x1-d.x0),ky=300/(d.y1-d.y0);
    x.domain([d.x0,d.x1]);
    y.domain([d.y0,d.y1]);
    console.log(kx*(d.x1-d.x0))
      console.log(ky*(d.y1-d.y0))

    var t=cell.transition().duration(750)
              .attr("transform",function(d){return "translate(" + x(d.x0) + "," + y(d.y0) + ")"; })
    t.select("rect").attr("width",function(d){return kx*(d.x1-d.x0)-1}).attr("height",function(d){ky*(d.y1-d.y0)-1})
}

}
function stack(){

 var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
  var color = d3.schemeCategory10;
var z = d3.interpolateCool;
var stack = d3.stack()
    .keys(["apples", "bananas", "cherries", "dates"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

var series = stack(data1);

var x = d3.scaleLinear()
    .domain([0,3])
    .range([0, width]);

    var maxY = d3.max(series, function(y) { return d3.max(y, function(d) { return d[1]; }); });
   var maxY1 = d3.min(series, function(y) { return d3.min(y, function(d) { return d[0]; }); });
var y = d3.scaleLinear()
    .domain([maxY1, maxY])
    .range([height, 0]);

var area = d3.area()
    .x(function(d, i) { return x(i); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });



    svg.selectAll("path")
  .data(series)
  .enter().append("path")
    .attr("d", area)
 .attr("fill", function(d, i) {  return z(Math.random()); });




    svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + 120 + ")")
    .call(d3.axisBottom(x));





}
function stack1(){
 d3.selectAll("svg").remove();
 var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
  var color = d3.schemeCategory10;

var stack = d3.stack()
    .keys(["apples", "bananas", "cherries", "dates"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

var series = stack(data1);

var x = d3.scaleBand()
    .domain(series[0].map(function(d){return getTimeString(d.data.month)}))
    .rangeRound([0, width])
    .padding(0.08);

    var maxY = d3.max(series, function(y) { return d3.max(y, function(d) { return d[1]; }); });
 var maxY1 = d3.max(series, function(y) { return d3.max(y, function(d) { return d[1]-d[0]; }); });

var y = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);

    var group = svg.selectAll(".series")
  .data(series)
  .enter().append("g")
    .attr("fill", function(d, i) { return color[i]; });

    var rect = group.selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d, i) { return x(getTimeString(d.data.month)); })
    .attr("y", height)
    .attr("width", x.bandwidth())
    .attr("height", 0);

    rect.transition()
    .delay(function(d, i) { return i*100; })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); });



    svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + 120 + ")")
    .call(d3.axisBottom(x));


    d3.selectAll("input")
    .on("change", changed);

    function changed() {
        if (this.value === "grouped") transitionGrouped();
        else transitionStacked();
    }
  function transitionGrouped() {
  y.domain([0, maxY1]);

  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 100; })
      .attr("x", function(d, i) { return x(getTimeString(d.data.month)) + x.bandwidth() / 4*(this.parentNode.__data__.index); })
      .attr("width", x.bandwidth() / 4)
    .transition()
      .attr("y", function(d) { return y(d[1] - d[0]); })
      .attr("height", function(d) { return y(0) - y(d[1] - d[0]); });

}
function transitionStacked() {

  y.domain([0, maxY]);
  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 100; })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); }).transition()
      .attr("x", function(d, i) {  return x(getTimeString(d.data.month)); })
      .attr("width", x.bandwidth());
}

}
function partition(){
    d3.selectAll("svg").remove();
 var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
 var color = d3.scaleOrdinal(d3.schemeCategory10);
 var format = d3.format(",d");
    var root = d3.hierarchy(flare).sum(function(d) { return d.size; });
     var partition = d3.partition()
    .size([height, width])
    .padding(1)
    .round(true);


       var cell = svg
    .selectAll(".node")
    .data(partition(root).descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y0 + "," + d.x0 + ")"; });

        cell.append("rect")
      .attr("id", function(d) { return "rect-" +d.data.name; })
      .attr("width", function(d) { return d.y1 - d.y0; })
      .attr("height", function(d) { return d.x1 - d.x0; })
    .filter(function(d) { return !d.children; })
      .style("fill", function(d) { while (d.depth > 1) d = d.parent; return color(d.data.name); });

        cell.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.name; })
    .append("use")
      .attr("xlink:href", function(d) { return "#rect-" + d.data.name + ""; });

       cell.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.data.name + ")"; })
      .attr("x", 4)
    .selectAll("tspan")
      .data(function(d) { return [d.data.name, " " + format(d.value)]; })
    .enter().append("tspan")
      .attr("y", 13)
      .text(function(d) { return d; });
}
function histogram(){
d3.selectAll("svg").remove();
 var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
var data = d3.range(1000).map(d3.randomBates(10));
var x = d3.scaleLinear()
    .rangeRound([0, width]);
    var bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(20))
    (data);
var y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })])
    .range([height, 0]);
var bar = svg.selectAll(".bar")
  .data(bins)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x",function(d){return x(d.x0)})
    .attr("y",function(d){return y(d.length)})
.attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
    .attr("height", function(d) { return height - y(d.length); });

svg.append("g")
    .attr("transform", "translate(0,380)")
    .call(d3.axisBottom(x));


}
function pack(){
d3.selectAll("svg").remove();
 var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
  var format = d3.format(",d");
    var p=d3.pack().size([width,height]);
    var root = d3.hierarchy(flare).sum(function(d) { return d.size; });
var node = svg.selectAll(".node")
    .data(p(root).descendants())
    .enter().append("g")
    .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

       node.append("circle")
      .attr("r", function(d) { return d.r; });
       node.append("title")
      .text(function(d) { return d.data.name + "\n" + format(d.value); });
       node.append("text").attr("dy", "0.3em")
      .text(function(d) { return d.data.name  });

}
function cluster(){
d3.selectAll("svg").remove();
        var stratify=d3.stratify()
                   .id(function(d) { return d.name; })
                   .parentId(function(d) { return d.parent; });

    var tree=d3.tree()
               .size([2 * Math.PI,200])
               .separation(function(a,b){return (a.parent==b.parent?1:2)/a.depth});
    var root = tree(stratify(cityJson));
     var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    g = svg.append("g").attr("transform", "translate(200,200)");
    var link=g.selectAll(".link")
                .data(root.links())
                .enter().append("path")
                .attr("class", "link")
                .attr("d",d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));

    var node=g.selectAll(".node")
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("class","node--internal")
                .attr("transform",function(d){return "translate("+ radialPoint(d.x, d.y)+")"});

    node.append("circle").attr("r",4);
    node.append("text").attr("x", function(d) { return d.x < Math.PI === !d.children ? 6 : -6; }).attr("dy", "0.31em")
                       .style("text-anchor",function(d){return "start"})
                       .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
                       .text(function(d){return d.data.name});

                       function radialPoint(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
}
function trees(){


    var stratify=d3.stratify()
                   .id(function(d) { return d.name; })
                   .parentId(function(d) { return d.parent; });

    var tree=d3.cluster()  //tree()      //并排与非并排
               .size([width,height-200])
               .separation(function(a,b){return (a.parent==b.parent?1:2)});
    var root = tree(stratify(cityJson));
    draw6(root);
}
function draw6(root){

d3.selectAll("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    g = svg.append("g").attr("transform", "translate(40,0)");
    var link=g.selectAll(".link")
                .data(root.links())
                .enter().append("path")
                .attr("class", "link")
                .transition().duration(500)
                .attr("d",d3.linkHorizontal()
          .x(function(d) { return d.y; })
          .y(function(d) { return d.x; }));

    var node=g.selectAll(".node")
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("class","node--internal")
                .attr("transform",function(d){return "translate("+d.y+","+d.x+")"})
                .on("click",function(d){
                            if(d.children){
                                d._children=d.children;
                                d.children=null;
                             }else{
                                d.children=d._children;
                                d._children=null;
                            };
                     draw6(root);
                });
    node.append("circle").attr("r",4);
    node.append("text").attr("dx",8).attr("dy",3)
                       .style("text-anchor",function(d){return "start"})
                       .text(function(d){return d.data.name});
}
function chords(){
    d3.selectAll("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var continent=["亚洲","欧洲","非洲","美洲","大洋洲"];
    var population=[[9000,870,3000,1000,5200],[3400,8000,2300,4922,374],
                    [2000,2000,7700,4881,1050],[3000,8012,5531,500,400],[3540,4310,1500,1900,300]];
    var chord=d3.chord().padAngle(0.03).sortSubgroups(d3.descending);
    var chordData=chord(population);
    var gChord=svg.append("g").attr("transform","translate("+width/2+","+height/2+")");
    var gOuter=gChord.append("g");
    var gInner=gChord.append("g");
    var color=d3.schemeCategory20;
    var innerRadius=width/2*0.7;
    var outerRadius=innerRadius*1.1;
    var arcOuter=d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    gOuter.selectAll(".outPath")
          .data(chordData.groups)
          .enter()
          .append("path")
          .attr("fill",function(d,i){return color[i]})
          .attr("d",arcOuter)
          .attr("class","outPath")
          .on("mouseover",fade(0.0))
          .on("mouseout",fade(1.0));
   function fade(value){
        return function(d,i){
            gInner.selectAll(".innerPath")
                  .filter(function(d){return d.source.index!=i&&d.target.index!=i;})
                  .transition()
                  .attr("opacity",value);
        }
    }
    gOuter.selectAll(".outerText")
          .data(chordData.groups)
          .enter()
          .append("text")
          .each(function(d,i){
            d.angle=(d.startAngle+d.endAngle)/2;
            d.name=continent[i];
          }).attr("dy",".35em")
          .attr("transform",function(d){
            var result="rotate("+(d.angle*180/Math.PI)+")";
            result+=" translate(0,"+(-1.0*(outerRadius+10))+")";
            if(d.angle>Math.PI*3/4&&d.angle<Math.PI*5/4){
                result+=" rotate(180)";
            }
            return result;
          })
          .text(function(d){return d.name});

    var ribbon = d3.ribbon().radius(innerRadius);
    gInner.selectAll(".innerPath")
           .data(chordData)
           .enter()
           .append("path")
           .attr("d",ribbon)
           .attr("class","innerPath")
           .attr("fill",function(d){return color[d.source.index]})

}
function forces(){
    d3.selectAll("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var nodes=[{name:"0"},{name:"1"},{name:"2"},{name:"3"},{name:"4"},{name:"5"},{name:"6"}];
    var edges=[{source:0,target:1},{source:0,target:2},{source:0,target:3},{source:1,target:4},{source:1,target:5},{source:1,target:6}];
    var force=d3.forceSimulation(nodes)
                .force("link", d3.forceLink(edges).id(function(d) { return d.name; }).distance(50)) //distance  线长度
                .force("charge", d3.forceManyBody().strength(-60)) //strength正吸引 负排斥
                .force("center", d3.forceCenter(width / 2, height / 2));
//    force.force("link").links(edges);
    var color=d3.schemeCategory20;
    var lines=svg.selectAll(".forceLine")
                 .data(edges)
                 .enter()
                 .append("line")
                 .attr("class","forceLine");
    var circles=svg.selectAll(".forceCircle")
                   .data(nodes)
                   .enter()
                   .append("circle")
                   .attr("class","forceCircle")
                   .attr("r",10)
                   .attr("fill",function(d,i){return color[i]})
                   .call(d3.drag().on("start", dragstarted)
                                  .on("drag", dragged)
                                  .on("end", dragended));
      circles.append("title")
      .text(function(d) { return d.name; });

    var texts=svg.selectAll(".forceText")
                .data(nodes)
                .enter()
                .append("text")
                .attr("class","forceText")
                .attr("x",function(d){return d.x})
                .attr("y",function(d){return d.y})
                .attr("dy","1em")
                .text(function(d){d.name});

    force.on("tick",function(){
        lines.attr("x1",function(d){return d.source.x});
        lines.attr("y1",function(d){return d.source.y});
        lines.attr("x2",function(d){return d.target.x});
        lines.attr("y2",function(d){return d.target.y});

        circles.attr("cx",function(d){return d.x});
        circles.attr("cy",function(d){return d.y});

        texts.attr("x",function(d){return d.x});
        texts.attr("y",function(d){return d.y});
    });

    function dragstarted(d) {
    if (!d3.event.active) force.alphaTarget(0.4).restart();
     d.fx = d.x;
     d.fy = d.y;

    }

    function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    d3.select(this).attr("fill","yellow")
    }

    function dragended(d,i) {
    if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      d3.select(this).attr("fill",color[i])
     }

}
function pie(){
    d3.selectAll("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    var dataset=[["小米",60.8],["三星",58.4],["联想",47.3],["苹果",46.6],["华为",41.3],["酷派",40.1],["其他",111.5]];
    var pie=d3.pie()//.startAngle(Math.PI*0.2).endAngle(Math.PI*1.5)
              .value(function(d){return d[1]});
    var piedata=pie(dataset);
    var arc=d3.arc()
              .innerRadius(0)
              .outerRadius(width/3);
    var color=d3.schemeCategory20;
    var arcs=svg.selectAll("g")
                .data(piedata)
                .enter()
                .append("g")
                .attr("transform","translate("+width/2+","+height/2+")");
    arcs.append("path")
        .attr("fill",function(d,i){return color[i]})
        .attr("d",function(d){return arc(d)});
    arcs.append("text")
        .attr("transform",function(d){
            var x=arc.centroid(d)[0]*1.4;
            var y=arc.centroid(d)[1]*1.4;
            return "translate("+x+","+y+")";
        })
        .attr("text-anchor","middle")
        .text(function(d){
            var percent=Number(d.value)/d3.sum(dataset,function(d){return d[1]})*100;
            return percent.toFixed(1)+"%";
        });
    arcs.append("line")
        .attr("stroke","black")
        .attr("x1",function(d){return arc.centroid(d)[0]*2})
        .attr("y1",function(d){return arc.centroid(d)[1]*2})
        .attr("x2",function(d){return arc.centroid(d)[0]*2.2})
        .attr("y2",function(d){return arc.centroid(d)[1]*2.2});

    arcs.append("text")
        .attr("transform",function(d){
            var x=arc.centroid(d)[0]*2.5;
            var y=arc.centroid(d)[1]*2.5;
            return "translate("+x+","+y+")";
        })
        .attr("text-anchor","middle")
         .text(function(d){
            return d.data[0];
        });


}
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
            }).on("mouseover",function(d,i){
                d3.select(this).transition().duration(100).attr("fill","yellow");
            }).on("mouseout",function(d,i){
                d3.select(this).transition().duration(500).attr("fill","steelblue");
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

//    var circle=svg.append("circle")
//                   .attr("cx","100")
//                   .attr("cy","100")
//                   .attr("r","50")
//                   .attr("fill","blue")
//                   .on("touchstart",function(){
//                        d3.select(this).attr("fill","yellow");
//                   })
//                   .on("touchmove",function(){
//                        var pos=d3.touches(this)[0];
//                        d3.select(this).attr("cx",pos[0])
//                                        .attr("cy",pos[1]);
//                   })
//                   .on("touchend",function(){
//                        d3.select(this).attr("fill","blue");
//                   });

}
function draw2(){
    d3.selectAll("svg").remove();
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

    updateCircle.attr("fill","black").transition().duration(500)
            .attr("cx",function(d){
                return padding.left+xScale(d[0]);
            })
            .attr("cy",function(d){
                return height-padding.bottom-yScale(d[1]);
            })
            .attr("r",5);


    enterCircle.append("circle")
           .attr("fill","black")
           .attr("cx",padding.left)
           .attr("cy",height-padding.bottom)
           .attr("r",7)
           .transition().duration(500)
           .attr("cx",function(d){
                return padding.left+xScale(d[0]);
            })
            .attr("cy",function(d){
                return height-padding.bottom-yScale(d[1]);
            })
            .attr("r",5);
    exitCircle.transition().duration(500).attr("fill","white").remove();


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
function draw4(){
    d3.selectAll("svg").remove();
    var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
    svg.append("rect")
        .attr("fill","steelblue")
        .attr("x",10)
        .attr("y",10)
        .attr("width",100)
        .attr("height",30)
        .transition()
        .delay(500)
        .duration(1000)
        .ease(d3.easeBounceIn)
        .attr("width",300)
        .transition()
        .delay(500)
        .duration(1000)
        .ease(d3.easeBounceIn)
        .attr("height",100);
    var text=svg.append("text")
        .attr("fill","white")
        .attr("x",100)
        .attr("y",10)
        .attr("dy","1.2em")
        .attr("text-anchor","end")
        .text(100)
     ;
    var initx=text.attr("x");
    var initText=text.text();
    var textTran=text.transition().duration(2000)
                        .tween("text",function(){
                        var node = this
                        return function(t){
                        node.setAttribute("x",t*300);
                        node.textContent=t*200;
                        }
                     })
//                     .attrTween("x",function(d,i,a){
//                        return function(t){
//                        return t*200+parseInt(initx);
//                     }
//                     })
//==============================================================// 时钟

    timeText=svg.append("text")
                .attr("x","0")
                .attr("y","200")
                .attr("class","time")
                .text(getTimeString());
     setInterval(updateTime,1000);

}
function draw5(){
var circle=[{cx:50,cy:200,r:30},{cx:250,cy:200,r:30}];
var circle2=[{cx:150,cy:200,r:30},{cx:220,cy:200,r:30},{cx:150,cy:270,r:30},{cx:220,cy:270,r:30}];
  d3.selectAll("svg").remove();
  var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
  var circles=svg.selectAll(".circle")
     .data(circle)
     .enter()
     .append("circle")
     .attr("cx",function(d){return d.cx})
     .attr("cy",function(d){return d.cy})
     .attr("r",function(d){return d.r})
     .attr("fill","black");


  var drag=d3.drag()

             .on("start",function(d){console.log("bbbbb")})
             .on("end",function(d){console.log("eeeee")})
             .on("drag",function(d){
                d3.select(this).attr("cx",d.cx=d3.event.x)
                               .attr("cy",d.cy=d3.event.y)
             });
    drag(circles);
    //====================================缩放
    var g=svg.append("g");
    g.selectAll(".circle")
    .data(circle2)
    .enter()
    .append("circle")
    .attr("cx",function(d){return d.cx;})
    .attr("cy",function(d){return d.cy;})
    .attr("r",function(d){return d.r;})
    .attr("fill","black");
      var xScale=d3.scaleLinear()
                .domain([0,width])
                .range([0,width]);

      var yScale=d3.scaleLinear()
                .domain([0,height])
                .range([0,height]);
    var zoom=d3.zoom()
               .scaleExtent([1,10])
               .on("zoom",function(d){
                    d3.select(this).attr("transform",d3.event.transform);
               });

    zoom(g);
}
function updateTime(){
    timeText.text(getTimeString(new Date()));
}

function getTimeString(date){
    var time=date;
    var year = time.getFullYear();
    var month = 1 + time.getMonth();
    var day = time.getDate();
    var hours=time.getHours();
    var minutes=time.getMinutes();
    var seconds=time.getSeconds();
    month=month<10?"0"+month:month;
    day=day<10?"0"+day:day;
    hours=hours<10?"0"+hours:hours;
    minutes=minutes<10?"0"+minutes:minutes;
    seconds=seconds<10?"0"+seconds:seconds;
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;

}
function temp1(){
var svg=d3.select("svg");

     var xScale=d3.scaleLinear()
                  .domain([0,1.2*d3.max(center,function(d){return d[0]})])
                  .range([0,xAxisWidth]);

    var yScale=d3.scaleLinear()
                 .domain([0,1.2*d3.max(center,function(d){return d[1]})])
                 .range([0,yAxisWidth]);
  var updateCircle=svg.selectAll("circle").data(center);
    var enterCircle=updateCircle.enter();
    var exitCircle=updateCircle.exit();
        updateCircle.attr("fill","black").transition().duration(500)
            .attr("cx",function(d){
                return padding.left+xScale(d[0]);
            })
            .attr("cy",function(d){
                return height-padding.bottom-yScale(d[1]);
            })
            .attr("r",5);


    enterCircle.append("circle")
           .attr("fill","black")
           .attr("cx",padding.left)
           .attr("cy",height-padding.bottom)
           .attr("r",7)
           .transition().duration(500)
           .attr("cx",function(d){
                return padding.left+xScale(d[0]);
            })
            .attr("cy",function(d){
                return height-padding.bottom-yScale(d[1]);
            })
            .attr("r",5);
    exitCircle.transition().duration(500).attr("fill","white").remove();
}

function hideButton(){
    $("#sort").hide();
    $("#add").hide();
    $("#updatecircle").hide();
    $("#addcircle").hide();
    $("#removecircle").hide();
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
$("#updatecircle").on("click",function(){
   for(var i=0;i<center.length;i++){
        center[i][0]=Math.random();
        center[i][1]=Math.random();
   }
   temp1();
});
$("#addcircle").on("click",function(){
    center.push([Math.random(),Math.random()]);
   temp1();
});
$("#removecircle").on("click",function(){
    center.pop();
    temp1();
});
$("#d1").on("click",function(){

   temp1();
});

$("#example1").on("click",function(){
    hideButton();
    draw();
    $("#sort").show();
    $("#add").show();
});
$("#example2").on("click",function(){
    hideButton();
    draw3();
});
$("#example3").on("click",function(){
    hideButton();
    draw2();
    $("#updatecircle").show();
    $("#addcircle").show();
    $("#removecircle").show();
});
$("#example4").on("click",function(){
    hideButton();
    draw4();
});
$("#example5").on("click",function(){
    hideButton();
    draw5();
});

$("#example6").on("click",function(){
    hideButton();
    pie();
});
$("#example7").on("click",function(){
    hideButton();
    forces();
});
$("#example8").on("click",function(){
    hideButton();
    chords();
});
$("#example9").on("click",function(){
    hideButton();
    trees();
});
$("#example10").on("click",function(){
    hideButton();
    cluster();
});
$("#example11").on("click",function(){
    hideButton();
    pack();
});
$("#example12").on("click",function(){
    hideButton();
    histogram();
});
$("#example13").on("click",function(){
    hideButton();
    partition();
});
$("#example14").on("click",function(){
    hideButton();
    stack1();
    stack();
});
$("#example15").on("click",function(){
    hideButton();
    treeMap();
});
}
})
