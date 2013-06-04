if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Base = function() {};

AIBehaviors.Base.extend = function(klass) {
  klass.prototype.attach = this.prototype.attach;
};

AIBehaviors.Base.prototype.attach = function(ai) {
  this.ai = ai;
  var behavior = this;
  this.ai.get_placement_value = function(place) {
    return behavior.get_placement_value(place);
  };
  this.ai.get_movement_value = function(movement) {
    return behavior.get_movement_value(movement);
  };
  this.ai.get_capture_value = function(piece) {
    return behavior.get_capture_value(piece);
  };
};
