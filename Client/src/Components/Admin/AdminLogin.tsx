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
import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checktokenlogin from "../../functions/checkTokenlogin";
import apis from "../../apis";


export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const toast = useToast();

  const navigate = useNavigate();

  useEffect( async () => {
    if(localStorage.getItem("adminloginToken1")){
      let checktokenlogin1= await checktokenlogin.checkadmintokenlogin(localStorage.getItem("adminloginToken1"))
      console.log(checktokenlogin1,"asssssssss");
      if(checktokenlogin1?.data?.status){
window.location.href="http://localhost:3000/admin"
      }else{
        localStorage.removeItem("loginToken1")
      }
    }
  }, []);

  const onCLickSubmit = async(e) => {
    e.preventDefault();
    let loginUser={
      email,
      password
    }
    // console.log(loginUser);
    let LoginRequest1 = await apis.adminLoginRequest(loginUser)
    console.log(LoginRequest1);
    if(LoginRequest1.data.status){
      toast({
        title: LoginRequest1.data.message,
        status: "success",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      localStorage.setItem("loginToken1",LoginRequest1.data.token)
      window.location.href="http://localhost:3000/admin"
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


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to go to the Admin's page<Link color={"blue.400"}></Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
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
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onCLickSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
