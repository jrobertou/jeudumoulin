if (typeof AIBehaviors === 'undefined') { AIBehaviors = {}; }

AIBehaviors.Random = function() {
  this.ai = null;
  AIBehaviors.Base.extend(AIBehaviors.Random);
};

AIBehaviors.Random.prototype.get_placement_value = function(place) {
  return 0;
};

AIBehaviors.Random.prototype.get_movement_value = function(movement) {
  return 0;
};

AIBehaviors.Random.prototype.get_capture_value = function(piece) {
  return 0;
};
