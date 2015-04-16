var builder = ProtoBuf.loadProtoFile('proto/caffe.proto')

//var input = require('fs').readFileSync('./proto/lenet.prototxt', 'utf-8');

///* Parse the schema into a ProtoBuf.js messsage object. */
//var result = TextFormat.parse(builder, 'caffe.NetParameter', input);

var netPrototxt = $("#net-prototxt");
var netPrototxtHeight = netPrototxt.height()
var svgWidth = $("#svg-container").width();
var svgHeight = netPrototxtHeight;
var raphael = Raphael("svg-container", svgWidth, svgHeight);
$("#svg-container").height(svgHeight);
raphael.setViewBox(0, 0, svgWidth, svgHeight, false);

var net;
var netView;

function redraw() {
  svgWidth = $("#svg-container").width();
  svgHeight = netPrototxt.height();
  netView.draw(raphael, svgWidth, svgHeight);
  raphael.setViewBox(0, 0, netView.width, netView.height, false);
  raphael.canvas.setAttribute("height", netView.height);
  raphael.canvas.setAttribute("width", netView.width);
}

// on resize event handler
function windowResized() {
  redraw();
}

var resizeTimer;
$(window).resize(function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(windowResized, 100);
});

// load example
$.ajax({
  url : "proto/caffenet.prototxt",
  dataType: "text",
  success : function (content) {
    netPrototxt.text(content);
    textChanged();
  }
});
 
// on text change event handler
var textChangeTimer;
netPrototxt.bind('input propertychange', function() {
  clearTimeout(textChangeTimer);
  textChangeTimer = setTimeout(textChanged, 100);
});


function textChanged() {
  var content = netPrototxt.val()
  var result = TextFormat.parse(builder, 'caffe.NetParameter', content)
  if (!result.status) {
    console.error(result.error);
  } else {
    net = new CaffeNet(result);
    netView = new CaffeNetView(net);
    redraw();
  }
}
