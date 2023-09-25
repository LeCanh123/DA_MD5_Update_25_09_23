import {FormControl,FormLabel,Input,Select,Button,useToast,} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import apiAdminProduct from "@/apis/adminProduct";
import { Link, useParams } from "react-router-dom";
import "@justbootstrap/JustBootstrap.scss"
import Loading from "@loading/Loading"
import "./AdminManageProduct.css";
//
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits, MdOutlineAddCircleOutline } from "react-icons/md";




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
    let [productCategory1,setProductCategory1]:any = useState({
      none: [{ id: -1, name: 'Chưa có danh mục' }],
    });

    let   [isLoading,setIsLoading]=useState(false)
    let   [reloadCategory,setReloadCategory]=useState(1);
    let   [listCategory,setListCategory]=useState([{sex:"",id:-1,name:"1"}])
    const [categoryId, setSelectedId] = useState("-1");                 //lưu id của sản phẩm sau khi đã chọn
    console.log("categoryId",categoryId);
    
    const handleChangeCategoryId = (event:any) => {                           //chọn id ứng với sản phẩm
          setSelectedId(event.target.value);
        };

      //useeffect getcategory
      useEffect(() => {
          async function getCategory1(){
          let listCategory1:any= await apiAdminProduct.getCategory(String(localStorage.getItem("loginToken1")));
          
            if(listCategory1.status==true){
              setListCategory(listCategory1.data)
            }
          }
          getCategory1()
      }, [reloadCategory]);

      //useeffect deletecategory
      let [listdeleteCategory,setdeleteListCategory]=useState([{sex:"Chưa có Danh Mục",id:-1,name:"Chưa có Danh Mục"}]);
      useEffect(() => {
        async function getCategory2(){
          let listCategory1:any= await apiAdminProduct.getCategory(String(localStorage.getItem("loginToken1")));
            if(listCategory1.data?.status){
          setdeleteListCategory(listCategory1.data.data)
            }
        }
        getCategory2()
      }, [reloadCategory]);

      //useeffect product getcategory
      const [selectedSex, setSelectedSex] = useState('none');    
      
      
      
      const handleChangeGender = (event:any) => {                       
        setSelectedSex(event.target.value);};
      useEffect(() => {
        async function productGetCategory(){
        let listCategory2:any= await apiAdminProduct.productGetCategory(localStorage.getItem("loginToken1"));
          if(listCategory2.status){
            setProductCategory1(listCategory2.data?.data)
          }
        }
        productGetCategory()
      }, [reloadCategory]);

    const [product, setProduct] = useState(initailState);
    const { id } = useParams();
    const toast = useToast();
    const handleChange = (e:any) => {
      let { value } = e.target;
      setProduct((prev) => {
        return { ...prev, [e.target.name]: value };
      });
    };




    //product 
    const handleAddProduct =async (e:any) => {
      const fileimage:any = document.getElementById('image00');
      const image = fileimage.files[0];
  // //
  //     const fileimage1:any = document.getElementById('img1');
  //     const img1 = fileimage1.files[0];
  // //
  //     const fileimage2:any = document.getElementById('img2');
  //     const img2 = fileimage2.files[0];
  // //
  //     const fileimage3:any = document.getElementById('img3');
  //     const img3 = fileimage3.files[0];
  // //
  //     const fileimage4:any = document.getElementById('img4');
  //     const img4 = fileimage4.files[0];
  //
      const price: any = parseFloat((document.getElementById('price') as HTMLInputElement).value);
      const actualPrice: number = parseFloat((document.getElementById('actualPrice') as HTMLInputElement).value);
      const title: string = (document.getElementById('title') as HTMLInputElement).value;
      // const gender = document.getElementById('gender').value;
      // const category = document.getElementById('category').value;
      
      const formData:any = new FormData();
      formData.append('image', image);
      // formData.append('img1', img1);
      // formData.append('img2', img2);
      // formData.append('img3', img3);
      // formData.append('img4', img4);
      formData.append('price', price);
      formData.append('actualprice', actualPrice);
      formData.append('title', title);
      // formData.append('gender', gender);
      formData.append('categoryId', categoryId);
      formData.append('token', localStorage.getItem("loginToken1"));
      // formData.append('id', id);

      setIsLoading(true)
      try{
        let data:any=await apiAdminProduct.addProduct(formData);
        // console.log("data 126 ",data);
        
        setIsLoading(false)
        if(data.data.status){
          toast({
            title: "Success",
            description: data.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }else{
          toast({
            title: "Err",
            description: data.data.message,
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
    //category
    const handleAddCategory =async (e:any) => {
      // e.preventDefault()
      const sex:any = (document.getElementById('categoryType1')as HTMLInputElement).value;
      const name:any = (document.getElementById('categoryName1')as HTMLInputElement).value;
      setIsLoading(true)
      let addCategoryResult:any=await apiAdminProduct.addCategory(String(localStorage.getItem("loginToken1")),{name,sex});
      console.log("addCategoryResult",addCategoryResult);


      if(addCategoryResult.data?.status){
        setReloadCategory(Math.random()*1000);
        toast({
          title: "Success",
          description: addCategoryResult.data?.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false)
      }else{
        toast({
          title: "Err",
          description: addCategoryResult.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false)
      }
      
    }
    const [deleteCategoryId, setDeleteCategoryId] = useState(-1);
    const handleChangedeleteId = (event:any) => {                    
              setDeleteCategoryId(Number(event.target.value));};
    const handleDeleteCategory =async (e:any) => {
              // e.preventDefault();
              setIsLoading(true)
              let deleteCategoryResult:any=await apiAdminProduct.deleteCategory(localStorage.getItem("loginToken1"),deleteCategoryId);
              if(deleteCategoryResult.data?.status){
                toast({
                  title: "Success",
                  description: deleteCategoryResult.data.message,
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                  position: "top",
                });
                setIsLoading(false)
              }else{
                toast({
                  title: "Err",
                  description: deleteCategoryResult.data.message,
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                  position: "top",
                });
                setIsLoading(false)
              }
              
              setReloadCategory(Math.random()*1000);
    }

    //change component
    let   [component1,setComponent1]=useState(true)
    let   [component2,setComponent2]=useState(false)
    let   [component3,setComponent3]=useState(false)
    console.log("component1",component1);
    console.log("component2",component2);
    
    function changecomponent(e:any){
      if(e==1){setComponent1(true);setComponent2(false);setComponent3(false);}
      if(e==2){setComponent2(true);setComponent1(false);setComponent3(false);}
      if(e==3){setComponent1(false);setComponent2(false);setComponent3(true);}

    }
    return (
      !isLoading?
      <>
       <div className="AdminSideBar" style={{zIndex:1000}}>
      <ul className="SidebarList" style={{zIndex:1000}}>
    
            <div  key={1} onClick={()=>changecomponent(1)} style={{backgroundColor:"red"}}>
              <li className="row" >
                <div className="icon" style={{position:"relative",top:"30px"}}>{<MdOutlineProductionQuantityLimits />}</div>
                <div className="title" >{"Manage Category"}</div>
              </li>
            </div>

            <div  key={2} onClick={()=>changecomponent(2)}>
              <li className="row" >
                <div className="icon" style={{position:"relative",top:"30px"}}>{<MdOutlineAddCircleOutline />}</div>
                <div className="title" onClick={()=>changecomponent(2)}>{"Add Product"}</div>
              </li>
            </div>

            <div  key={3} onClick={()=>changecomponent(3)} style={{display:"none"}}>
              <li className="row" >
                <div className="icon">{<BsGraphUpArrow />}</div>
                <div className="title">{"Add Product"}</div>
              </li>
            </div>
    
      </ul>
    </div>

    
      <AdminNavbar></AdminNavbar>
     
      <div className="row d-flex justify-content-center" style={{width:"80%",marginLeft:"15%",top:"50px",position:"relative"}}>
      {component1?
          <div className="col-12 col-md-12">
        
          <FormControl
            // encType="multipart/form-data"
            onSubmit={e=>{
              e.preventDefault();
              handleAddCategory("")}}
            width="80%"
            h={"auto"}
            m="auto"
            border={"1px solid gainsboro"}
            mt={"20px"}
            mb={"20px"}
            gap={"20px"}
            bg={"#f7f8f7"}
            style={{padding:"10px"}}
          >
            <div style={{backgroundColor:"#FFCCFF",fontSize:"20px",color:"black"}}>Add Category</div>
            <form encType="multipart/form-data">
    
            <FormLabel mt={"12px"}>Type (man,women...)</FormLabel>
            <Input
              type="text"
              id="categoryType1"
            />
    
            <FormLabel mt={"12px"}>Category Name</FormLabel>
            <Input
              type="text"
              id="categoryName1"
            />
    
            {/* <Input type="submit"/> */}
            <Button ml={"155px"} mt={"20px"} bg={"skyblue"} type="submit" style={{margin:"auto"}}>
              Add Category
            </Button>
            </form>
            
          </FormControl>
    
          <FormControl
            onSubmit={e=>{
              e.preventDefault();
              handleDeleteCategory("")}}
            width="80%"
            h={"auto"}
            m="auto"
            border={"1px solid gainsboro"}
            mt={"100px"}
            mb={"20px"}
            gap={"20px"}
            bg={"#f7f8f7"}
            style={{padding:"10px"}}
    
          >
            <div style={{backgroundColor:"#FFCCFF",fontSize:"20px",color:"black"}}>Delete Category</div>
            <form encType="multipart/form-data">
            
            <Select
              // placeholder="Select Catergory"
              onChange={e=>handleChangedeleteId(e)}
              style={{marginTop:"30px"}}
              // defaultValue={-1}
            >
            {listdeleteCategory.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Select>
    
          
    
    
    
            {/* <Input type="submit"/> */}
            <Button ml={"155px"} mt={"20px"} bg={"skyblue"} type="submit" style={{margin:"auto",marginTop:"10"}}>
              Delete Category
            </Button>
            </form>
            
          </FormControl>
          </div>
          :
          <></>  
    }
    {component2?
          <div className="col-12 col-md-12" >
          <FormControl
            // encType="multipart/form-data"
            // onSubmit={handleAddProduct}
            width="80%"
            h={"auto"}
            m="auto"
            border={"1px solid gainsboro"}
            mt={"20px"}
            mb={"20px"}
            gap={"20px"}
            bg={"#f7f8f7"}
            style={{padding:"10px"}}
    
          >
            <div style={{backgroundColor:"#FFCCFF",fontSize:"20px",color:"black"}}>Add Product</div>
            <form 
            encType="multipart/form-data"
            onSubmit={e=>{
              e.preventDefault();
              handleAddProduct("")}}
            >
            <FormLabel mt={"12px"}>Image</FormLabel>
            <Input
              type="file"
              id="image00"
            />
            {/* <FormLabel mt={"12px"}>Image1</FormLabel>
            <Input
              type="file"
              id="img1"
            /> */}
    
            {/* <FormLabel mt={"12px"}>Image2</FormLabel>
            <Input
              type="file"
              id="img2"
            /> */}
    
            {/* <FormLabel mt={"12px"}>Image3</FormLabel>
            <Input
                type="file"
                id="img3"
            /> */}
    
            {/* <FormLabel mt={"12px"}>Image4</FormLabel>
            <Input
                  type="file"
                  id="img4"
            /> */}
    
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
          <Select
            name="gender"
            id="gender"
            placeholder="Select Gender"
            onChange={(e) => handleChangeGender(e)}
          >
            {Object.keys(productCategory1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <FormLabel mt={"12px"} mb={"10px"}>
            Category
          </FormLabel>
          <Select
            placeholder="Select Category"
            onChange={handleChangeCategoryId}
          >
            {productCategory1[selectedSex]?productCategory1[selectedSex].map((item: { id: any; name: string }) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            )):
            <option key={"none"} value={"none"}>{"none"}</option>
            }
          </Select>
    
            {/* <Input type="submit"/> */}
            <Button ml={"155px"} mt={"20px"} bg={"skyblue"}  style={{margin:"auto"}} type="submit"> 
              Add Product
            </Button>
            </form>
            
          </FormControl>
            </div>
            :
            <></>  
    }

      </div>
      </>
      
      :
      <Loading text={"Loading..."} bgColor={"#00ffe7"} width={"150px"} height={"150px"} />
    );
  };

  export default AdminEdit;



