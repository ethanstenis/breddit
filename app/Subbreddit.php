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
    public function users()
    {
        return $this->hasMany('App\User');
    }

    /**
     * Get the users that are subscribed to this subbreddit.
     */
    public function subscribedUsers()
    {
        return $this->belongsToMany('App\User');
    }
}
