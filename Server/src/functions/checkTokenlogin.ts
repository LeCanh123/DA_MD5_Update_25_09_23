import apis from "../apis"

export default {
    checktokenlogin:async (tokenlogin)=>{
console.log(tokenlogin,"tokenlogin");
            let LoginRequest1 = await apis.LogintokenRequest(tokenlogin)
            return LoginRequest1

          },
    checkadmintokenlogin:async (tokenlogin)=>{
      console.log(tokenlogin,"tokenlogin");
                  let LoginRequest1 = await apis.adminogintokenRequest(tokenlogin)
                  return LoginRequest1
      
                },

    }
