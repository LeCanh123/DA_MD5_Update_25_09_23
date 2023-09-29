import React, { useEffect, useState } from "react";
import "./Admin.css";

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import apis from "../../apis"
import Loading from "../Loading/Loading"


const initailState = {
  image: "",
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  price: 0,
  actualPrice: 0,
  title: "",
  gender: "",
  category: "",
};

const AdminEdit = () => {
// phần này của loading khi đang gọi api///////////////////////////////////////////////////////////////////////////////////////////
let [isLoading,setIsLoading]=useState(false)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






  // phần này để render danh mục và lấy id danh mục người dùng chọn/////////////////////////////////////////////////////////////////
  const [categoryId, setSelectedId] = useState(null);      //lưu id của sản phẩm sau khi đã chọn
  console.log(categoryId);
  let [listCategory,setListCategory]=useState([])
  const [selectedSex, setSelectedSex] = useState('');      //chọn giới tính trong danh sách category
  const genders = [...new Set(listCategory.map(item => item.sex))];//lấy duy nhất các giới tính trong danh sách category
  const handleChangeGender = (event) => {                  //khi người dùng chọn các danh mục trong sex
    setSelectedSex(event.target.value);
  };
  const handleChangeId = (event) => {                      //chọn id ứng với sản phẩm
    setSelectedId(Number(event.target.value));
  };
  const filteredData = listCategory.filter(item => item.sex == selectedSex || selectedSex == '');
  //filteredData lọc các danh mục ứng với genders
  useEffect(async() => {
    let listCategory1= await apis.getCategory("")
  // console.log(listCategory1);
    if(listCategory1.status==true){
  // console.log("vào listCategory1 chưa");
      setListCategory(listCategory1.data)
    }
    }, []);
  console.log(listCategory,"listCategory");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [product, setProduct] = useState(initailState);
  const { id } = useParams();
  console.log("id",id);
  const toast = useToast();

  const handleChange = (e) => {
    let { value } = e.target;
    setProduct((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };





// đây là phần upload sản phẩm lên database////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit =async (e) => {
    e.preventDefault();
    const fileimage = document.getElementById('image00');
    const image = fileimage.files[0];
//
    const fileimage1 = document.getElementById('img1');
    const img1 = fileimage1.files[0];
//
    const fileimage2 = document.getElementById('img2');
    const img2 = fileimage2.files[0];
//
    const fileimage3 = document.getElementById('img3');
    const img3 = fileimage3.files[0];
//
    const fileimage4 = document.getElementById('img4');
    const img4 = fileimage4.files[0];
//
    const price = document.getElementById('price').value;
    const actualPrice = document.getElementById('actualPrice').value;
    const title = document.getElementById('title').value;
    // const gender = document.getElementById('gender').value;
    // const category = document.getElementById('category').value;
    


    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('img1', img1);
    formData.append('img2', img2);
    formData.append('img3', img3);
    formData.append('img4', img4);
    formData.append('price', price);
    formData.append('actualPrice', actualPrice);
    formData.append('title', title);
    // formData.append('gender', gender);
    formData.append('categoryId', categoryId);
    formData.append('id', id);

    setIsLoading(true)
    try{
      let data=await apis.admineditproduct(formData);
      console.log(data);
      setIsLoading(false)
if(data.data.status==true){
  toast({
    title: "Success",
    description: "Update Sản phẩm thành công",
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
}else{
  toast({
    title: "Err",
    description: "Update Sản phẩm thất bại",
    status: "error",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
}


    }
    catch(err){
      setIsLoading(false)
      toast({
        title: "Err",
        description: "Lỗi hệ thống",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
   

  };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    !isLoading?
    <FormControl
      enctype="multipart/form-data"
      onSubmit={handleSubmit}
      width="30%"
      h={"auto"}
      m="auto"
      border={"1px solid gainsboro"}
      mt={"20px"}
      mb={"20px"}
      gap={"20px"}
      bg={"#f7f8f7"}
    >
      <FormLabel mt={"12px"}>Image</FormLabel>
      <Input
        type="file"
        id="image00"
      />
      <FormLabel mt={"12px"}>Image1</FormLabel>
      <Input
        type="file"
        id="img1"
      />

      <FormLabel mt={"12px"}>Image2</FormLabel>
      <Input
        type="file"
        id="img2"
      />

      <FormLabel mt={"12px"}>Image3</FormLabel>
      <Input
           type="file"
           id="img3"
      />

      <FormLabel mt={"12px"}>Image4</FormLabel>
      <Input
            type="file"
            id="img4"
      />

      <FormLabel mt={"12px"}>Price</FormLabel>
      <Input
        type="number"
        id="price"
      />

      <FormLabel mt={"12px"}>Actual Price</FormLabel>
      <Input
        type="number"
        id="actualPrice"
      />

      <FormLabel mt={"12px"}>Title</FormLabel>
      <Input
        type="text"
        id="title"
      />

      <FormLabel mt={"12px"}>Gender</FormLabel>
      {/* chọn danh mục */}
      <Select
        name="gender"
        id="gender"
        placeholder="Select Gender"
        onChange={(e) => handleChangeGender(e)}
      >
        {genders.map(gender => (
          <option key={gender} value={gender}>{gender}</option>
        ))}
      </Select>

      <FormLabel mt={"12px"} mb={"10px"}>
        Category
      </FormLabel>
      {/*  */}
      <Select
        placeholder="Select Catergory"
        onChange={e=>handleChangeId(e)}
      >
      {filteredData.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </Select>



      {/* <Input type="submit"/> */}
      <Button ml={"155px"} mt={"20px"} bg={"skyblue"} onClick={handleSubmit}>
        Update Product
      </Button>
    </FormControl>
    :
    <Loading text={"Loading..."} bgColor={"#00ffe7"} width={"150px"} height={"150px"} />
  );
};
export default AdminEdit;



