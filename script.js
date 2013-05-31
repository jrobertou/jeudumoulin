window.Game = new Game();
window.UI = new UI(window.Game);
window.Game.init();

var Settings = function() {
  this.init_listeners();
};

Settings.prototype.apply = function() {
  this.ai_wait_time.apply();
};
Settings.prototype.init_listeners = function() {
  this.ai_wait_time.init_listener();
};
Settings.prototype.ai_wait_time = {};
Settings.prototype.ai_wait_time.val = function() {
  return parseInt($("#settings input#ai_wait_time").val(), 10);
};
Settings.prototype.ai_wait_time.init_listener = function() {
  var ai_wait_time = this;
  $("#settings input#ai_wait_time").on('keyup', function() {
    ai_wait_time.apply();
  });
};
Settings.prototype.ai_wait_time.apply = function() {
  var ai_wait_time = this;
  $.each(window.AIs, function() {
    this.wait_time = ai_wait_time.val();
  });
};
window.Settings = new Settings();

window.AIs = [];
var player = null;
var ai = null;
var behavior = null;
$("#start_buttons button").each(function() {
  $(this).on('click', function() {
    if ($(this).data('player0') == "ai") {
      player = window.Game.players[0];
      ai = new AI(window.Game, player);
      behavior = new AIBehaviors.Proximity();
      behavior.attach(ai);
      window.AIs.push(ai);
      window.UI.remove_player(player);
    }
    if ($(this).data('player1') == "ai") {
      player = window.Game.players[1];
      ai = new AI(window.Game, player);
      behavior = new AIBehaviors.Proximity();
      behavior.attach(ai);
      window.AIs.push(ai);
      window.UI.remove_player(player);
    }
    window.Settings.apply();
    window.Game.start();
    $("#start_buttons").css('visibility','hidden');
    $("#reset_button").css('visibility', 'visible');
  });
});
$("#reset_button").on('click', function() {
  window.Game.reset();
  $("#reset_button").css('visibility', 'hidden');
  $("#start_buttons").css('visibility', 'visible');
});

$("#reset_button").css('visibility', 'hidden');
