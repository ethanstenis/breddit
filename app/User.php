<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Get the posts for the subbreddit.
     */
    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    /**
     * Get the subbreddits for the user.
     */
    public function subbreddit()
    {
        return $this->hasMany('App\Subbreddit');
    }

    /**
     * Get the subscribed subbreddits of user.
     */
    public function subscribedSubbreddits()
    {
        return $this->belongsToMany('App\Subbreddit');
    }


}
