function UI(game, board_canvas, infos_sel) {
  this.game = game;
  this.board_canvas = board_canvas;
  this.infos_sel = infos_sel;

  this.init_game_listeners();
  this.init_places_listeners();
  this.moving_piece = null;

  this.active = true;
}

UI.prototype.on_game_init = function() {
  this.players = this.game.players.clone();
  this.init_data_places();
  this.draw_pieces();
  this.write_infos();
};

UI.prototype.$place_for_place = function(place) {
  return _.find(this.board_canvas.$places(), function($place) {
    return $($place).data('place') == place;
  });
};

UI.prototype.$infos = function() {
  return $(this.infos_sel);
};

UI.prototype.remove_player = function(player) {
  this.players.splice(this.players.indexOf(player), 1);
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
  this.board_canvas.$places().each(function(i) {
    $place = $(this);
    $place.data('place', ui.game.board.places[i]);
  });
};

UI.prototype.init_places_listeners = function() {
  var ui = this;
  this.board_canvas.$places().each(function() {
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
            player.place_piece(place);
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
  if (this.active) {
    var ui = this;
    var $piece = null;
    $.each(this.game.board.places, function() {
      $place = ui.$place_for_place(this);
      if (this.piece) {
        ui.board_canvas.set_player_for_$place($place, this.piece.player);
        ui.board_canvas.set_moving_for_$place($place, (this.piece == ui.moving_piece));
      } else {
        ui.board_canvas.set_player_for_$place($place, null);
        ui.board_canvas.set_moving_for_$place($place, null);
      }
    });
  }
};

UI.prototype.write_infos = function() {
  if (this.active) {
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
        if (this.game.winner !== null)
        {
          infos += '<p>' + this.text_for_player(this.game.winner) + ' won the game!</p>';
        }
        else if (this.game.draw_reason !== null)
        {
          infos += '<p>The game ended in a draw!</p>';
          switch (this.game.draw_reason)
          {
            case DrawReason.NO_CAPTURE_IN_50_TURNS:
              infos += '<p>No capture has been made in 50 turns.</p>';
              break;
            case DrawReason.THREE_IDENTICAL_TURNS:
              infos += '<p>Pieces position has been repeated 3 times.</p>';
              break;
            case DrawReason.NO_CAPTURE_IN_10_TURNS_AFTER_BOTH_CAN_JUMP:
              infos += '<p>Both players had 3 pieces and did not finish in 10 turns.</p>';
              break;
          }
        }
    }
    $("#infos").html(infos);
  }
};

UI.prototype.text_for_player = function(player) {
  return '<span class="' + player.color + '">' + player.name + '</span>';
};
