/*

0-------------1-------------2
|             |             |
|    3--------4--------5    |
|    |        |        |    |
|    |    6---7---8    |    |
|    |    |       |    |    |
9----10---11      12---13---14
|    |    |       |    |    |
|    |    15--16--17   |    |
|    |        |        |    |
|    18-------19------20    |
|             |             |
21------------22------------23

*/

function Board() {
  this.places = [];
  for (var i = 0; i < 24; i++) {
    this.places[i] = new Place();
  }
  this.init_adjacent_places();
}

Board.prototype.init_adjacent_places = function() {
  this.places[0].adjacent_places  = [this.places[1],  this.places[9]];
  this.places[1].adjacent_places  = [this.places[0],  this.places[2],  this.places[4]];
  this.places[2].adjacent_places  = [this.places[1],  this.places[14]];
  this.places[3].adjacent_places  = [this.places[4],  this.places[10]];
  this.places[4].adjacent_places  = [this.places[1],  this.places[3],  this.places[5],  this.places[7]];
  this.places[5].adjacent_places  = [this.places[4],  this.places[13]];
  this.places[6].adjacent_places  = [this.places[7],  this.places[11]];
  this.places[7].adjacent_places  = [this.places[4],  this.places[6],  this.places[8]];
  this.places[8].adjacent_places  = [this.places[7],  this.places[12]];
  this.places[9].adjacent_places  = [this.places[0],  this.places[10], this.places[21]];
  this.places[10].adjacent_places = [this.places[3],  this.places[9],  this.places[11], this.places[18]];
  this.places[11].adjacent_places = [this.places[6],  this.places[10], this.places[15]];
  this.places[12].adjacent_places = [this.places[8],  this.places[13], this.places[17]];
  this.places[13].adjacent_places = [this.places[5],  this.places[12], this.places[14], this.places[20]];
  this.places[14].adjacent_places = [this.places[2],  this.places[13], this.places[23]];
  this.places[15].adjacent_places = [this.places[11], this.places[16]];
  this.places[16].adjacent_places = [this.places[15], this.places[17], this.places[19]];
  this.places[17].adjacent_places = [this.places[12], this.places[16]];
  this.places[18].adjacent_places = [this.places[10], this.places[19]];
  this.places[19].adjacent_places = [this.places[16], this.places[18], this.places[20], this.places[22]];
  this.places[20].adjacent_places = [this.places[13], this.places[19]];
  this.places[21].adjacent_places = [this.places[9],  this.places[22]];
  this.places[22].adjacent_places = [this.places[19], this.places[21], this.places[23]];
  this.places[23].adjacent_places = [this.places[14], this.places[22]];
};