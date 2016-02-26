'use strict';

$.ajax('/subbreddits', {
	type: 'GET',
	success: function(subbreddits) {
		var string = "";
		$.each(subbreddits, function(subbreddit) {
			console.log(subbreddit);
			string += subbreddit.name;
			string += ' '; 
		})
		$('#content')
	}
});