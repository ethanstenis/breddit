'use strict';

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var PostModel = Backbone.Model.extend({
	urlRoot: '/api/posts/',
	idAttribute: 'id'
});


var PostCollection = Backbone.Collection.extend({
	url: '/api/posts',
	model: PostModel
});

// Homework: Make a Model and Collection for Comments, Subbreddits, Users

var PostItemView = Backbone.View.extend({
	el: '<div></div>',

	template: _.template('\
		<h2><%= post.get("title") %></h2>\
		'), 

	render: function () {
		this.$el.html(this.template({post: this.model}))
	}
});

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