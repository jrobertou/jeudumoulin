function UI(game) {
  this.game = game;
  this.init_game_listeners();
  this.init_data_places();
  this.init_places_listeners();
}

UI.prototype.$board = function() {
  return $("#board");
};

UI.prototype.$places = function() {
  return this.$board().children(".place");
};

UI.prototype.$piece_for_place = function(place) {
  return $($.grep(this.$places(), function($place, i) {
    return $($place).data('place') == place;
  })[0]).children(".piece");
};

UI.prototype.$infos = function() {
  return $("#infos");
};

UI.prototype.init_game_listeners = function() {
  var ui = this;
  this.game.on_end_of_turn = function() {
    ui.on_end_of_turn();
  };
  this.game.on_end_of_game = function() {
    ui.on_end_of_game();
  };
  this.game.on_mill_formed = function() {
    ui.on_mill_formed();
  };
};

UI.prototype.init_data_places = function() {
  var ui = this;
  var index = null;
  this.$places().each(function() {
    $place = $(this);
    index = $place.data('index');
    $place.data('place', ui.game.board.places[index]);
  });
};

UI.prototype.init_places_listeners = function() {
  var ui = this;
  this.$places().each(function() {
    $(this).on('click', function() {
      ui.place_listener(this);
    });
  });
};

UI.prototype.place_listener = function($place) {
  var place = $($place).data('place');
  var player = this.game.current_player;
  switch(this.game.state)
  {
    case GameState.FIRST_STAGE:
      switch(player.state)
      {
        case PlayerState.HAS_TO_PLAY:
          player.place_piece_on_board(place);
          break;
        case PlayerState.HAS_TO_CAPTURE:
          player.capture_piece(place.piece);
          break;
      }
      break;
    case GameState.SECOND_STAGE:
      console.log('Place Listener: Second Stage!');
      break;
  }
};

UI.prototype.on_end_of_turn = function() {
  console.log('EOT');
  this.draw_pieces();
};

UI.prototype.on_end_of_game = function() {
  console.log('EOG');
};

UI.prototype.on_mill_formed = function() {
  console.log('MILL FORMED!!');
  this.draw_pieces();
};

UI.prototype.draw_pieces = function() {
  var ui = this;
  $.each(this.game.board.places, function() {
    if (this.piece) {
      ui.$piece_for_place(this)
        .removeClass()
        .addClass('piece ' + this.piece.player.color)
        .text('X');
    } else {
      ui.$piece_for_place(this)
        .removeClass()
        .addClass('piece')
        .text(' ');
    }
  });
};
