var Marionette = require('backbone.marionette');

/*
    Marionette singleton application
    We need this as module to broadcast global events across app
*/
module.exports = new Marionette.Application();

