var Marionette = require('backbone.marionette');
var $ = require('jquery');
var SquareModel = require('./js/SquareModel');
var SquaresCollection = require('./js/SquaresCollection');
var SquareView = require('./js/SquareView');
var SquaresViewCollection = require('./js/SquaresViewCollection');
var ShipController = require('./js/ShipController');
var BattleShipsApp = require('./js/BattleshipsApp');

BattleShipsApp.addRegions({
    mainRegion: ".content"
});

BattleShipsApp.addInitializer(function (options) {
    var squaresView = new SquaresViewCollection({
        collection: options.squaresCollection
    });
    BattleShipsApp.mainRegion.show(squaresView);
});

$(document).ready(function () {
    var squaresCollection = new SquaresCollection();

    for (var i = 1; i <= 100; i++) {
        squaresCollection.add(new SquareModel({
            index: i
        }));
    }

    BattleShipsApp.start({ squaresCollection: squaresCollection });

    var shipController = new ShipController({
        squaresCollection: squaresCollection
    });

});

