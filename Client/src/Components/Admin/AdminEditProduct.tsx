import {FormControl,FormLabel,Input,Select,Button,useToast,} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import apiAdminProduct from "@/apis/adminProduct";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@justbootstrap/JustBootstrap.scss"
import Loading from "@loading/Loading"
import "./AdminManageProduct.css";
import adminProduct from "@/apis/adminProduct";
import { relative } from "path";





const initailState = {image: "",img1: "",img2: "",img3: "",img4: "",price: 0,actualPrice: 0,title: "",gender: "",category: "",};
  const AdminEdit = () => {
    const navigate = useNavigate();


    //lấy id trên thanh địa chỉ
    const { productId } = useParams();
   //lấy sản phẩm edit về
   const [IdProductUpdate, setIdProductUpdate] = useState("-1"); 
   useEffect(() => {
    async function findProductEdit(){
      let findProductEdit1:any= await adminProduct.getUpdateProduct(localStorage.getItem("loginToken1"),productId);
      console.log("findProductEdit1",findProductEdit1);
      if(findProductEdit1.data?.status){
        if(findProductEdit1?.data?.data.length!=0){
          setImageUrl(findProductEdit1?.data?.data?.[0]?.productimage?.[0].image)
        }
        setIdProductUpdate(findProductEdit1?.data?.data?.[0]?.id);
        (document.getElementById('price') as HTMLInputElement).value=findProductEdit1?.data?.data?.[0].price;
        (document.getElementById('actualPrice') as HTMLInputElement).value=findProductEdit1?.data?.data?.[0].actualprice;
        (document.getElementById('title') as HTMLInputElement).value=findProductEdit1?.data?.data?.[0].title;
      }else{
      //
      toast({
          title: "Err",
          description: findProductEdit1.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      
      }
    }
    findProductEdit()


   },[])

    
  
    async function checkAdmin(){
      let checkAdminLoginResult= await adminProduct.adminCheckLogin(localStorage.getItem("loginToken1"));
      if(checkAdminLoginResult.data?.status){
      }else{
        navigate("/")
        toast({
          title: "Err",
          description: checkAdminLoginResult.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
    // checkAdmin();
  
    let [productCategory1,setProductCategory1]:any = useState({
      none: [{ id: -1, name: 'Chưa có danh mục' }],
    });

    let   [isLoading,setIsLoading]=useState(false)
    let   [reloadCategory,setReloadCategory]=useState(1);
    const [categoryId, setSelectedId] = useState("-1");                 //lưu id của sản phẩm sau khi đã chọn
    
    const handleChangeCategoryId = (event:any) => {                           //chọn id ứng với sản phẩm
          setSelectedId(event.target.value);
        };





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
    const toast = useToast();
    const handleChange = (e:any) => {
      let { value } = e.target;
      setProduct((prev) => {
        return { ...prev, [e.target.name]: value };
      });
    };




    //update product 
    const handleUpdateProduct =async (e:any) => {
      const fileimage:any = document.getElementById('image00');
      const image = fileimage.files[0];
      const price: any = parseFloat((document.getElementById('price') as HTMLInputElement).value);
      const actualPrice: number = parseFloat((document.getElementById('actualPrice') as HTMLInputElement).value);
      const title: string = (document.getElementById('title') as HTMLInputElement).value;
      
      const formData:any = new FormData();
      formData.append('image', image);
      formData.append('price', price);
      formData.append('actualprice', actualPrice);
      formData.append('title', title);
      formData.append('categoryId', categoryId);
      formData.append('productId', productId);
      formData.append('token', localStorage.getItem("loginToken1"));

      setIsLoading(true)
      try{
        let data:any=await apiAdminProduct.updateProduct(formData);
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


    //hiển thị ảnh cạnh update
    const [imageUrl, setImageUrl] = useState('');
    const handleImageChange = (event:any) => {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    };



    return (
      !isLoading?
      <>


    
      <AdminNavbar></AdminNavbar>
     
      <div className="row d-flex justify-content-center" style={{width:"80%",marginLeft:"15%",top:"50px",position:"relative"}}>

 
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
            <div style={{backgroundColor:"#6699FF",fontSize:"20px",color:"white"}}>Update Product</div>
            <form 
            encType="multipart/form-data"
            onSubmit={e=>{
              e.preventDefault();
              handleUpdateProduct("")}}
            >
            <FormLabel mt={"12px"} style={{color:"black"}}>Image</FormLabel>
            <Input
              type="file"
              id="image00"
              style={{color:"black"}}
              onChange={handleImageChange}
            />
            <img src={imageUrl} style={{width:"200px",height:"200px",position:"relative",borderRadius:"5px"}}></img>



            <FormLabel mt={"12px"} style={{color:"black"}}>Price</FormLabel>
            <Input
              type="number"
              id="price"
            />
    
            <FormLabel mt={"12px"} style={{color:"black"}}>Actual Price</FormLabel>
            <Input
              type="number"
              id="actualPrice"
            />
    
            <FormLabel mt={"12px"} style={{color:"black"}}>Title</FormLabel>
            <Input
              type="text"
              id="title"
            />
    
          <FormLabel mt={"12px"} style={{color:"black"}}>Gender</FormLabel>
          <Select
            name="gender"
            id="gender"
            placeholder="Select Gender"
            onChange={(e) => handleChangeGender(e)}
            style={{color:"black"}}
          >
            {Object.keys(productCategory1).map(category => (
              <option key={category} value={category}>{category} </option>
            ))}
          </Select>
          <FormLabel mt={"12px"} mb={"10px"} style={{color:"black"}}>
            Category
          </FormLabel>
          <Select
            placeholder="Select Category"
            onChange={handleChangeCategoryId}
            style={{color:"black"}}
          >
            {productCategory1[selectedSex]?productCategory1[selectedSex].map((item: { id: any; name: string }) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            )):
            <option key={"none"} value={"none"}>{"none"}</option>
            }
          </Select>
    
            {/* <Input type="submit"/> */}
            <Button ml={"155px"} mt={"20px"} bg={"skyblue"}  style={{margin:"auto",marginTop:"10px"}} type="submit"> 
              Update Product
            </Button>
            </form>
            
          </FormControl>
            </div>
  

      </div>
      </>
      
      :
      <Loading text={"Loading..."} bgColor={"#00ffe7"} width={"150px"} height={"150px"} />
    );
  };

  export default AdminEdit;



