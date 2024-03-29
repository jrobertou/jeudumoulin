function Settings() {
  this.init_listeners();
}

// Plus tard ajouter potentiellement niveau de difficulté de l'IA, ou nombre de coups calculés, etc.

Settings.prototype.apply = function() {
  this.ai_wait_time.apply();
  this.ui_refresh.apply();
};
Settings.prototype.init_listeners = function() {
  this.ai_wait_time.init_listener();
  this.ui_refresh.init_listener();
};

Settings.prototype.ai_wait_time = {};
Settings.prototype.ai_wait_time.init_listener = function() {
  var ai_wait_time = this;
  $(".ai_wait_time input, .benchmark").on('change keyup', function() {
    ai_wait_time.apply(this);
  });
};
Settings.prototype.ai_wait_time.apply = function() {
  var ai_wait_time = this;
  $(".ai_wait_time input[type='text']").each(function() {
    ai_wait_time.apply_one($(this));
  });
};
Settings.prototype.ai_wait_time.apply_one = function($input) {
  var $player = $input.closest(".player");
  var $checkbox = $player.find('input[type="checkbox"]');
  var $benchmark = $(".benchmark");
  var ai = $player.data('ai');

  if (ai) {
    if (!$benchmark.is(":checked") && $checkbox.is(":checked")) {
      ai.wait_time = parseInt($input.val(), 10);
    } else {
      ai.wait_time = 0;
    }
  }
};

Settings.prototype.ui_refresh = {};
Settings.prototype.ui_refresh.init_listener = function() {
  var ui_refresh = this;
  $(".ui_refresh").on('change', function() {
    ui_refresh.apply(this);
  });
};
Settings.prototype.ui_refresh.apply = function($input) {
  window.ui.active = $(".ui_refresh").is(":checked");

  if (window.ui.active) {
    window.ui.draw_pieces();
    window.ui.write_infos();
  }
};

