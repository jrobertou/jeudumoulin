$(function() {
  window.board_canvas = new BoardCanvas("board", 400, 400);

  window.game = new Game();
  window.ui = new UI(window.game, window.board_canvas);
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

  var __on_end_of_game = window.game.on_end_of_game;
  window.game.on_end_of_game = function() {
    __on_end_of_game();

    var increase_text_count = function(i, text) {
      return parseInt(text, 10) + 1;
    };

    $(".stats .games").text(increase_text_count);

    if (window.game.winner == window.game.players[0])
    {
      $(".stats .player0").text(increase_text_count);
    }
    else if (window.game.winner == window.game.players[1])
    {
      $(".stats .player1").text(increase_text_count);
    }
    else
    {
      $(".stats .draw").text(increase_text_count);
    }

    if ($(".benchmark").is(":checked")) {
      $("#reset").trigger('click');
      $("#start").trigger('click');
    }
  };

  $(".stats .reset").on('click', function() {
    $(".stats .games, .stats .player0, .stats .player1, .stats .draw").text("0");
  });
});
