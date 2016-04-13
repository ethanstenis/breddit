'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
require('foundation');

var HomeView = require('./views/HomeView.js');
var TopNavView = require('./views/TopNavView.js');
var PostView = require('./views/PostView.js');
var PostModel = require('./models/PostModel.js');

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
      '/': 'home',
      '': 'home',
      'post': 'post'
    },

    home: function() {
      var homeView = new HomeView();
      $('#content').html(homeView..el);
      homeView.render();
    },

    post: function() {
      var post = new PostModel({ id: id });
      post.fetch();
      var postView = new PostView({
          model: post
      });
      $('#content').html(postView..el);
      postView.render();
    },

  });

  var router = new AppRouter();
  Backbone.history.start();

});
