function Settings() {
  this.init_listeners();
}

// Plus tard ajouter potentiellement niveau de difficulté de l'IA, ou nombre de coups calculés, etc.

Settings.prototype.apply = function() {
  this.ai_wait_time.apply();
};
Settings.prototype.init_listeners = function() {
  this.ai_wait_time.init_listener();
};
Settings.prototype.ai_wait_time = {};
Settings.prototype.ai_wait_time.init_listener = function() {
  var ai_wait_time = this;
  $("input.ai_wait_time").on('keyup', function() {
    ai_wait_time.apply(this);
  });
};
Settings.prototype.ai_wait_time.apply = function() {
  var ai_wait_time = this;
  $("input.ai_wait_time").each(function() {
    ai_wait_time.apply_one($(this));
  });
};
Settings.prototype.ai_wait_time.apply_one = function($input) {
  var val = parseInt($input.val(), 10);
  var ai = $input.closest(".player").data('ai');

  if (ai !== null) {
    ai.wait_time = val;
  }
};
