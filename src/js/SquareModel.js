var Backbone = require('backbone');

/*
    Square Backbone Model
    This Model keep the status if it's clicked and if this square is part of a ship
*/
module.exports = Backbone.Model.extend({

    defaults: {
        clicked: false,
        collection: undefined
    },

    squareClick: function () {
        this.set('clicked', true);
    }
});
