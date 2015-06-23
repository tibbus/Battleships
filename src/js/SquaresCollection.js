var Backbone = require('backbone');
var SquareModel = require('./SquareModel');
var BattleshipsApp = require('./BattleshipsApp');


/*
    Squares Backbone Collection
    This is the grid created from Backbone Square models
*/
module.exports = Backbone.Collection.extend({

    model: SquareModel,

    initialize: function (cats) {
        // trigger the click event to the Backbone Model
        BattleshipsApp.on('squareClick', function (square) {
            square.squareClick();
        });
    }
});
