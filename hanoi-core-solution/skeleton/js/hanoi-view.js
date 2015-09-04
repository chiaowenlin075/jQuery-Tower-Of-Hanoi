(function() {
  window.Hanoi = window.Hanoi || {};

  var View = window.Hanoi.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.render();
    this.clickTower();
  };

  View.prototype.clickTower = function() {
    this.$el.on("click", "div", function(e) {
      if (typeof this.fromTower === "undefined") {
        this.$clickedTower = $(e.currentTarget).toggleClass("clicked");
        this.fromTower = this.$clickedTower.data("index");
      } else {
        this.toTower = $(e.currentTarget).data("index");
        this.$clickedTower.toggleClass("clicked");
        if (!this.game.move(this.fromTower, this.toTower)) {
          alert("Invalid move!");
        }

        this.render();
        this.fromTower = undefined;

        if (this.game.isWon()) {
          this.$el.off("click");
          this.$el.find("li").addClass("win-disc");
          this.$el.find("div").removeClass("tower-container").addClass("finished");
          alert("Good work, you.");
        }
      }
    }.bind(this));
  };

  View.prototype.setupBoard = function() {
    var $section = $("<section></section>").addClass("towers group");

    for (var i = 0; i < 3; i++) {
      var $div = $("<div></div>").data("index", i).addClass("tower-container");
      var $ul = $("<ul></ul>").addClass("hanoi-tower");
      $div.append($ul);
      $section.append($div);
    };

    this.$el.append($section);
  };

  View.prototype.render = function(){
    this.$el.find("ul").empty();
    var towers = this.game.towers;
    for (var i = 0; i < 3; i++) {
      var $ul = this.$el.find("div:nth-child(" + (i + 1) +") > .hanoi-tower");
      if (towers[i].length !== 0) {
        for (var j = towers[i].length - 1; j >= 0; j--) {
          var disc = towers[i][j]
          var $li = $("<li></li>").data("size", disc).addClass("disc-" + disc);
          $ul.append($li);
        };
      };
    };
  };

})();
