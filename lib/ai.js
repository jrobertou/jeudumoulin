function AI(game, player) {
  this.game = game;
  this.player = player;
  this.init_player_listeners();
  this.wait_time = 0;
  this.get_placement_value = function(place) { return 0; };
  this.get_movement_value = function(movement) { return 0; };
  this.get_capture_value = function(piece) { return 0; };
}

AI.prototype.init_player_listeners = function() {
  var ai = this;
  this.player.on_beginning_of_turn = function() {
    ai.on_beginning_of_turn();
  };
  this.player.on_beginning_of_capture = function() {
    ai.on_beginning_of_capture();
  };
};

AI.prototype.on_beginning_of_turn = function() {
  var ai = this;
  setTimeout(function() {
    switch(ai.game.state)
    {
      case GameState.FIRST_STAGE:
        ai.place_piece();
        break;
      case GameState.SECOND_STAGE:
        ai.move_piece();
        break;
    }
  }, ai.wait_time);
};

AI.prototype.on_beginning_of_capture = function() {
  var ai = this;
  setTimeout(function() {
    ai.capture_piece();
  }, ai.wait_time);
};

AI.prototype.place_piece = function() {
  var places = this.game.board.empty_places();

  var place = this.best_action(places, this.get_placement_value);

  this.player.place_piece(place);
};

AI.prototype.move_piece = function() {
  var pieces = this.player.pieces_on_board();

  var movements = _.chain(pieces)
        .map(function(piece) {
          return _.map(piece.places_movable_to(), function(place) {
            return {piece: piece, place: place};
          });
        })
        .flatten(true)
        .value();

  var movement = this.best_action(movements, this.get_movement_value);

  this.player.move_piece(movement.piece, movement.place);
};

AI.prototype.capture_piece = function() {
  var pieces = _.select(this.game.other_player(this.player).pieces_on_board(),
                  function(piece) {
                    return piece.can_be_captured();
                  });

  var piece = this.best_action(pieces, this.get_capture_value);

  this.player.capture_piece(piece);
};

AI.prototype.best_action = function(possible_actions, sort_func) {
  return _.chain(possible_actions)
          .groupBy(function(action) {
            return sort_func(action);
          })
          .pairs()
          .sortBy(function(pair) {
           return pair[0];
          })
          .last()
          .last()
          .value()
          .random_element();
};
