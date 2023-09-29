import axios from 'axios';


export default {
    LoginRequest:(newUser: any)=> {
        console.log("newUser",newUser);
        console.log("import.meta.env.REACT_APP_SERVER_HOST",import.meta.env.VITE_SERVER_HOST);
        //login google
        return axios.post(import.meta.env.VITE_SERVER_HOST+`apis/v1/googleuser`,newUser)
          .then(res => {
            // console.log(res);
           return res
          })
          .catch(error => 
            {
                console.log(error)
                //nếu có reponse từ server
                if(error.response){
                  return {data:{
                    status:false,
                    message:error.response.data.message
                }
                   }
                }
                //nếu không có reponse từ server
                return {data:{
                    status:false,
                    message:"Hệ thống bận thử lại sau"
                }
                   }
            }
            );
      },


}