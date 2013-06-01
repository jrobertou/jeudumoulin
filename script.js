$(function() {
  window.game = new Game();
  window.ui = new UI(window.game, "#board", "#infos", ".place");
  window.game.init();
  window.settings = new Settings();

  var player = null;
  var type = null;
  var ai = null;
  var behavior = null;
  $("#start").on('click', function() {
    $(".players .player").each(function(i) {
      player = window.game.players[i];

      type = $(this).find("input[type='radio']:checked").val();

      if (type !== 'human') {
        ai = new AI(window.game, player);
        behavior = new AIBehaviors[type]();
        behavior.attach(ai);
        window.ui.remove_player(player);
        $(this).data('ai', ai);
      } else {
        $(this).data('ai', null);
      }
    });

    window.settings.apply();
    window.game.start();
    $("#start").attr('disabled', '');
    $("#reset").removeAttr('disabled');
  });

  $("#reset").on('click', function() {
    window.game.reset();
    $("#reset").attr('disabled', '');
    $("#start").removeAttr('disabled');
  });
});
