import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { getStorage } from "firebase/storage";
import googleRequest from "./googleRequest";
const provider = new GoogleAuthProvider();
// thay config thành config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyB1uLTbSCBMyI-amXp2oqsMMd_cl_BqIiA",
  authDomain: "uphinh-7980b.firebaseapp.com",
  projectId: "uphinh-7980b",
  storageBucket: "uphinh-7980b.appspot.com",
  messagingSenderId: "304935927335",
  appId: "1:304935927335:web:dbf026e4b046e560159802",
  measurementId: "G-S50ZSN7Y3F"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async  function Googlelogin() {
    console.log("vào login google");
    const auth = getAuth();
  return await signInWithPopup(auth, provider)
    .then((result:any) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = (result.user as any).accessToken;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      // console.log("result",result);
      //nếu trả về uid
        if(result.user.providerData[0].uid){
           async function checkLogin(){
            let result1=await googleRequest.LoginRequest({
              username:result.user.providerData[0].uid,
              email:result.user.email,
              emailconfirm:"true",
              firstname:" ",
              lastname:result.user.displayName,
              password:result.user.providerData[0].uid,
            })
            // console.log("result1",result1);

            if(result1.data){
                return{
                  ...result1.data
                }
            }
            
          }
          return checkLogin();
          
        }else{
          return{
            status:false,
            message:"Đăng nhập thất bại"
          }

        }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
    
  }