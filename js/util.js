Array.prototype.random_element = function() {
  return this[Math.floor(Math.random()*(this.length))];
};

//return the table with the bigest rank on the first place
Array.prototype.array_piece_rank = function() {
	var array_piece_rank = this;

	var swap = true,
		swap_foo = null,
		length = array_piece_rank.length;
	while(swap){
		swap = false;
		for (var j; j<length-2; j++){
			if(array_piece_rank[j].rank < array_piece_rank[j+1].rank){
				swap_foo = array_piece_rank[j+1];
				array_piece_rank[j+1] = array_piece_rank[j];
				array_piece_rank[j] = swap_foo;
				swap = true;
			}
		}
	}
  return array_piece_rank;
};

//return an array on max rank
Array.prototype.max_rank_pieces_array = function() {
	var array_pieceplace_rank = this;
	if(array_pieceplace_rank.length == 1)
		return array_pieceplace_rank;

	array_pieceplace_rank = array_pieceplace_rank.array_piece_rank();

	var i = 0,
		array_retrun = [],
		rankMaxValue = array_pieceplace_rank[0].rank;

	while(i < array_pieceplace_rank.length && rankMaxValue == array_pieceplace_rank[i].rank){
		array_retrun.push(array_pieceplace_rank[i]);
		++i;
	}
  return array_retrun;
};
