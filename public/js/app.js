'use strict';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// This creates the Frontend Post Model
var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id'
});

// This creates the Frontend Post Collection
var PostCollection = Backbone.Collection.extend({
	url: '/api/posts',
	model: PostModel
});

// This creates the Frontend Subbreddit Model
var SubbredditModel = Backbone.Model.extend({
	urlRoot: '/api/subbreddits/',
	idAttribute: 'id'
});

// This creates the Frontend Subbreddit Collection
var SubbredditCollection = Backbone.Collection.extend({
	url: '/api/subbreddits',
	model: PostModel
});

// This creates the Frontend Comment Model
var CommentModel = Backbone.Model.extend({
	urlRoot: '/api/comments/',
	idAttribute: 'id'
});

// This creates the Frontend Comment Collection
var CommentCollection = Backbone.Collection.extend({
	url: '/api/comments',
	model: PostModel
});

// This creates the Frontend User Model
var UserModel = Backbone.Model.extend({
	urlRoot: '/api/users/',
	idAttribute: 'id'
});

// This creates the Frontend User Collection
var UserCollection = Backbone.Collection.extend({
	url: '/api/users',
	model: PostModel
});


// This creates the Frontend Post View
var PostItemView = Backbone.View.extend({
	el: '<div></div>',

	template: _.template('\
		<h2><%= post.get("title") %></h2>\
		'), 

	render: function () {
		this.$el.html(this.template({post: this.model}))
	}
});

// This creates an instance of the Frontend Post View
var post = new PostModel({id: 1});

post.fetch({
	success: function () {
		var postItemView = new PostItemView({ model: post });
		postItemView.render();
	$('#content').html(postItemView.el);
	}
});


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