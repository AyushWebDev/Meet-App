const mongoose=require('mongoose');
const crypto=require('crypto');

const userSchema=new mongoose.Schema({
    username:{ 
        type: String
    },
    email:{
        type: String
    },
    hashedPassword: {
        type: String
    } 
});


userSchema.methods={
    encryptPassword: function(password){
        if(!password)
         return "";

        try{
            return crypto.createHash("sha1")
                   .update(password)
                   .digest("hex");
        }
        catch(err)
        {
            return "";
        }
    },
    authenticate: function(plaintext){
        return this.encryptPassword(plaintext)===this.hashedPassword
    }
}


userSchema.virtual("password")
.set(function(password){
    this._password=password;
    this.hashedPassword=this.encryptPassword(password);
})
.get(function(){
    return this._password;
})



module.exports=mongoose.model("User",userSchema);