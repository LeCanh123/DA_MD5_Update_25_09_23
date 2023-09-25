import * as jwt from 'jsonwebtoken';
// import dotenv from "dotenv"
// dotenv.config()

export default {
    //gọi lúc tạo tài khoản để gửi vào email
    createToken: function (data:any, time:number) {
        console.log(typeof time);
        console.log("process.env.JWT_KEY",process.env.JWT_KEY); 
        // time(ms)
        try {
            return jwt.sign(
                data
                ,String(process.env.JWT_KEY)
                );
        } catch (err) { 
            console.log("lỗi rồi",err);
            return false 
        }
    },
    //gọi lúc người dùng ấn nút xác nhận trong email
    verifyToken: function(token:any) {
        console.log("token",token);
        
        let result;
        jwt.verify(token, String(process.env.JWT_KEY), function(err:any, decoded:any) {
            if(err) {
                console.log("lỗi",err);
                
                result = false
            }else {
                result = decoded
            }
        });
        return result
    },
    createTokenforever: function (data:any) {
        // time(ms)
        try {
            return jwt.sign(
                data
                , String(process.env.JWT_KEY)
                // , { expiresIn: `9999 years` }
                );
        } catch (err) {
            console.log(err);
            
            return false
        }
    },
}

