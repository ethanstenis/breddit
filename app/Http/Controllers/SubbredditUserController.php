<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SubbredditUserController extends Controller
{

    // Subscribe to a subbreddit

    public function store($request) {
        \Auth::user()->SubscribedSubbreddits()->attach($request->subbreddit_id);
        return subbreddituser;
    }
}
