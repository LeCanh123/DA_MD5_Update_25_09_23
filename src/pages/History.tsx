import React, { useEffect, useState } from 'react'
import "./../CSS/JustBootstrap.scss"
import "./../CSS/History.scss"
import Navbar from '@/Components/Home/Navbar'
import userPurchase from '@/apis/userPurchase'
import {useToast} from "@chakra-ui/react";

export default function History() {
    const toast = useToast();
    let [purchaHistory,setPurchaHistory]=useState([])
    useEffect(()=>{
        async function getHistory(){
            let getHistoryResult= await userPurchase.getHistoryOrder(localStorage.getItem("loginToken1"));
            console.log("getHistoryResult",getHistoryResult);
            if(getHistoryResult.data?.status){
                // toast({
                //   title: "Success",
                //   description: getHistoryResult.data.message,
                //   status: "success",
                //   duration: 2000,
                //   isClosable: true,
                //   position: "top",
                // });
                setPurchaHistory(getHistoryResult.data.data)
              }else{
                toast({
                  title: "Err",
                  description: getHistoryResult.data.message,
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                  position: "top",
                });
              }
        }
        getHistory()

    },[])
  return (
    <>
    <Navbar></Navbar>
    {purchaHistory.map((e:any)=>
    {
    const totalSum = e.carts?.reduce((accumulator:any, e2:any) => {
      const productTotal = e2.products?.price * e2.quantity;
      return accumulator + productTotal;
    }, 0);
    
    return <>
    <section className="vh-100" style={{ backgroundColor: "#8c9eff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100" style={{overflow:"scroll"}}>
            <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
              {e.carts?.map((e2:any)=>
              <>
               <tr>
               <td  style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                <img src={e2.products?.productimage[0]?.image} style={{width:"100px",height:"100px"}}></img>
                </td>
               <td>{e2.products?.title}</td>
               <td>{e2.products?.price}$</td>
               <td>{e2.quantity}</td>
             </tr>
             <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Total: {totalSum}$</td>
              <td>&nbsp;</td>
             </tr>
             </>
              )}
            </table>
      
            <div className="col-12">
              <div
                className="card card-stepper text-black"
                style={{ borderRadius: 16 }}
              >
                <div className="card-body p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <h5 className="mb-0">
                        INVOICE{" "}
                        <span className="text-primary font-weight-bold">
                          #Y34XDHR
                        </span>
                      </h5>
                    </div>
                    <div className="text-end">
                      <p className="mb-0">
                        Expected Arrival <span>01/12/23</span>
                      </p>
                      <p className="mb-0">
                        USPS{" "}
                        <span className="font-weight-bold">
                          234094567242423422898
                        </span>
                      </p>
                    </div>
                  </div>
                  <ul
                    id="progressbar-2"
                    className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                  >
                    <li className="step0 active text-center" id="step1" />
                    <li className="step0 active text-center" id="step2" />
                    <li className="step0 active text-center" id="step3" />
                    <li className="step0 text-muted text-end" id="step4" />
                  </ul>
                  <div className="d-flex justify-content-between">
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Processed</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-box-open fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Shipped</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-shipping-fast fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">En Route</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0" />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Arrived</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>




    </section>
    </>
    
    }
    
    
    )}

    </>


  )
}
