<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subbreddit extends Model
{
    /**
     * Get the posts for the subbreddit.
     */
    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    /**
     * Get the user it belongs to.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the subscribed users of this subbreddit.
     */
    public function subscribedUsers()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }
}
