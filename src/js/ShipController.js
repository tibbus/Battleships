var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var SquareModel = require('./SquareModel');
var _ = require('underscore');
var BattleshipsApp = require('./BattleshipsApp');

/*
    Marionette Ship Controller
    This object creates all the ships and keep the status regarding them
*/
module.exports = Marionette.Object.extend({

    shipOrientation: [
           1,   // Horizontal
           10   // Vertical
    ],

    shipCollection: [],

    shipSinked: 0,

    initialize: function () {
        var self = this;

        // Event listener triggered to check if the ship was destroyed, from Marionette SquareView
        BattleshipsApp.on('isShipSinked', function (ship) {
            self.isShipSinked(ship)
        });

        //@param: number of squares
        //@param: draw from random square
        //@param: orientation horizontal/vertical
        // generate 1 x Battleship (5 squares)       
        this.generateShip(5, _.random(1, 100), _.random(0, 1));
        // generate 1 x Destroyer (4 squares)
        this.generateShip(4, _.random(1, 100), _.random(0, 1));
        // generate 1 x Destroyers (4 squares)
        this.generateShip(4, _.random(1, 100), _.random(0, 1));
    },

    isShipSinked: function (ship) {
        var allshipSinked = false;

        // use for instead of each, because cannot exit from each method
        for (var i = 0; i < ship.length; i++) {
            if (ship[i].get('clicked') === false) {
                return;
            }
        }

        this.shipSinked++;
        if (this.shipSinked === this.shipCollection.length) {
            allshipSinked = true;
        }
        // Sink the ship, event from Marionette SquaresViewCollection
        BattleshipsApp.trigger('sinkThisShip', ship, allshipSinked);
    },

    // generate a ship on the grid
    generateShip: function (numberOfSquares, randomSquare, orientationIndex) {
        var squares = [];
        var orientation = this.shipOrientation[orientationIndex];

        if (this.getModelFromSquare(randomSquare)) {
            squares.push(this.getModelFromSquare(randomSquare));
        } else {
            // if the current randomSquare is not valid, execute the function again with new Random values
            this.generateShip(numberOfSquares, _.random(1, 100), _.random(0, 1));
            return;
        }

        for (var i = 1; i < numberOfSquares; i++) {
            var nextSquare = randomSquare + i * orientation;

            // check if the next square is on the same line on the grid
            if (orientationIndex === 0 && (parseInt(randomSquare / 10) !== parseInt(nextSquare / 10) || randomSquare % 10 === 0)) {
                break;
            }
            // check if the next square is free to take
            if (this.getModelFromSquare(nextSquare)) {
                squares.push(this.getModelFromSquare(nextSquare));
            }
        }

        // check if the ship has enough squares
        if (squares.length === numberOfSquares) {
            this.createShipCollection(squares);
            return;
        } else {
            // try to add squares for ship on reverse order (to Left for Horizontal, to Top for Vertical)
            for (var i = 1; i < numberOfSquares - squares.length; i++) {
                var nextSquare = randomSquare - i * orientation;

                // check if the next square is on the same line on the grid
                if (orientationIndex === 0 && parseInt(randomSquare / 10) !== parseInt(nextSquare / 10)) {
                    break;
                }
                // check if the next square is free to take
                if (this.getModelFromSquare(nextSquare)) {
                    squares.push(this.getModelFromSquare(nextSquare));
                }
            }
        }

        // check if the ship has enough squares
        if (squares.length === numberOfSquares) {
            this.createShipCollection(squares);
        } else {
            // if not, try with another randomSquare
            this.generateShip(numberOfSquares, _.random(1, 100), _.random(0, 1));
        }
    },

    // create a ship collection from the squares array, also update the current models with the new collection attr
    createShipCollection: function (modelsArray) {
        var Ship = Backbone.Collection.extend({ model: SquareModel });
        var ship = new Ship();
        this.shipCollection.push(ship);

        _.each(modelsArray, function (squareModel) {
            squareModel.set('collection', ship);
            ship.add(squareModel);
        });
    },

    // check if the model at the current index square is free to take
    getModelFromSquare: function (square) {
        var result = this.options.squaresCollection.where({ index: square });

        if (result.length > 0 && result[0].get('collection') === undefined) {
            return this.options.squaresCollection.where({ index: square })[0];
        } else {
            return null;
        }
    }
});