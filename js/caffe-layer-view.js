function CaffeLayerView(layer, width) {
  this.layer = layer;
  this.width = width;
  this.inplaceDistV = 5;
  // increase height for inplace layers + some margin
  this.height = 40 + layer.inplace.length * (40 + this.inplaceDistV);
  this.inplaceLayerViews = [];
  for (var i = 0; i < this.layer.inplace.length; i++) {
    var inplaceLayer = this.layer.inplace[i];
    this.inplaceLayerViews.push(new CaffeLayerView(inplaceLayer, width - 10));
  }
}

CaffeLayerView.prototype.draw = function(paper, posX, posY) {
  var viewSet = paper.set();
  // basic layer shape
  var rect = paper.rect(0, 0, this.width, this.height, 5);
  rect.attr({fill: LayerColors[LayerEnum[this.layer.proto.type]]});
  viewSet.push(rect);
  // layer name
  var layerNameText = paper.text(6, 12, this.layer.proto.name);
  layerNameText.attr({
    "fill": "#ffffff", 
    "text-anchor": "start", 
    "font-size": "20px"
  });
  viewSet.push(layerNameText);
  var i = 0;
  var self = this;
  this.inplaceLayerViews.forEach(function(inplaceLayerView) {
    i++;
    inplaceLayerView.draw(paper, posX + 5, posY + (i * 40) + (i-1) * self.inplaceDistV);
  });
  viewSet.translate(posX, posY);
};

CaffeLayerView.prototype.toString = function() {
  return this.layer.toString();
};
