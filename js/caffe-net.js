function CaffeNet(protobuf) {
  this.roots = [];
  
  // maps IDs to layer objects
  this.layers = [];
  var topMapping = {}
  // create layer models
  for(var i = 0; i < protobuf.message.layers.length; i++) {
    var layer = new CaffeLayer(i, protobuf.message.layers[i]);
    this.layers.push(layer);
    // map top blob names to layer(s)
    if (layer.proto.top !== undefined) {
      for(var t = 0; t < layer.proto.top.length; t++) {
        var topName = layer.proto.top[t];
        // ignore in-place layers here
        if ($.inArray(topName, layer.proto.bottom) != -1) {
          continue;
        }
        if (topMapping[topName] === undefined) {
          topMapping[topName] = [];
        }
        topMapping[topName].push(layer);
      }
    }
  }
  var self = this;
  // create graph
  this.layers.forEach(function(layer) {
    var bottom = layer.proto.bottom;
    // check if this layer is a root of the graph
    if (bottom === undefined) {
      self.roots.push(layer);
    } else if (bottom.length == 0) {
      self.roots.push(layer);
    }
    bottom.forEach(function(nameBelow) {
      // get layers below, i.e. the layers where top matches the layer's bottom
      var layersBelow = topMapping[nameBelow];
      // again when there are no layers below, the layer is a root of the graph
      if (layersBelow === undefined) {
        self.roots.push(layer);
      } else {
        // link layers to form the graph
        layersBelow.forEach(function(lb) {
          if ($.inArray(nameBelow, layer.proto.top) != -1) {
            lb.addInPlace(layer);
          } else {
            layer.addBottom(lb);
          }
        });
      }
    });
  });
}

