

export default {
    
ValidateEmail:(mail:string)=> 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return {status:true}
  }
    // alert("You have entered an invalid email address!2")
    return {
        status:false,
        toast:{
            title: "Enter a Valid "+`email`,
            status: "error",
            duration: 1500,
            position: "top",
            isClosable: true,
          }
    };
},
validateUserName:(inputValue:string,nameType:string)=>{
    console.log(nameType);
var regexPattern = /^[a-zA-Z0-9]+$/;
if(regexPattern.test(inputValue)){
//   alert("UserName is Valid");
return {
    status:true
};}
else{
    return {
    status:false,
    toast:{
        title: "Enter a Valid "+`${nameType}`,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      }
};}
}
,
validateName:(inputValue:string,nameType:string)=>{
    if(!inputValue){
        return {
            status:false,
            toast:{
                title: "Enter a Valid "+`${nameType}`,
                status: "error",
                duration: 1500,
                position: "top",
                isClosable: true,
              }
        };
    }else{
        // alert('Valid name given.');
        return {
            status:true
        }
    }
},
validatePassword:(inputValue:string,nameType:string)=>{
    if(!inputValue){
        return {
            status:false,
            toast:{
                title: "Enter a Valid "+`${nameType}`,
                status: "error",
                duration: 1500,
                position: "top",
                isClosable: true,
              }
        };
    }else{
        // alert('Valid name given.');
        return {
            status:true
        }
    }
}
}