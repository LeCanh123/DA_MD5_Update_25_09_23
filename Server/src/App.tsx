import { useDispatch, useSelector } from 'react-redux';
import MainRoutes from './Components/MainRoutes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoreType } from './redux/store';
import { userAction } from './redux/userReducer/user.slice';
import {Modal} from 'antd'
import ChatBox from './Components/chatbox/ChatBox';
import "./App.css"
import { Socket, io } from "socket.io-client";


function App() {
  const dispatch = useDispatch()

  const userStore = useSelector((store: StoreType) => {
    return store.userReducer
  })
  console.log("userStoreuserStore",userStore);
  
  /* Check Token */
  useEffect(() => {
    console.log("lấy id chatffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    
    axios.post("http://127.0.0.1:3000/api/v1/users/getinfochatbox", {
      token: localStorage.getItem("loginToken1")
    })
    .then((res:any) => {
      console.log("ress",res);

      if(res.data.status) {
        dispatch(userAction.setData(res.data.data))

      }else {
        // localStorage.removeItem("loginToken1")
      }
    }).catch(err => {
      // localStorage.removeItem("loginToken1")
    })
  }, [])

  useEffect(() => {
    console.log("userStore", userStore)
  }, [userStore])

  const [openChat, setOpenChat] = useState(false);


  //tạo kết nối chatbox



  return (
    <>
<MainRoutes />
{
        openChat == false 
        ?  <button onClick={() => {
          Modal.confirm({
            content: "Mở khung chat với tài khoản của bạn?",
            onOk: () => {
              setOpenChat(true)
            }
          })
        }} style={{position: "fixed", right: "50px", bottom: "50px"}}>Open Chat</button>
        : <div style={{width: "400px", position: "fixed", right: 0, bottom: 0,zIndex:"1000000"}}>


          <div onClick={()=>setOpenChat(false)} style={{position:"relative",top:"95px",left:"-40px",textAlign:"center",display:"flex",justifyContent:"end"}}>
            <div style={{width:"80px",height:"30px",borderRadius:"3px",zIndex:"1"}} className='ChatHover'>Close Chat</div>
          </div>
          <ChatBox open={openChat}/>


        </div>
      }
    </>
  )
}

export default App
