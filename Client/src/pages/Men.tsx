import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
// import { getmens } from "../redux/MenReducer/action";


import { Box, Grid, Progress, Spinner, Text } from "@chakra-ui/react";
import Card from "../Components/Card";
import Pagination1 from "../Components/Filter/Pagination1";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import Menfilter from "../Components/Filter/Menfilter";




//lấy data men
import { fetchMensData,getCategory,sortbyprice,getProductByCategory } from "../redux/MenReducer/reducer";
import { getcart1 } from "../redux/cartReducer/reducer";

export const Men = () => {

  //params
  const [searchParams, setSearchParams]:any = useSearchParams();
  const intialOrder = searchParams.get("order");
  const initialCategory = searchParams.getAll("category");
  const intialPage = searchParams.get("page");
  

  
  useEffect(()=> {
    console.log("vào đây ròi searchParams");
    
    let sortProduct=sortbyprice({genderType:"men",sortType:intialOrder},dispatch);
    let getcategory1:any=getCategory({token:localStorage.getItem("loginToken1")},dispatch)
    console.log(initialCategory.length,"initialCategory.length");
    
    if(initialCategory.length!=0){
      let getProductByCategory2=getProductByCategory({token:localStorage.getItem("loginToken1"),
        listCategory:initialCategory,
        skip:0,
        take:import.meta.env.VITE_ITEM_PER_PAGE
        },dispatch)
    }else{
      // let menproduct=fetchMensData("",dispatch);
    }
  }, [searchParams]);




//lấy data men
  const dispatch = useDispatch();
  useEffect(()=> {
    let menproduct=fetchMensData({skip:0,take:import.meta.env.VITE_ITEM_PER_PAGE},dispatch);
    // getcart1(localStorage.getItem("loginToken1"),dispatch);
  }, []);
  const { men } = useSelector((store:any) => {
    return store.MenReducer;
  });

//phân trang
  const itemsPerPage = import.meta.env.VITE_ITEM_PER_PAGE;
  const currentPage = parseInt(searchParams.get('page')) || 1;
  // let getPaginatedProducts:any="";


  useEffect(()=>{
    console.log("vào đây ròi currentPage");

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    //nếu không có category
    // console.log("initialCategory.length",initialCategory.length);
    const initialCategory1 = searchParams.getAll("category");
    const intialOrder1 = searchParams.get("order");
    
    if(initialCategory1.length!=0){
      
      let getProductByCategory2=getProductByCategory({token:localStorage.getItem("loginToken1"),
      listCategory:initialCategory,
      skip:startIndex,
      take:import.meta.env.VITE_ITEM_PER_PAGE,
      sortby:intialOrder1
      },dispatch)
    // let menproduct= fetchMensData({skip:startIndex,take:import.meta.env.VITE_ITEM_PER_PAGE},dispatch);

    }else{
      let menproduct= fetchMensData({skip:startIndex,take:import.meta.env.VITE_ITEM_PER_PAGE,sortby:intialOrder1},dispatch);

    }

  },[currentPage])

  //  getPaginatedProducts =  () => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   console.log("startIndex",startIndex);
  //   console.log("endIndex",endIndex);
    
  //   let menproduct= fetchMensData({skip:startIndex,take:endIndex},dispatch);

  // return men
  // }

  



// console.log("getPaginatedProducts",getPaginatedProducts);

let getPaginatedProducts =men


  return (
    <div>
      <Navbar />
      <Box>
        <Progress
          colorScheme="pink"
          hasStripe
          height="42px"
          value={100}
          isAnimated
        />
        <Text
          color={"white"}
          fontSize={{ base: "80%", sm: "100%", lg: "100%" }}
          position="absolute"
          top={{ base: "117px", sm: "115px", md: "142px", lg: "85px" }}
          left={{ base: "5%", sm: "27%", md: "30%", lg: "40%" }}
        >
          New arrivals in menswear upto 30% off ❤️
        </Text>
      </Box>
      <Menfilter type={"men"} />
      {false ? (
        <Box
          textAlign={"center"}
          width={"100%"}
          height={"400px"}
          paddingTop="150px"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : false ? (
        "Something went wrong"
      ) : (
        <Grid
          width={"80%"}
          margin={"auto"}
          justifyContent="space-between"
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          }}
          columnGap="20px"
        >
          {/* {getPaginatedProducts(sortbycanh).length > 0 &&
            getPaginatedProducts(sortbycanh).map((el) => {
              return <Card key={el.id} {...el} id={el.id} type={"men"} />;
            })} */}

                  {
            getPaginatedProducts?.map((el: any) => {
              return <Card data={el} canh={"002"}/>;
            })
            
            }



        </Grid>
      )}
      <Pagination1 />
      <Box mt={"30px"}>
        <Footer />
      </Box>
    </div>
  );
};
