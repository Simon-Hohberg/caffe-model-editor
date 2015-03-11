var builder = ProtoBuf.loadProtoFile('./proto/caffe.proto')

//var input = require('fs').readFileSync('./proto/lenet.prototxt', 'utf-8');

///* Parse the schema into a ProtoBuf.js messsage object. */
//var result = TextFormat.parse(builder, 'caffe.NetParameter', input);

var svgWidth = 600;
var svgHeight = 1200;
var netPrototxt = $("#net-prototxt")
var raphael = Raphael("svg-container", '100%', '100%');
raphael.setViewBox(0, 0, svgWidth, svgHeight, true);

var net;
var netView;

// load example
$.ajax({
     url : "proto/lenet_train_test.prototxt",
     dataType: "text",
     success : function (content) {
         netPrototxt.text(content);
         textChanged(content);
     }
 });

function textChanged(content) {
  var result = TextFormat.parse(builder, 'caffe.NetParameter', content)
  if (!result.status) {
    console.error(result.error);
  } else {
    net = new CaffeNet(result);
    netView = new CaffeNetView(net, svgWidth);
    netView.draw(raphael);
  }
}
