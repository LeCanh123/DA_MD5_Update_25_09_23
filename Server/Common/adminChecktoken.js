adminCheckToken(createAdminCheckLoginDto: CreateAdminCheckLoginDto){
    try{
      let unpack:any= jwt.verifyToken(createAdminCheckLoginDto.token);
      console.log("unpack",unpack);
      
      if(unpack.username=="admin"){
       
        //enter code below this line
        console.log("Bạn Là Admin");
        return {
          status:true,
          message:"Bạn Là Admin"
        }

      }else{
        console.log("Bạn Không Phải Là Admin");
        return {
          status:false,
          message:"Bạn Không Phải Là Admin"
        }
      }
    }
    catch(err){
    console.log("Lỗi Hệ Thống");
      return {
        status:false,
        message:"Lỗi hệ thống"
      }
    
    }
  }