import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Text,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import apis from "../apis";
import { getcart } from "../redux/cartReducer/reducer";
import userCart from "@/apis/userCart";

//redux
import { getcart1 } from "../redux/cartReducer/reducer";
import { useDispatch, useSelector } from "react-redux";
//loading
import Loading from "@loading/Loading"










export const Cart = () => {
  const navigate = useNavigate();
  let [isLoading,setIsLoading]=useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  let [islogin,setIsLogin]=useState(false)


//   let { isAuth, afterLoginUser } = useSelector((state) => state.AuthReducer);
//   let [checkItem,setCheckItem]=useState("")
//   const navigate = useNavigate();
//   const toast = useToast();
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((store) => {
//     return store.cartReducer
//   })


// console.log(cartItems,"cartItems");

//   const cartItems1=useSelector((store) => {
//     return store.cartReducer
//   })




//   useEffect(async()=>{
//     let usercart=await apis.getcart(localStorage.getItem("loginToken1"))
//     console.log("usercart",usercart);
//     if(usercart.data?.data?.length!=0){
//       dispatch(getcart(usercart.data.data));
//     }
//   },[])

 
//   let saved = 0;
//   const getData = () => {
//     axios
//       .get(process.env.REACT_APP_HOST+`cart1`)
//       .then((res) => {
//         // dispatch(addToCart1(res.data));
//         res.data.forEach(element => {
//           if(element.id==afterLoginUser.email){
//             dispatch(addToCart(element.product));
//           }
//         });;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };




//   const handleDelete = async(id) => {
//     // localStorage.getItem("loginToken1")
//     // dispatch(handleRemove(cartItems,e,afterLoginUser.email));
//     let deleteproduct1=await apis.deleteproduct(localStorage.getItem("loginToken1"),id)
//     console.log("deleteproduct1",deleteproduct1);
// if(deleteproduct1.data.status==true){
//   let usercart=await apis.getcart(localStorage.getItem("loginToken1"))
//   console.log("usercart",usercart);
//   if(usercart.data?.data?.length!=0){
//     dispatch(getcart(usercart.data.data));
//   }
//   toast({
//     title: "Removed from cart",
//     description: "Deleted from Cart",
//     status: "success",
//     position: "top",
//     duration: 1000,
//     isClosable: true,
//   });
// }else{
//   window.location.href="http://localhost:3000/"
// }


//   };

//   const handleINC = async(token,id, type) => {
// if(token){
// let increaseproduct=await apis.increaseproduct({token,id,type})
// console.log("increaseproduct",increaseproduct);
// if(increaseproduct.status==200){
//   // window.location.href="http://localhost:3000/cart"
//   // setCheckItem(Date.now())
//   let usercart=await apis.getcart(localStorage.getItem("loginToken1"))
//   console.log("usercart",usercart);
//   if(usercart.data?.data?.length!=0){
//     dispatch(getcart(usercart.data.data));
//   }

  
// }else{
//   toast({
//     title: "Lỗi",
//     description: "Err",
//     status: "error",
//     position: "top",
//     duration: 1000,
//     isClosable: true,
//   });
// }

// }else{
//   toast({
//     title: "Chưa đăng nhập",
//     description: "Err",
//     status: "error",
//     position: "top",
//     duration: 1000,
//     isClosable: true,
//   });
// }

//   };

//   const handleDEC = (id, VAL) => {
//     let newCartItem=cartItems.map((item,ind)=>{
// if(ind!=VAL){
//   return item
// }else{
//   return {...item,quantity:item.quantity-1}
// }
//     })
//     axios
//       .put(process.env.REACT_APP_HOST+`cart1/`+afterLoginUser.email, {
//        id:afterLoginUser.email,product:[...newCartItem]
//       })
//       .then((res) => {
//         dispatch(incrementQuantity(res.data));
//         // getData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };



  const { cartItems } = useSelector((store:any) => {
    return store.cartReducer;
  });
  console.log(cartItems);

  const getTotalPrice = () => {
    return cartItems.reduce((total:any, e:any) => {
    console.log(e.quantity);
      return total + e.products.price * e.quantity}, 0);
  };


  useEffect(() => {
    async function getCart(){
      getcart1(localStorage.getItem("loginToken1"),dispatch);
      if(localStorage.getItem("loginToken1")){
        setIsLogin(true);
      }
    }
    getCart();
  }, []);

  async function handleDelete(id:any){
    setIsLoading(true)
    let deleteProductResult=await userCart.deleteProduct(localStorage.getItem("loginToken1"),id);
    console.log(deleteProductResult);
    if(deleteProductResult.data?.status){
      toast({
        title: "Success",
        description: deleteProductResult.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      getcart1(localStorage.getItem("loginToken1"),dispatch);
      setIsLoading(false)
    }else{
      toast({
        title: "Err",
        description: deleteProductResult.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false)
    }

  }

  async function handleChangeQuantity(id:any,type:any){
    // setIsLoading(true)
    let changeQuantityResult=await userCart.changeQuantity(localStorage.getItem("loginToken1"),id,type);
    if(changeQuantityResult.data?.status){
      toast({
        title: "Success",
        description: changeQuantityResult.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      getcart1(localStorage.getItem("loginToken1"),dispatch);
      // setIsLoading(false)
    }else{
      toast({
        title: "Err",
        description: changeQuantityResult.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false)
    }


  }





let saved:any =0;
  return (
    !isLoading?
    islogin?
    <>
      <Navbar />
      <Box width="100%">
        <Text
          fontSize={"24px"}
          textAlign={"left"}
          fontWeight={300}
          borderBottom={"1px solid #e8e8e8"}
          pb={"6px"}
        >
          YOUR BASKET
        </Text>
        <TableContainer width="99%">
          <Table variant="simple">
            <Thead width="99%">
              <Tr
                bg={"#555555"}
                color={"white"}
                justifyContent={"space-between"}
              >
                <Th color={"white"}>ITEM DESCRIPTION</Th>
                <Th color={"white"}>UNIT PRICE</Th>
                <Th color={"white"}>QUANTITY</Th>
                <Th color={"white"}>SUBTOTAL</Th>
                <Th color={"#555555"}>......</Th>
                <Th color={"black"} bg={"#c6cc74"}>
                  Saving
                </Th>
              </Tr>
            </Thead>

            {cartItems.length === 0 ? (
              <Heading
                padding={"100px"}
                alignItems={"center"}
                margin={"auto"}
                textAlign={"center"}
              >
                Your Basket Is Empty
              </Heading>
            ) : (
              <Tbody>
                {cartItems?.map((e:any,ins:any) => {
                  {
                    saved =
                      saved +
                      (Math.floor(e.products.actualprice) -
                        Math.floor(e.products.price )) *
                        e.quantity;
                  }
                  return (
                    <Tr
                      key={e.id}
                      fontSize={"12px"}
                      justifyContent={"space-between"}
                    >
                      <Td fontSize={"12px"}>
                        {" "}
                        <Image
                          width={"100px"}
                          height={"100px"}
                          src={e.products.productimage[0]?.image}
                          alt="Dan Abramov"
                        />
                        {e.brand}
                        <br></br>
                        {e.products.title}
                      </Td>
                      <Td>
                        <Text>Original Price</Text>
                        <span style={{textDecoration:"line-through"}}>
                          $ {Math.floor(e.products.actualprice)}
                        </span>
                        <br></br>
                        <Text>Discounted Price</Text>
                        $ {Math.floor(( e.products.price))}
                        <br></br>
                      </Td>
                      <Td>
                        <Button
                          isDisabled={e.quantity === 1}
                          variant={"outline"}
                          m={"2px"}
                          onClick={() => handleChangeQuantity(e.products.id, "decrease")}
                        >
                          -
                        </Button>
                        <Button variant={"outline"} m={"2px"}>
                          {e.quantity}
                        </Button>
                        <Button
                          variant={"outline"}
                          m={"2px"}
                          onClick={() => handleChangeQuantity(e.products.id, "increase")}
                        >
                          +
                        </Button>
                      </Td>
                      <Td>
                        ${" "}
                        {Math.floor(e.products.price*
                          e.quantity)}
                      </Td>
                      <Td>
                        {/* <CloseIcon onClick={() => handleDelete(e.id)} /> */}
                        <CloseIcon  onClick={() => handleDelete(e.id)}/>
                      </Td>
                      <Td>
                        {" "}
                        ${" "}
                        {Math.floor(e.products.actualprice - e.products.price)
                         * e.quantity}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        <Flex justifyContent={"space-between"} mt={8}>
          {/* <Box width={"45%"}>
              <Button variant={"outline"} float={"left"} onClick={handleEmpty}>
                Empty Basket
              </Button>
            </Box> */}
          <Box width={"45%"} border="1px solid #e8e8e8 ">
            <Flex
              justifyContent={"space-between"}
              p="1rem"
              textAlign={"left"}
              fontSize="14px"
              fontWeight={400}
            >
              <Box>
                <Text>SubTotal</Text>
                <Text>Delivery Charges</Text>
              </Box>
              <Box>
                <Text>$ {getTotalPrice()}</Text>
                <Text>***</Text>
              </Box>
              <Box borderLeft={"1px solid #e8e8e8"} color="red" pl="2px">
                <Text>You saved!</Text>
                <Text>$ {Math.floor(saved)}</Text>
              </Box>
            </Flex>
            <Flex
              textAlign={"left"}
              border={"1px solid #e8e8e8"}
              padding="2rem"
              justify={"space-around"}
            >
              <Heading as={"h6"} fontWeight="250">
                TOTAL{" "}
              </Heading>
              <Heading as={"h6"} fontWeight="250">
                {" "}
                {/* $ {getTotalPrice() - saved} */}
              </Heading>
            </Flex>
            <Box float={"right"}>
              <Button
                variant={"outline"}
                onClick={() => {
                  if (cartItems.length !== 0) {
                    navigate('/checkout')
                    // ;="http://localhost:5173/checkout";
                  } else {
                    // toast({
                    //   title: "Cart is Empty.",
                    //   description: "Please add some products.",
                    //   status: "error",
                    //   duration: 2000,
                    //   isClosable: true,
                    //   position: "top",
                    // });
                    // navigate("http://localhost:3000/");
                  }
                }}
              >
                {" "}
                CheckOut
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
    :
    <>
    <Navbar />
    <Box width="100%">
      <Text
        fontSize={"24px"}
        textAlign={"left"}
        fontWeight={300}
        borderBottom={"1px solid #e8e8e8"}
        pb={"6px"}
      >
      Login To View Cart
      </Text>
      </Box>
    </>
    :
    <Loading/>
  );
};
