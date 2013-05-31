function UI(game) {
  this.game = game;
  this.init_game_listeners();
  this.init_places_listeners();
  this.moving_piece = null;
}

UI.prototype.on_game_init = function() {
  this.players = this.game.players.slice(0); //clone
  this.init_data_places();
  this.draw_pieces();
  this.write_infos();
};

UI.prototype.$board = function() {
  return $("#board");
};

UI.prototype.$places = function() {
  return this.$board().children(".place");
};

UI.prototype.$place_for_place = function(place) {
  return $($.grep(this.$places(), function($place, i) {
    return $($place).data('place') == place;
  })[0]);
};

UI.prototype.$piece_for_place = function(place) {
  return this.$place_for_place(place).children(".piece");
};

UI.prototype.$infos = function() {
  return $("#infos");
};

UI.prototype.remove_player = function(player) {
  //this.players.splice(this.players.indexOf(player), 1);
};

UI.prototype.init_game_listeners = function() {
  var ui = this;
  this.game.on_game_init = function() {
    ui.on_game_init();
  };
  this.game.on_beginning_of_turn = function() {
    ui.on_beginning_of_turn();
  };
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
  if (this.players.indexOf(player) != -1) {
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
        switch(player.state)
        {
          case PlayerState.HAS_TO_PLAY:
            if (place.piece) {
              if (place.piece == this.moving_piece) {
                this.moving_piece = null;
              } else if (place.piece.player == player) {
                this.moving_piece = place.piece;
              }
              this.draw_pieces();
            } else if (this.moving_piece) {
              player.move_piece(this.moving_piece, place);
              this.moving_piece = null;
              this.draw_pieces();
              this.write_infos();
            }
            break;
          case PlayerState.HAS_TO_CAPTURE:
            player.capture_piece(place.piece);
            break;
        }
        break;
    }
  }
};

UI.prototype.on_beginning_of_turn = function() {
  this.write_infos();
};

UI.prototype.on_end_of_turn = function() {
  this.draw_pieces();
};

UI.prototype.on_end_of_game = function() {
  this.write_infos();
};

UI.prototype.on_mill_formed = function() {
  this.draw_pieces();
  this.write_infos();
};

UI.prototype.draw_pieces = function() {
  var ui = this;
  var $piece = null;
  $.each(this.game.board.places, function() {
    $piece = ui.$piece_for_place(this);
    if (this.piece) {
      $piece.removeClass()
        .addClass('piece ' + this.piece.player.color)
        .text('x');
      if (this.piece === ui.moving_piece) {
        $piece.addClass('moving');
      }
    } else {
      $piece.removeClass()
        .addClass('piece')
        .text(' ');
    }
  });
};

UI.prototype.write_infos = function() {
  var infos = '';
  switch(this.game.state)
  {
    case GameState.FIRST_STAGE:
      infos += '<p>' + this.text_for_player(this.game.current_player) + ' ';
      switch(this.game.current_player.state)
      {
        case PlayerState.HAS_TO_PLAY:
          infos += 'has to place a piece on the board.';
          break;
        case PlayerState.HAS_TO_CAPTURE:
          infos += 'has to capture an opponent piece.';
          break;
      }
      infos += '</p><p>Pieces left to place:&nbsp;&nbsp;';
      infos += this.text_for_player(this.game.players[0]) + ': ' + this.game.players[0].pieces_to_play().length + ' - ';
      infos += this.text_for_player(this.game.players[1]) + ': ' + this.game.players[1].pieces_to_play().length;
      break;
    case GameState.SECOND_STAGE:
      infos += '<p>' + this.text_for_player(this.game.current_player) + ' ';
      switch(this.game.current_player.state)
      {
        case PlayerState.HAS_TO_PLAY:
          infos += 'has to move a piece.';
          break;
        case PlayerState.HAS_TO_CAPTURE:
          infos += 'has to capture an opponent piece.';
          break;
      }
      infos += '</p>';
      break;
    case GameState.ENDED:
      if (this.game.winner) {
        infos += '<p>' + this.text_for_player(this.game.winner) + ' won the game!</p>';
      } else {
        infos += '<p>The game ended in a draw!</p>';
      }
  }
  $("#infos").html(infos);
};

UI.prototype.text_for_player = function(player) {
  return '<span class="' + player.color + '">' + player.name + '</span>';
};
