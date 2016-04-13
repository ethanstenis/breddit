'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
require('foundation');

var HomeView = require('./views/HomeView.js');
var TopNavView = require('./views/TopNavView.js');

$(document).on('ready', function() {

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  var topNavView = new TopNavView();
  $('#content').html(TopNavView.render().el);
  TopNavView.render();

  var AppRouter = Backbone.Router.extend() {
    routes: {
      '/': 'home'
    },

    home: function() {
      var homeView = new HomeView();
      $('#content').html(homeView.render().el);
      homeView.render();
    }
  }

  var router = new AppRouter();
  Backbone.history.start();

});
