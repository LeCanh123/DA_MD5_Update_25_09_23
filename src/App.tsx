import { useDispatch, useSelector } from 'react-redux';
import MainRoutes from './Components/MainRoutes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoreType } from './redux/store';
import { userAction } from './redux/userReducer/user.slice';
import {Modal} from 'antd'
import ChatBox from './Components/chatbox/ChatBox';


function App() {
  const dispatch = useDispatch()

  const userStore = useSelector((store: StoreType) => {
    return store.userReducer
  })
  
  /* Check Token */
  useEffect(() => {
    axios.post("http://127.0.0.1:3000/api/v1/authentication", {
      token: localStorage.getItem("loginToken1")
    })
    .then(res => {
      if(res.status == 200) {
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
        : <div style={{width: "400px", position: "fixed", right: 0, bottom: 0}}>
                
          <ChatBox open={openChat}/>
          <h5  onClick={(e)=>{e.preventDefault();setOpenChat(false)}}>Close</h5>
        </div>
      }
    </>
  )
}

export default App
