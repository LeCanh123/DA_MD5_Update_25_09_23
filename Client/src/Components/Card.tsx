import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import "./Card.css";
import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
// import { handleAddToCart,addToCart,addToCart1} from "../redux/cartReducer/reducer";
import userCart from "@/apis/userCart";
import { getcart1 } from "../redux/cartReducer/reducer";

// const Card = ({ actualPrice, type, id, image, price, title, discount }) => {
  const Card = (props:any) => {
    const toast = useToast();
    const dispatch = useDispatch();
    // console.log("id",props);
    
//   localStorage.setItem("checkId","false")


//   let { isAuth, afterLoginUser } = useSelector((state) => state.AuthReducer);
//   const {cartItems}=useSelector((state) => state.cartReducer);
//   console.log("cartItems",cartItems);
//   const toast = useToast();
//   let el ={id:afterLoginUser.email,product:[{
//     actualPrice,
//     type,
//     image,
//     price,
//     title,
//     discount,
//     quantity: 1,
//   }]} 
// const [checkIdCartItem,setCheckIdCartItem]=useState("false")




//   ;
//   const dispatch = useDispatch();

//   useEffect(async()=>{
//     let usercart=await apis.getcart(localStorage.getItem("loginToken1"))
//     console.log("usercart",usercart);
//     if(usercart.data?.data?.length!=0){
//       dispatch(getcart(usercart.data?.data));
//     }
//   },[])



  



  const handleAddToCart= async(id:any) => {
        let addToCartResult =await userCart.addToCart(localStorage.getItem("loginToken1"),id)
        if(addToCartResult.data?.status){
          toast({
            title: "Success",
            description: addToCartResult.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        getcart1(localStorage.getItem("loginToken1"),dispatch);
        }else{
          toast({
            title: "Err",
            description: addToCartResult.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
  }




  return (
    <Box
      className="product-card"
      borderRadius={"20px"}
      width={"100%"}
      textAlign="left"
      height={"450px"}
    >
      {/* <Link to={`/${"type"}/${props.data.id}`} > */}
        <Image borderRadius={"20px"} style={{height:"300px",width:"250px",margin:"15px",marginLeft:"5%"}}  
        // src={props?.data?.productimage[0]?.image}
        src={props?.data?.productimage?.[0]?.image || props?.data}
        >
        
        </Image>
        <Flex gap={"5px"} textAlign={"center"}>
          <Heading paddingTop={"8px"} size="md">
            ${props?.data?.price}
          </Heading>
          <Text as="del" fontSize={"13px"} paddingTop={"10px"}>
          ${props?.data?.actualprice}
          </Text>
        </Flex>
        <Text paddingTop={"3px"} fontSize={"14px"}>
          {props?.data?.title}{" "}
        </Text>
      {/* </Link> */}



      <Button className="add-to-cart-btn" 
      onClick={()=>handleAddToCart(props?.data?.id)}
      >
        Add To Cart
      </Button>
    </Box>
  );
};

export default Card;
