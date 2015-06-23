var Marionette = require('backbone.marionette');
var $ = require('jquery');
var BattleshipsApp = require('./BattleshipsApp');


/*
    Squares Marionette View
    This is the Marionette View for one Square
*/
module.exports = Marionette.ItemView.extend({
    template: "#squareTemplate",
    className: "square-wrapper",

    initialize: function () {
        // from 10 to 10 squares create a new line
        if (this.model.get('index') % 10 === 1) {
            $(this.el).addClass('newLine');
        }
    },

    // square div click event
    events: {
        'click .square': 'squareClick',
    },

    squareClick: function () {
        // if the square was already clicked, exit
        if (this.model.get('clicked') === true) {
            return;
        }
        // trigger the click event to the Backbone Model Collection
        BattleshipsApp.trigger('squareClick', this.model);

        // check what type of Square was clicked
        if (this.model.get('collection') === undefined) {
            $(this.el).children().addClass('ship-missed');
        } else {
            // when a ship is damaged, check if needs to be sinked
            $(this.el).children().addClass('ship-damaged');
            BattleshipsApp.trigger('isShipSinked', this.model.get('collection').models);
        }
    }
});