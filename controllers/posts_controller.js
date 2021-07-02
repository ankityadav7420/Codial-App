const Post = require('../models/post');
const Comment = require('../models/comment');

//adding post
module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post published successfully');
        return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

//deleting post
module.exports.destroy = async function(req, res){
     
    try{
        let post =  await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            req.flash('success','Post deleted successfully with their comments');
                return res.redirect('back');  
        }else{
            req.flash('error','you can not delet this post');
                return res.redirect('back');  
        }
    }catch(err){
        req.flash('error','err');
                return res.redirect('back');  
    }     
}