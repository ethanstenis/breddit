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

var post = new PostModel();

debugger;


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