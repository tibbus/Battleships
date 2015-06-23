var Marionette = require('backbone.marionette');
var SquareView = require('./SquareView');
var BattleshipsApp = require('./BattleshipsApp');
var $ = require('jquery');
var _ = require('underscore');


/*
    Squares Marionette Collection View
    This is the grid created from Marionette Square View
*/
module.exports = Marionette.CollectionView.extend({
    childView: SquareView,
    className: 'grid-wrapper',

    initialize: function () {
        var self = this;

        // Event listener to check if the ship was destroyed, from Marionette Ship Object
        BattleshipsApp.on('sinkThisShip', function (ship, allShipsSinked) {
            self.sinkThisShip(ship, allShipsSinked);
        });
    },

    sinkThisShip: function (ship, allShipsSinked) {
        var self = this;

        _.each(ship, function (squareModel) {
            var itemView = self.children.findByModel(squareModel);
            $(itemView.el).children().addClass('ship-sinked');
        });

        // if all ships are sinked, close all squares
        if (allShipsSinked === true) {
            this.collection.each(function (squareModel) {
                var itemView = self.children.findByModel(squareModel);
                if (squareModel.get('clicked') === false) {
                    BattleshipsApp.trigger('squareClick', squareModel);
                    $(itemView.el).children().addClass('ship-missed');
                }
            });
        }
    }
});

