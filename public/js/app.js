'use strict';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// MODELS - takes care of the resource functions

// This creates the Frontend Post Model
var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id'
});

// This creates the Frontend Subbreddit Model
var SubbredditModel = Backbone.Model.extend({
	urlRoot: '/api/subbreddits/',
	idAttribute: 'id'
});

// This creates the Frontend Comment Model
var CommentModel = Backbone.Model.extend({
	urlRoot: '/api/comments/',
	idAttribute: 'id'
});

// This creates the Frontend User Model
var UserModel = Backbone.Model.extend({
	urlRoot: '/api/users/',
	idAttribute: 'id'
});


// COLLECTIONS

// This creates the Frontend Post Collection
var PostsCollection = Backbone.Collection.extend({
	url: '/api/posts/',
	model: PostModel
});

// This creates the Frontend Subbreddit Collection
var SubbredditsCollection = Backbone.Collection.extend({
	url: '/api/subbreddits/',
	model: SubbredditModel
});

// This creates the Frontend Comment Collection
var CommentsCollection = Backbone.Collection.extend({
	url: '/api/comments/',
	model: CommentModel
});

// This creates the Frontend User Collection
var UsersCollection = Backbone.Collection.extend({
	url: '/api/users/',
	model: UserModel
});


// VIEWS

// This creates the Frontend Post Item View
var PostItemView = Backbone.View.extend({
	el: '<li class="hello"></li>',

	template: _.template('<h2><%= post.get("title") %></h2>'),

  events: {
    'click h2': function(e) {
        this.model.destroy();
    }
  },

  initialize: function() {
    this.listenTo(this.model, 'all', function() {
      console.log(arguments);
    });
    this.listenTo(this.model, 'sync', this.render);
  },

	render: function() {
		this.$el.html(this.template({post: this.model}));
	}
});

var PostsListView = Backbone.View.extend({
	el: '<ul></ul>',

	template: 'undefined',

  initialize: function() {
    this.listenTo(this.collection, 'all', function() {
      console.log(event);
    });
    this.listenTo(this.collection, 'sync update', this.render);
  },

	render: function() {
		var that = this;
    this.$el.html('');
		this.collection.each(function(postModel) {
			var postItemView = new PostItemView({ model: postModel });
			postItemView.render();
			that.$el.append(postItemView.el);
		});
    return this;
	}
});

// New iteration of a Posts Collection
var posts = new PostsCollection();
// fetch data for posts
posts.fetch();

var postsListView = new PostsListView({collection: posts});
postsListView.render();

$('#content').html(postsListView.el);
  console.log('view inserted!');
// This creates a new Post Model
// var post = new PostModel({id: 1});

// This executes a 'GET' request
// post.fetch({
// 	success: function() {
// 		var postItemView = new PostItemView({ model: post });
// 		postItemView.render();

// 		$('#content').html(postItemView.el);
// 	}
// });



// The code below it the LONG way to create ajax calls for each model. We added the .ajaxSetup above in order to create cleaner code.
/*
$.ajax('/api/subbreddits', {
	type: 'GET',
	success: function(subbreddits) {
		var string = "";
		_.each(subbreddits, function(subbreddit) {
			console.log(subbreddit);
			string += subbreddit.name;
			string += ' ';
		})
		$('#content').text(string);
	}
});

$.ajax('/api/posts', {
	type: 'GET',
	success: function(posts) {
		var string = "";
		_.each(posts, function(post) {
			console.log(post);
			string += post.name;
			string += ' ';
		})
		$('#content').text(string);
	}
});

$.ajax('/api/comments', {
	type: 'GET',
	success: function(comments) {
		var string = "";
		_.each(comments, function(comment) {
			console.log(comment);
			string += comment.name;
			string += ' ';
		})
		$('#content').text(string);
	}
});
*/
