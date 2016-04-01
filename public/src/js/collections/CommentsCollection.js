var CommentModel = require('../models/CommentsModel.js');

var CommentsCollection = Backbone.Collection.extend({
  url: '/api/comments/',
  model: CommentModel
});

module.exports = CommentsModel;
