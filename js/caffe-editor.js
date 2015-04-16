var builder = ProtoBuf.loadProtoFile('proto/caffe.proto')

//var input = require('fs').readFileSync('./proto/lenet.prototxt', 'utf-8');

///* Parse the schema into a ProtoBuf.js messsage object. */
//var result = TextFormat.parse(builder, 'caffe.NetParameter', input);

var netPrototxtHeight = $("#net-prototxt").height()
var svgWidth = $("#svg-container").width();
var svgHeight = netPrototxtHeight;
var netPrototxt = $("#net-prototxt");
var raphael = Raphael("svg-container", svgWidth, svgHeight);
$("#svg-container").height(svgHeight);
raphael.setViewBox(0, 0, svgWidth, svgHeight, false);

var net;
var netView;

function redraw() {
  svgWidth = $("#svg-container").width();
  svgHeight = $("#net-prototxt").height();
  netView.draw(raphael, svgWidth, svgHeight);
  raphael.setViewBox(0, 0, svgWidth, svgHeight, false);
  raphael.canvas.setAttribute("height", netView.height);
  raphael.canvas.setAttribute("width", netView.width);
}

function afterResize() {
  redraw();
}

var resizeTimer;
$(window).resize(function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(afterResize, 100);
});

// load example
$.ajax({
  url : "proto/caffenet.prototxt",
  dataType: "text",
  success : function (content) {
    netPrototxt.text(content);
    textChanged(content);
  }
});
 
// register event handler



function textChanged(content) {
  var result = TextFormat.parse(builder, 'caffe.NetParameter', content)
  if (!result.status) {
    console.error(result.error);
  } else {
    net = new CaffeNet(result);
    netView = new CaffeNetView(net);
    redraw();
  }
}
