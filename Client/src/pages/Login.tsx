import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getdata, loginFunction } from "../redux/authReducer/action";
// import { getdata ,loginFunction} from "../redux/authReducer/reducer";
import apis from "../apis";
// import checktokenlogin from "../functions/checkTokenlogin";

//google login
import { Googlelogin } from "@/apis/googleLogin/googleLogin";



export default function Login() {
  
const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
  const toast = useToast();
//   const navigate = useNavigate();
//   let { isAuth, userData, afterLoginUser } = useSelector(
//     (state) => {
//       return state.AuthReducer
//     }
//   );
  
//   useEffect( async () => {
//     if(localStorage.getItem("loginToken1")){
//       let checktokenlogin1= await checktokenlogin.checktokenlogin(localStorage.getItem("loginToken1"))
//       console.log(checktokenlogin1,"asssssssss");
//       if(checktokenlogin1?.data?.status){
// window.location.href="http://localhost:3000/"
//       }else{
//         localStorage.removeItem("loginToken1")
//       }
//     }
//   }, []);

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let loginUser={
      username,
      password
    }
    let LoginRequest1 = await apis.LoginRequest(loginUser)
    console.log(LoginRequest1);
    console.log(LoginRequest1.data.status);
    
    if(LoginRequest1.data.status){
      toast({
        title: LoginRequest1.data.message,
        status: "success",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      localStorage.setItem("loginToken1",LoginRequest1.data.token)
      localStorage.setItem("loginName1",LoginRequest1.data.lastname)

      window.location.href="/";
    }else{
      toast({
        title: LoginRequest1.data.message,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
     
    }
  };

  async function handleGoogleLogin(){
    
    let loginResult= await Googlelogin();
    console.log(loginResult);
    if(loginResult.status){
      toast({
        title: loginResult.message,
        status: "success",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      localStorage.setItem("loginToken1",loginResult.token)
      localStorage.setItem("loginName1",loginResult.lastname)

      // window.location.href="http://localhost:5173/"
    }else{
      toast({
        title: loginResult.message,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });

    }
  console.log("đã vào");
  
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      backgroundImage={
        "https://cdn.w600.comps.canstockphoto.com/online-shopping-flat-vector-banner-eps-vector_csp37959881.jpg"
      }
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        backgroundColor={"pink.100"}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"red.400"}>
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Link color={"brown.400"} href="/">
              features
            </Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <a href="#" onClick={()=>{handleGoogleLogin()}}>Login with Google</a>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}


