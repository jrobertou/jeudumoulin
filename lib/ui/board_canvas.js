function BoardCanvas(canvas_id, width, height) {
  this.canvas_id = canvas_id;
  this.width = width;
  this.height = height;
  this.init();
}

BoardCanvas.prototype.init = function() {
  var paper = Raphael(this.canvas_id, this.width, this.height);
  this.paper = paper;

  var board_color = "#333333";

  paper.setViewBox(-330, -330, 660, 660, true);

  paper.setStart();
  paper.rect(-300, -300, 600, 600);
  paper.rect(-200, -200, 400, 400);
  paper.rect(-100, -100, 200, 200);
  paper.path("M    0,-300 L   0,-100");
  paper.path("M    0, 300 L   0, 100");
  paper.path("M -300,   0 L-100,   0");
  paper.path("M  300,   0 L 100,   0");
  paper.setFinish().attr({stroke: board_color, "stroke-width": 10});

  paper.setStart();
  paper.circle(-300, -300, 15);
  paper.circle(   0, -300, 15);
  paper.circle( 300, -300, 15);
  paper.circle(-200, -200, 15);
  paper.circle(   0, -200, 15);
  paper.circle( 200, -200, 15);
  paper.circle(-100, -100, 15);
  paper.circle(   0, -100, 15);
  paper.circle( 100, -100, 15);
  paper.circle(-300,    0, 15);
  paper.circle(-200,    0, 15);
  paper.circle(-100,    0, 15);
  paper.circle( 100,    0, 15);
  paper.circle( 200,    0, 15);
  paper.circle( 300,    0, 15);
  paper.circle(-100,  100, 15);
  paper.circle(   0,  100, 15);
  paper.circle( 100,  100, 15);
  paper.circle(-200,  200, 15);
  paper.circle(   0,  200, 15);
  paper.circle( 200,  200, 15);
  paper.circle(-300,  300, 15);
  paper.circle(   0,  300, 15);
  paper.circle( 300,  300, 15);
  var set = paper.setFinish().attr({fill: board_color, stroke: null});
  set.forEach(function(element) {
    $(element.node).css('cursor', 'pointer');
  });

  paper.customAttributes.player = function(player) {
    var attributes = {};
    if (player) {
      attributes = {fill: player.color, stroke: board_color, "stroke-width": 2, r: 15};
    } else {
      attributes = {fill: board_color, stroke: null, r: 15};
    }
    return attributes;
  };

  paper.customAttributes.moving = function(moving) {
    var attributes = {};
    if (moving) {
      attributes = {r: 20};
    } else {
      attributes = {r: 15};
    }
    return attributes;
  };
};

BoardCanvas.prototype.$places = function() {
  return $(this.paper.canvas).children('circle');
};

BoardCanvas.prototype.set_player_for_$place = function($place, player) {
  this.paper.getById($place.raphaelid).attr({player: player});
};

BoardCanvas.prototype.set_moving_for_$place = function($place, moving) {
  this.paper.getById($place.raphaelid).attr({moving: moving});
};
