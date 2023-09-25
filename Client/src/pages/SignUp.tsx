import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Logo from "../Asssets/logo2.png";
import functions from "../functions";
import apis from "../apis";
// import { SignUpFunc } from "../redux/authReducer/action";
import { SignUpFunc } from "../redux/authReducer/reducer";
import Loading from "@loading/Loading"



import axios from "axios";
export default function Signup() {
  let [isLoading,setIsLoading]=useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
//   const [userObj, setUserObj] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  const toast = useToast();
//   const { successCreate, createError } = useSelector((state) => {
//     return {
//       successCreate: state.AuthReducer.successCreate,
//       createError: state.AuthReducer.createError,
//     };
//   }, shallowEqual);

//   useEffect(() => {
//     if (successCreate) {
//       toast({
//         title: `Account Created Successfull`,
//         status: "success",
//         duration: 1500,
//         position: "top",
//         isClosable: true,
//       });
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     }
//   }, [successCreate, toast, navigate]);

//   useEffect(() => {
//     if (createError) {
//       toast({
//         title: `Something Went Wrong !!!`,
//         status: "error",
//         duration: 1500,
//         position: "top",
//         isClosable: true,
//       });
//     }
//   }, [createError, toast]);

 async function SignupRequest() {
    let validateUserName:any=functions.validateUserName(username,"userName")
    if(validateUserName.toast){toast(validateUserName.toast)}
   let validateFirstName:any=functions.validateName(firstname,"firstName")
   if(validateFirstName.toast){toast(validateFirstName.toast)}
   let validateLastName:any=functions.validateName(lastname,"lastName")
   if(validateLastName.toast){toast(validateLastName.toast)}
   let validateEmail:any=functions.ValidateEmail(email)
   if(validateEmail.toast){toast(validateEmail.toast)}
   let validatePassword:any=functions.validatePassword(password,"password")
   if(validatePassword.toast){toast(validatePassword.toast)}
  let newUser={email,username,firstname,lastname,password}
  console.log(validateUserName);
  
  if(validateUserName.status&&validateFirstName.status&&validateLastName.status&&validateEmail.status&&validatePassword.status){
    setIsLoading(true)
   let SignupRequest1:any = await apis.SignupRequest(newUser)
   //nếu đăng kí thành công
   if(SignupRequest1.status==true){
    toast({
      title: SignupRequest1.data.message,
      status: "success",
      duration: 1500,
      position: "top",
      isClosable: true,
    });
    setIsLoading(false)
    //đăng nhập
    const handleSubmit = async(email:string,password:string) => {
      let loginUser={
        email,
        password
      }
      let LoginRequest1 = await apis.LoginRequest(loginUser)    
      if(LoginRequest1.data.status){
        // toast({
        //   title: LoginRequest1.data.message,
        //   status: "success",
        //   duration: 1500,
        //   position: "top",
        //   isClosable: true,
        // });
        localStorage.setItem("loginToken1",LoginRequest1.data.token)
        localStorage.setItem("loginName1",LoginRequest1.data.lastname)
        //sau 3s chuyển trang
          setTimeout(() => {
            window.location.href="http://localhost:5173/"
          }, 3000);
        
      }else{
        // toast({
        //   title: LoginRequest1.data.message,
        //   status: "error",
        //   duration: 1500,
        //   position: "top",
        //   isClosable: true,
        // });
  
      }
    };
    handleSubmit(username,password);
   }else if(SignupRequest1.status==false){
    // toast({
    //   title: SignupRequest1.data.response.data.message,
    //   status: "error",
    //   duration: 1500,
    //   position: "top",
    //   isClosable: true,
    // });
    setIsLoading(false)
    //nếu lỗi do mạng
   }else{
    toast({
      title: "Hệ thống bận thử lại sau",
      status: "error",
      duration: 1500,
      position: "top",
      isClosable: true,
    });
    setIsLoading(false)
   }

    setIsLoading(false)
  }
  
  }


  return (
    !isLoading?
    <Box bg={useColorModeValue("gray.50", "gray.800")}>
      <Image
        width="300px"
        height="70px"
        _hover={{ cursor: "pointer" }}
        src={Logo}
        // onClick={() => navigate("/")}
      />
      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        backgroundImage={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf92GKTYc1k5BNpApxHinSFKnIXNU9wI9rWyibtoBH_bgmWuVBg5SFKoareRSb7jBlLFo&usqp=CAU"
        }
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading
              fontSize={"4xl"}
              textAlign={"center"}
              color={"saddlebrown "}
            >
              Sign up
            </Heading>

            <Text fontSize={"lg"} color={"gray.600"}>
              Welcome to OutFit Store ✌️
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
            <FormControl id="username" isRequired>
                <FormLabel>UserName</FormLabel>
                <Input
                  type="email"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="firstame" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstname}
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastname}
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={SignupRequest}
                  loadingText="Submitting"
                  size="lg"
                  bg={"#df9018"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link color={"blue.400"} href="/login">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
    :
    <Loading></Loading>
  );
}
