function preprocess(graph, boldEdgeId) {
  var links = {};
  var nodes = {};
  var node_list = [];
  var link_list = [];
  const eps = Array.isArray(graph.entrypoints.entrypoint) ? graph.entrypoints.entrypoint : [graph.entrypoints.entrypoint];
  const edges = Array.isArray(graph.graph.edges.edge) ? graph.graph.edges.edge : [graph.graph.edges.edge];
  for (var i = 0; i < edges.length; i++){
    const edge = edges[i];
    let bold = false;
    if (boldEdgeId && boldEdgeId.includes(edge['@id'])) {
      bold = true;
    }
    const s = edge.subject;
    const p = bold ? `FIND[${edge.predicate}]` : edge.predicate;
    const o = edge.object;
    var k = s+','+o ;
    links[k] = links[k] ? links[k] + '|' + p : p ;
    nodes[s] = (nodes[s]===11 || bold) ? 11 : 1;
    nodes[o] = (nodes[o]===19 || bold) ? 19 : 9;
  }
  for(var link in links){
    const tmp = link.split(',');
    link_list.push({"source": tmp[0], "target": tmp[1], "value": links[link]});
  }
  var epnodes = {};
  for (var j = 0; j < eps.length; j++){
    const ep = eps[j];
    const s = ep.node;
    if (!epnodes[s]) {
      epnodes[s] = [];
    }
    const desc = ep.typed_descriptor
    const details = desc.text_descriptor || desc.string_descriptor || desc.image_descriptor || desc.video_descriptor
    const o = desc.enttype + ':' + Object.values(details).join(",")
    epnodes[s].push(o);
  }
  for (var epnode in epnodes) {
    // const epnode_ = epnodes[epnode].join('|');
    const epnode_ = epnode + ' descriptors';
    node_list.push({"id": epnode_, "group": 5});
    link_list.push({"source": epnode_, "target": epnode, "value": "DESCRIPTOR"});
  }
  for (var node in nodes) {
    node_list.push({"id": node, "group": nodes[node]});
  }
  return {"nodes": node_list, "links": link_list}
}

function draw(graph, svg, d3, container) {

    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .style("cursor", "all-scroll")
      .call(d3.zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom", zoomed)
      );

    var focus = svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var nd;
    for (var i=0; i<graph.nodes.length; i++) {
      nd = graph.nodes[i];
      nd.rx = nd.id.length * 4.5;
      nd.ry = 12;
    }

    // var simulation = d3.forceSimulation()
    //     .force("link", d3.forceLink().id(function(d) { return d.id; }))
    //     .force("collide", d3.ellipseForce(80, 2, 1))
    //     .force("center", d3.forceCenter(width / 2, height / 2));
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(100).strength(1))
        .force("charge", d3.forceManyBody())
        .force("collide", d3.ellipseForce(70, 1, 1))
        .force("center", d3.forceCenter(width / 2, height / 2));

    var link = focus.append("g")
        .attr("class", "link")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return 2 })
        .attr("stroke-opacity", function(d) { return 0.5 })
        .attr("stroke", function(d, idx) { return d.value==='DESCRIPTOR' ? 'black' : color(idx);});

    var text_link = focus.append("g")
        .attr("class", "link-labels")
        .selectAll("text")
        .data(graph.links)
        .enter()
        .append("text")
        .attr("dy", -2)
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.value
        })
        .attr("fill", function(d, idx) { return d.value==='DESCRIPTOR' ? 'black' : color(idx); })
        .style("font-size", "10px");

    var text = focus.append("g")
        .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
        .attr("dy", 2)
        .attr("text-anchor", "middle")
        .text(function(d) {return d.id})
        .attr("fill", "black").attr("stroke-width", 1)
        .style("font-size", "10px")
        .style("font-weight", 'bold');

    var node = focus.append("g")
        .attr("class", "node")
        .selectAll("ellipse")
        .data(graph.nodes)
        .enter().append("ellipse")
        .attr("rx", function(d) { return Math.min(d.rx, 120); })
        .attr("ry", function(d) { return d.ry; })
        .attr("fill", function(d) { return color(d.group > 10 ? d.group - 10 : d.group); })
        .attr("stroke", function(d) { return d.group > 10 ? 'red' : 'black'; })
        .attr("stroke-width", function(d) { return d.group > 10 ? 3 : 1; })
        .attr("fill-opacity", function(d) { return d.group > 10 ? 0 : 0.3; })
        .style("cursor", "grab")
        .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
         .links(graph.links);

    function ticked() {

      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
      text_link
          .attr("x", function(d) {
            var x = (d.source.x+d.target.x)/2 ;
            var y = (d.source.y+d.target.y)/2 ;
            var el = d3.select(this);
            var words = d.value.split('|');
            el.text('');

            for (var i = 0; i < words.length; i++) {
                var tspan = el.append('tspan').text(words[i]);
                if (i > 0)
                    tspan.attr('x', x).attr('y', y+10*i);
            }

            return x;
          })
          .attr("y", function(d) {
            return (d.source.y+d.target.y)/2;
          })
      node
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) { return d.y; });
      text
          .attr("x", function(d) {
            var el = d3.select(this);
            var words = d.id.split('|');
            el.text('');
            const startY = Math.ceil(-words.length/2);

            for (var i = 0; i < words.length; i++) {
                var tspan = el.append('tspan').text(words[i]);
                if (i > 0)
                    tspan.attr('x', d.x).attr('y', d.y+11*(i + startY));
            }

            return d.x;
          })
          .attr("y", function(d) { return d.y; });

    }

  function zoomed() {
    focus.attr("transform", d3.event.transform);
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  }

}

export function run_d3(graphQuery, container, d3, boldEdgeId) {
  const graph = preprocess(graphQuery, boldEdgeId)
  var svg = d3.select(container || "body").append("svg")
            .attr("width","1200")
            .attr("height", "900")
            .attr('display', 'block')
            .attr('margin', 'auto')
            .attr('viewBox', '0 0 1200 900');
  draw(graph, svg, d3, container);
}
