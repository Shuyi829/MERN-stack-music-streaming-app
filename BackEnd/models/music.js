var MongoClient = require('mongodb').MongoClient;
const {ObjectId} =require('mongodb');
var url = "mongodb://localhost:27017/music";
var databasename="music";
var filename="music";

const addMusicModel=async(postData)=>{
    var bl=false;
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query=await user.insertOne({ 
        "uid": postData.uid,
        "uri":postData.uri,
        "name":postData.name,
        "image":postData.image
    });
    if(query.result.ok==1){
        bl=true;
    }
    return bl;
}

const findUidMusicModel=async(uid)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.find({uid:uid}).toArray();
    return query;
}

const deleteMusicModel=async(id)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.deleteOne({"_id":ObjectId(id)});
    return query;
}


module.exports={
    addMusicModel,
    findUidMusicModel,
    deleteMusicModel,
}

