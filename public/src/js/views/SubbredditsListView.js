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
