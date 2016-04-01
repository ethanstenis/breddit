(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var HomeView = require('./views/HomeView.js');

$(document).on('ready', function() {

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  var homeView = new HomeView();
  $('#content').html(homeView.render().el);

})

},{"./views/HomeView.js":6}],2:[function(require,module,exports){
var PostModel = require('../models/PostModel.js');

var PostsCollection = Backbone.Collection.extend({
  url: '/api/posts/',
  model: PostModel
});

module.exports = PostsCollection;

},{"../models/PostModel.js":4}],3:[function(require,module,exports){
var SubbredditModel = require('../models/SubbredditModel.js');

var SubbredditsCollection = Backbone.Collection.extend({
  url: '/api/subbreddits/',
  model: SubbredditModel
});

module.exports = SubbredditsCollection;

},{"../models/SubbredditModel.js":5}],4:[function(require,module,exports){
var PostModel = Backbone.Model.extend({
  urlRoot: '/api/posts/',
  idAttribute: 'id',

  parse: function(response) {
    if (response.subbreddit) {
      var SubbredditModel = require('./SubbredditModel.js');
      response.subbreddit = new SubbredditModel(response.subbreddit);
    }
    return response;
  }
});

module.exports = PostModel;

},{"./SubbredditModel.js":5}],5:[function(require,module,exports){
var SubbredditModel = Backbone.Model.extend({
  urlRoot: '/api/subbreddits/',
  idAttribute: 'id',

  parse: function(response) {
    if (response.posts) {
      var PostsCollection = require('../collections/PostsCollection.js');
      response.posts = new PostsCollection(response.posts);
    }
    return response;
  }
});

module.exports = SubbredditModel;

},{"../collections/PostsCollection.js":2}],6:[function(require,module,exports){
var HomeView = Backbone.View.extend({
  el: '\
    <div class="container">\
      <div class="row">\
        <div class="three columns"></div>\
        <div class="six columns">\
          <div class="row">\
            <div class="twelve columns" id="posts"></div>\
          </div>\
          <div class="row">\
            <div class="twelve columns"></div>\
          </div>\
        </div>\
        <div class="three columns" id="all-subbreddits"></div>\
      </div>\
    </div>\
    ',

  insertSubbreddits: function() {
    var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
    var subbreddits = new SubbredditsCollection();
    subbreddits.fetch();
    var SubbredditsListView = require('./SubbredditsListView.js');
    var subbredditsListView = new SubbredditsListView({
      collection: subbreddits
    });
    this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);
  },

  insertPosts: function() {
    var PostsCollection = require('../collections/PostsCollection.js');
    var posts = new PostsCollection();
    posts.fetch();
    var PostsListView = require('./PostsListView.js');
    var postsListView = new PostsListView({
      collection: posts
    });
    this.$el.find('#posts').html(postsListView.render().el);
  },

  render: function() {
    this.insertSubbreddits();
    this.insertPosts();
    // Render functions should always return 'this' at the end.
    return this;
  }
});

module.exports = HomeView;

},{"../collections/PostsCollection.js":2,"../collections/SubbredditsCollection.js":3,"./PostsListView.js":7,"./SubbredditsListView.js":8}],7:[function(require,module,exports){
var PostsListView = Backbone.View.extend({
  el: '<ul></ul>',

  template: _.template('\
      <% posts.each(function(post) { %>\
        <li>\
            <a href="#"><%= post.get("title") %></a>\
            <% if (post.get("subbreddit")) { %>\
            <small><%= post.get("subbreddit").get("title") %></small>\
            <% } %>\
        </li>\
        <% }) %>\
    '),

  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    $(this.el).html(this.template({
      posts: this.collection
    }));
    return this;
  }
});

module.exports = PostsListView;

},{}],8:[function(require,module,exports){
var SubbredditsListView = Backbone.View.extend({
  el: '<ul></ul>', // put parent container in 'el' variable, and rest in template

  template: _.template('\
      <% subbreddits.each(function(subbreddit) { %>\
        <li><a data-id="<%= subbreddit.id %>" href="#"><%= subbreddit.get("title") %></a></li>\
        <% }) %>\
    '),

    events: {
      'click a': function(event) {
        event.preventDefault();
        var subbredditId = $(event.target).data('id');
        var SubbredditModel = require('../models/SubbredditModel.js');
        var subbreddit = new SubbredditModel({ id: subbredditId });
        subbreddit.fetch({
          success: function(){
            var PostsListView = require('../views/PostsListView.js');
            var postsListView = new PostsListView({
              collection: subbreddit.get('posts')
            });
            $('#posts').html(postsListView.render().el);
          }
        });
      }
    },

  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    $(this.el).html(this.template({
      subbreddits: this.collection
    }));
    return this;
  }
});

module.exports = SubbredditsListView;

},{"../models/SubbredditModel.js":5,"../views/PostsListView.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc3JjL2pzL2FwcC5qcyIsInB1YmxpYy9zcmMvanMvY29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uLmpzIiwicHVibGljL3NyYy9qcy9jb2xsZWN0aW9ucy9TdWJicmVkZGl0c0NvbGxlY3Rpb24uanMiLCJwdWJsaWMvc3JjL2pzL21vZGVscy9Qb3N0TW9kZWwuanMiLCJwdWJsaWMvc3JjL2pzL21vZGVscy9TdWJicmVkZGl0TW9kZWwuanMiLCJwdWJsaWMvc3JjL2pzL3ZpZXdzL0hvbWVWaWV3LmpzIiwicHVibGljL3NyYy9qcy92aWV3cy9Qb3N0c0xpc3RWaWV3LmpzIiwicHVibGljL3NyYy9qcy92aWV3cy9TdWJicmVkZGl0c0xpc3RWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIEhvbWVWaWV3ID0gcmVxdWlyZSgnLi92aWV3cy9Ib21lVmlldy5qcycpO1xuXG4kKGRvY3VtZW50KS5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcblxuICAkLmFqYXhTZXR1cCh7XG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JylcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBob21lVmlldyA9IG5ldyBIb21lVmlldygpO1xuICAkKCcjY29udGVudCcpLmh0bWwoaG9tZVZpZXcucmVuZGVyKCkuZWwpO1xuXG59KVxuIiwidmFyIFBvc3RNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9Qb3N0TW9kZWwuanMnKTtcblxudmFyIFBvc3RzQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgdXJsOiAnL2FwaS9wb3N0cy8nLFxuICBtb2RlbDogUG9zdE1vZGVsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0c0NvbGxlY3Rpb247XG4iLCJ2YXIgU3ViYnJlZGRpdE1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL1N1YmJyZWRkaXRNb2RlbC5qcycpO1xuXG52YXIgU3ViYnJlZGRpdHNDb2xsZWN0aW9uID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuICB1cmw6ICcvYXBpL3N1YmJyZWRkaXRzLycsXG4gIG1vZGVsOiBTdWJicmVkZGl0TW9kZWxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmJyZWRkaXRzQ29sbGVjdGlvbjtcbiIsInZhciBQb3N0TW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuICB1cmxSb290OiAnL2FwaS9wb3N0cy8nLFxuICBpZEF0dHJpYnV0ZTogJ2lkJyxcblxuICBwYXJzZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2Uuc3ViYnJlZGRpdCkge1xuICAgICAgdmFyIFN1YmJyZWRkaXRNb2RlbCA9IHJlcXVpcmUoJy4vU3ViYnJlZGRpdE1vZGVsLmpzJyk7XG4gICAgICByZXNwb25zZS5zdWJicmVkZGl0ID0gbmV3IFN1YmJyZWRkaXRNb2RlbChyZXNwb25zZS5zdWJicmVkZGl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TW9kZWw7XG4iLCJ2YXIgU3ViYnJlZGRpdE1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgdXJsUm9vdDogJy9hcGkvc3ViYnJlZGRpdHMvJyxcbiAgaWRBdHRyaWJ1dGU6ICdpZCcsXG5cbiAgcGFyc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLnBvc3RzKSB7XG4gICAgICB2YXIgUG9zdHNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi4vY29sbGVjdGlvbnMvUG9zdHNDb2xsZWN0aW9uLmpzJyk7XG4gICAgICByZXNwb25zZS5wb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24ocmVzcG9uc2UucG9zdHMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmJyZWRkaXRNb2RlbDtcbiIsInZhciBIb21lVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgZWw6ICdcXFxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cXFxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aHJlZSBjb2x1bW5zXCI+PC9kaXY+XFxcbiAgICAgICAgPGRpdiBjbGFzcz1cInNpeCBjb2x1bW5zXCI+XFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VsdmUgY29sdW1uc1wiIGlkPVwicG9zdHNcIj48L2Rpdj5cXFxuICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdlbHZlIGNvbHVtbnNcIj48L2Rpdj5cXFxuICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgIDwvZGl2PlxcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aHJlZSBjb2x1bW5zXCIgaWQ9XCJhbGwtc3ViYnJlZGRpdHNcIj48L2Rpdj5cXFxuICAgICAgPC9kaXY+XFxcbiAgICA8L2Rpdj5cXFxuICAgICcsXG5cbiAgaW5zZXJ0U3ViYnJlZGRpdHM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBTdWJicmVkZGl0c0NvbGxlY3Rpb24gPSByZXF1aXJlKCcuLi9jb2xsZWN0aW9ucy9TdWJicmVkZGl0c0NvbGxlY3Rpb24uanMnKTtcbiAgICB2YXIgc3ViYnJlZGRpdHMgPSBuZXcgU3ViYnJlZGRpdHNDb2xsZWN0aW9uKCk7XG4gICAgc3ViYnJlZGRpdHMuZmV0Y2goKTtcbiAgICB2YXIgU3ViYnJlZGRpdHNMaXN0VmlldyA9IHJlcXVpcmUoJy4vU3ViYnJlZGRpdHNMaXN0Vmlldy5qcycpO1xuICAgIHZhciBzdWJicmVkZGl0c0xpc3RWaWV3ID0gbmV3IFN1YmJyZWRkaXRzTGlzdFZpZXcoe1xuICAgICAgY29sbGVjdGlvbjogc3ViYnJlZGRpdHNcbiAgICB9KTtcbiAgICB0aGlzLiRlbC5maW5kKCcjYWxsLXN1YmJyZWRkaXRzJykuaHRtbChzdWJicmVkZGl0c0xpc3RWaWV3LnJlbmRlcigpLmVsKTtcbiAgfSxcblxuICBpbnNlcnRQb3N0czogZnVuY3Rpb24oKSB7XG4gICAgdmFyIFBvc3RzQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL2NvbGxlY3Rpb25zL1Bvc3RzQ29sbGVjdGlvbi5qcycpO1xuICAgIHZhciBwb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24oKTtcbiAgICBwb3N0cy5mZXRjaCgpO1xuICAgIHZhciBQb3N0c0xpc3RWaWV3ID0gcmVxdWlyZSgnLi9Qb3N0c0xpc3RWaWV3LmpzJyk7XG4gICAgdmFyIHBvc3RzTGlzdFZpZXcgPSBuZXcgUG9zdHNMaXN0Vmlldyh7XG4gICAgICBjb2xsZWN0aW9uOiBwb3N0c1xuICAgIH0pO1xuICAgIHRoaXMuJGVsLmZpbmQoJyNwb3N0cycpLmh0bWwocG9zdHNMaXN0Vmlldy5yZW5kZXIoKS5lbCk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmluc2VydFN1YmJyZWRkaXRzKCk7XG4gICAgdGhpcy5pbnNlcnRQb3N0cygpO1xuICAgIC8vIFJlbmRlciBmdW5jdGlvbnMgc2hvdWxkIGFsd2F5cyByZXR1cm4gJ3RoaXMnIGF0IHRoZSBlbmQuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVWaWV3O1xuIiwidmFyIFBvc3RzTGlzdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gIGVsOiAnPHVsPjwvdWw+JyxcblxuICB0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnXFxcbiAgICAgIDwlIHBvc3RzLmVhY2goZnVuY3Rpb24ocG9zdCkgeyAlPlxcXG4gICAgICAgIDxsaT5cXFxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj48JT0gcG9zdC5nZXQoXCJ0aXRsZVwiKSAlPjwvYT5cXFxuICAgICAgICAgICAgPCUgaWYgKHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKSkgeyAlPlxcXG4gICAgICAgICAgICA8c21hbGw+PCU9IHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKS5nZXQoXCJ0aXRsZVwiKSAlPjwvc21hbGw+XFxcbiAgICAgICAgICAgIDwlIH0gJT5cXFxuICAgICAgICA8L2xpPlxcXG4gICAgICAgIDwlIH0pICU+XFxcbiAgICAnKSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwgJ3VwZGF0ZScsIHRoaXMucmVuZGVyKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICQodGhpcy5lbCkuaHRtbCh0aGlzLnRlbXBsYXRlKHtcbiAgICAgIHBvc3RzOiB0aGlzLmNvbGxlY3Rpb25cbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RzTGlzdFZpZXc7XG4iLCJ2YXIgU3ViYnJlZGRpdHNMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgZWw6ICc8dWw+PC91bD4nLCAvLyBwdXQgcGFyZW50IGNvbnRhaW5lciBpbiAnZWwnIHZhcmlhYmxlLCBhbmQgcmVzdCBpbiB0ZW1wbGF0ZVxuXG4gIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCdcXFxuICAgICAgPCUgc3ViYnJlZGRpdHMuZWFjaChmdW5jdGlvbihzdWJicmVkZGl0KSB7ICU+XFxcbiAgICAgICAgPGxpPjxhIGRhdGEtaWQ9XCI8JT0gc3ViYnJlZGRpdC5pZCAlPlwiIGhyZWY9XCIjXCI+PCU9IHN1YmJyZWRkaXQuZ2V0KFwidGl0bGVcIikgJT48L2E+PC9saT5cXFxuICAgICAgICA8JSB9KSAlPlxcXG4gICAgJyksXG5cbiAgICBldmVudHM6IHtcbiAgICAgICdjbGljayBhJzogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHN1YmJyZWRkaXRJZCA9ICQoZXZlbnQudGFyZ2V0KS5kYXRhKCdpZCcpO1xuICAgICAgICB2YXIgU3ViYnJlZGRpdE1vZGVsID0gcmVxdWlyZSgnLi4vbW9kZWxzL1N1YmJyZWRkaXRNb2RlbC5qcycpO1xuICAgICAgICB2YXIgc3ViYnJlZGRpdCA9IG5ldyBTdWJicmVkZGl0TW9kZWwoeyBpZDogc3ViYnJlZGRpdElkIH0pO1xuICAgICAgICBzdWJicmVkZGl0LmZldGNoKHtcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIFBvc3RzTGlzdFZpZXcgPSByZXF1aXJlKCcuLi92aWV3cy9Qb3N0c0xpc3RWaWV3LmpzJyk7XG4gICAgICAgICAgICB2YXIgcG9zdHNMaXN0VmlldyA9IG5ldyBQb3N0c0xpc3RWaWV3KHtcbiAgICAgICAgICAgICAgY29sbGVjdGlvbjogc3ViYnJlZGRpdC5nZXQoJ3Bvc3RzJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnI3Bvc3RzJykuaHRtbChwb3N0c0xpc3RWaWV3LnJlbmRlcigpLmVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sICd1cGRhdGUnLCB0aGlzLnJlbmRlcik7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMuZWwpLmh0bWwodGhpcy50ZW1wbGF0ZSh7XG4gICAgICBzdWJicmVkZGl0czogdGhpcy5jb2xsZWN0aW9uXG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdWJicmVkZGl0c0xpc3RWaWV3O1xuIl19
