<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index($id)
    {
        $comment = Comment::with('user')->where('blog_id', $id)->get();
        return $comment;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'description'=>'required|min:10|max:2000',
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }else{
            Comment::create([
                'description' => $request->description,
                'user_id' => $request->user_id,
                'blog_id' => $request->blog_id,
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'نظر با موفقیت ارسال شد.'
            ]);
        }


    }
}
