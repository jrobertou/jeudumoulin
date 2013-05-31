if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Base = function() {};

AIBehaviors.Base.extend = function(klass) {
  klass.prototype.attach = this.prototype.attach;
};

AIBehaviors.Base.prototype.attach = function(ai) {
  this.ai = ai;
  var behavior = this;
  this.ai.get_piece_placement = function() {
    return behavior.get_piece_placement();
  };
  this.ai.get_piece_movement = function() {
    return behavior.get_piece_movement();
  };
  this.ai.get_piece_capture = function() {
    return behavior.get_piece_capture();
  };
};
