const{
    addMusicModel,
    findUidMusicModel,
    deleteMusicModel,
}=require(process.cwd()+'/models/music');

const addMusic=async(req,res)=>{
    let postData=req.body;
    try{
        let bl=await addMusicModel(postData);
        //判断返回
        if(bl){
            res.status(200).json({message:"Add Music"});
        }else{
            res.status(500).json({message:"Error"});
        }
         
    }catch(ex){
        res.status(500).json({message:ex.message});
    }
}

const findUidMusic=async(req,res)=>{
    const {uid}=req.query;
    let query=await findUidMusicModel(uid);
    res.status(200).json({
        success:"success",
        music_list:query
    });
}

const deleteMusic=async(req,res)=>{
    const {id}=req.body;
    let query=await deleteMusicModel(id);
    res.status(200).json({
        success:"Deleted successfully!",
        music_list:query
    });
}

module.exports={
    addMusic,
    findUidMusic,
    deleteMusic,
}