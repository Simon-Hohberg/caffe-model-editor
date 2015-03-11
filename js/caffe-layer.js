function CaffeLayer(id, proto) {
  this.id = id;
  this.proto = proto;
  this.tops = [];
  this.bottoms = [];
  this.inplace = [];
}

CaffeLayer.prototype.addBottom = function(layer) {
  if ($.inArray(layer, this.bottoms) == -1) {
    this.bottoms.push(layer);
  }
  if ($.inArray(this, layer.tops) == -1) {
    layer.tops.push(this);
  }
}

CaffeLayer.prototype.addTop = function(layer) {
  layer.addBottom(this);
}

CaffeLayer.prototype.addInPlace = function(layer) {
  this.inplace.push(layer);
}

CaffeLayer.prototype.hasTop = function() {
  return this.tops.length > 0;
}

CaffeLayer.prototype.hasBottom = function() {
  return this.bottoms.length > 0;
}

CaffeLayer.prototype.hasInPlace = function() {
  return this.inplace.length > 0;
}

CaffeLayer.prototype.toString = function() {
  return "" + this.id;
}

