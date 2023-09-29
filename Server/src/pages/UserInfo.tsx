import "./../CSS/userinfor.css"
import { useEffect, useState } from 'react';
import apis from "@/apis";
import {useToast} from "@chakra-ui/react";
import Loading from "@loading/Loading"
import Navbar from "@/Components/Home/Navbar";





export default function UserInfo() {
  let [isLoading,setIsLoading]=useState(false);
  const toast = useToast();
  const [Username,setUserName]=useState("User Name");
  const [email,setemail]=useState("demo@123.com");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [Password,setPassword]=useState("");
  const [confirm,setConfirm]=useState(false);

  console.log(Username);

  useEffect(()=>{
    async function getUserInfoRequest1(){
      let getUserResult=await apis.getUserInfoRequest(localStorage.getItem("loginToken1"));
      console.log(getUserResult);

      if(getUserResult.data?.status){
        console.log("vào đây");
        setUserName(getUserResult.data.data.username);
        setemail(getUserResult.data.data.email);
        setFirstName(getUserResult.data.data.firstname);
        setLastName(getUserResult.data.data.lastname);
        if(getUserResult.data.data.emailconfirm=="true"){
          setConfirm(false)
        }else{
          //chưa xác nhận
          setConfirm(true)
        }
      }
    }
    getUserInfoRequest1();
  },[]);

  async function changeInfo(){
    console.log("changeInfo");
    
    let data={firstname:firstName,lastname:lastName,password:Password};
    setIsLoading(true)
    let result=await apis.updateUserInfoRequest(localStorage.getItem("loginToken1"),data);
    console.log(result);
    if(result.data?.status){
      toast({
        title: result.data.message,
        status: "success",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      setIsLoading(false)
    }else{
      toast({
        title: result.data.message,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      setIsLoading(false)
    }
    // setTimeout(() => {
    //   window.location.href="http://localhost:5173/userinfo"
    // }, 3000);
  }
  async function confirmEmail(){
    setIsLoading(true)
    let result:any=await apis.updateConfirmRequest(localStorage.getItem("loginToken1"));
    console.log(result);
    if(result.data?.status){
      toast({
        title: result.data.message,
        status: "success",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      setIsLoading(false)
    }else{
      toast({
        title: result.data.message,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      setIsLoading(false)
    }

  }
  
      return (
        !isLoading?
      <>
      <Navbar></Navbar>
      {/* https://bootdey.com/snippets/view/account-setting-or-edit-profile#css */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous"></link>
      <div className="container mt-5">
  <div className="row gutters">
    <div className="col-xl-3 col-lg-3 col-md-11 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <div className="account-settings">
            <div className="user-profile">
              <div className="user-avatar text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Maxwell Admin"
                  style={{width:"80px",height:"80px",margin:"auto"}}
                />
              </div>
              <h5 className="user-name">{Username}</h5>
              <h6 className="user-email">{email}</h6>
            </div>
            <div className="about">
              <h5>About</h5>
              <p>
                Trang quản lý thông tin thành viên
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex">
              <h6 className="mb-2 text-primary d-flex">Personal Details</h6>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="fullName" className='d-flex'>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e)=>{setFirstName(e.target.value)}}
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="fullName" className='d-flex'>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter full name"
                  value={lastName}
                  onChange={(e)=>{setLastName(e.target.value)}}

                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="eMail" className='d-flex'>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="eMail"
                  placeholder="Enter email"
                  value={email}
                  disabled
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="phone" className='d-flex'>New Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Enter New Password"
                  value={Password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </div>
            </div>
          </div>
          <div className="row gutters" >
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
              <div className="text-left" >
                {confirm?<button
                  type="button"
                  id="submit"
                  name="submit"
                  className="btn btn-primary "
                  onClick={()=>confirmEmail()}
                >
                  Confirm Email
                </button>:<></>}
                
              </div>
            </div>
          </div>

          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex">
              <h6 className="mt-3 mb-2 text-primary">Address</h6>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="Street" className='d-flex'>Street</label>
                <input
                  type="name"
                  className="form-control"
                  id="Street"
                  placeholder="Enter Street"
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="ciTy" className='d-flex'>City</label>
                <input
                  type="name"
                  className="form-control"
                  id="ciTy"
                  placeholder="Enter City"
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="sTate" className='d-flex'>State</label>
                <input
                  type="text"
                  className="form-control"
                  id="sTate"
                  placeholder="Enter State"
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12 d-flex">
              <div className="form-group">
                <label htmlFor="zIp" className='d-flex'>Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="zIp"
                  placeholder="Zip Code"
                />
              </div>
            </div>
          </div>
          <div className="row gutters" >
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
              <div className="text-left" >
                <button
                  type="button"
                  id="submit"
                  name="submit"
                  className="btn btn-secondary "
                  style={{marginRight:"10px"}}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="submit"
                  name="submit"
                  className="btn btn-primary "
                  onClick={()=>{changeInfo()}}
                >
                  Update 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </>
:
<Loading></Loading>

  
  )
}
