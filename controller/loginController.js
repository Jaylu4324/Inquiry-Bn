const login=(req,res)=>{
    var email1="test1@gmail.com";
    var password1="12345";

    let {email,password}=req.body;

    if(email1==email && password1==password){
        res.send("Login Success");
    }
    else{
        res.send("Invalid Credentials");
    }
}

module.exports={login};