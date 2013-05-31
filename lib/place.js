function Place(game) {
  this.game = game;
  this.piece = null;
  this.adjacent_places = null;
  this.mill_places = null;
}

Place.prototype.is_occupied = function() {
  return this.piece !== null;
};

Place.prototype.is_empty = function() {
  return this.piece === null;
};

Place.prototype.is_adjacent_to = function(place) {
  return this.adjacent_places.indexOf(place) != -1;
};

Place.prototype.empty_adjacent_places = function() {
  var empty_adjacent_places = [];

  this.adjacent_places.forEach(function(place) {
    if(place.is_empty()) {
      empty_adjacent_places.push(place);
    }
  });

  return empty_adjacent_places;
}

Place.prototype.is_adjacent_occupied_to = function() {
	var result = [],
		adj = this.adjacent_places;

		for(var i, imax = adj.length; i <imax; i++){
			if(adj[i].is_occupied())
				result.push(adj[i]);
		}
  return result;
};

Place.prototype.calculate_nb_adjacent_occupied = function() {
	var result = 0;

	this.adjacent_places.forEach(function(placeAdj){
		if(placeAdj.is_occupied())
				result++;
	});
  return result;
};

Place.prototype.calculate_nb_adjacent_free = function() {
	var result = 0;

		this.adjacent_places.forEach(function(placeAdj){
		if(placeAdj.is_empty())
				result++;
	});
  return result;
};
