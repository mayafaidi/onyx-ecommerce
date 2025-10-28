import { CircularProgress, Button,Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AxiosIntanse from '../../AxiosIntanse';
import ResponsiveAppBar from '../../component/navbar/MenuAppBar';


export default function Cart() {
//لازم انشا عشان اخزن الداتا 
const [cartitem,setcartitem]=useState([]);//data
const [isLoading, setIsLoading] = useState(true);

const getcart=async()=>{
try{
 const response = await AxiosIntanse.get("/Customer/Carts");
//  console.log(response);
 setcartitem(response.data.items);//صح بدي اخزن بيانات داتا حكينا 

}
catch(error){
console.log("Error fetching cart:", error);
 } finally {
    setIsLoading(false);
  }





};
const removeitem =async(productId)=>{
try{
const response = await AxiosIntanse.delete(`/Customer/Carts/${productId}`);
//تمام api وبعدها دحدث صفحة بدون ما اعمل ريفريش كيف
const updatedCart = cartitem.filter((item) => item.productId !== productId);
///يعني عشان احذف المنتج بدون مااعمل ريفريش بعمل فلتلر
setcartitem(updatedCart);//بحدث الصفحة فالمنتج بختفي من الشاشة 
}
catch(error){
console.log("error",error);
}





};
const clearcart =async()=>{
try{
  const response = await AxiosIntanse.delete ("/Customer/Carts/clear");
  //عشان احدث الصفحة
setcartitem([]);


}
catch(error){
  console.log(" clearing cart:", error);
}






};

const increaceqty =async(productId)=>{
try{
const response = await AxiosIntanse.post(`/Customer/Carts/increment/${productId}`);
//رح نمشي على كل عناصر ازا كان هاد المنتج لبدنا ياه بنزيددو
const updatedCart = cartitem.map((item) =>
        item.productId === productId
          ? { ...item, count: item.count + 1, totalPrice: item.totalPrice + item.price }
          : item
      );
      setcartitem(updatedCart);//نحدث الصفحة
}
catch(err){
  console.log(err);
}



};

const decqty =async(productId)=>{
try{
const response = await AxiosIntanse.post(`/Customer/Carts/decrement/${productId}`);
  const updatedCart = cartitem.map((item) =>
      item.productId === productId
        ? {
            ...item,
            count: item.count > 1 ? item.count - 1 : 1, 
            totalPrice:
              item.count > 1
                ? item.totalPrice - item.price
                : item.totalPrice,
          }
        : item
    );

    setcartitem(updatedCart);
}
catch(err){
  console.log(err);
}



};

const checkoutPayment = async (method) => {
  try {
    const response = await AxiosIntanse.post(`/Customer/CheckOut/payment`, {
      paymentMethod: method,
    });

    console.log("Payment Response:", response.data);

    // إذا الـ API يرجع رابط للدفع
    if (response.data?.url) {
      window.location.href = response.data.url; 
    } else {
      alert("Payment completed successfully!");
    }

  } catch (error) {
    console.log("Payment error:", error);
    alert("Payment failed. Please try again.");
  }
};






//عشان استدعيها لازم 
//بتشتغل اول ماتفتح الصفحة 
useEffect(() => {
  getcart();
}, []);

 //  أثناء التحميل عشان دائرة
  if (isLoading) {
    return <CircularProgress />;
  }
















  return (
      <>
      <ResponsiveAppBar />
      <h1>My Cart</h1>
      {cartitem.map((item, index) => (
  <div key={index}>
    <p><b>Product:</b> {item.productName}</p>
    <p><b>Price:</b> {item.price}</p>
    <p><b>Quantity:</b> {item.count}</p>
    <p><b>Total:</b> {item.totalPrice}</p>
     <Button  variant="contained"color="primary" onClick={() => increaceqty(item.productId)}> + Increase </Button>
          <Button  variant="contained"color="primary" onClick={() => decqty(item.productId)}> - decrease </Button>

    <Button   variant="contained"  color="error" onClick={() => removeitem(item.productId)} >delete item</Button>
  </div>

))}
<Box  sx={{left:'20px',marginTop: '10px'}}>
      <Button   variant="outlined"  color="error" onClick={clearcart} > clear cart</Button>
<Button variant="contained" color="success" onClick={() => checkoutPayment("Visa")}>
  Checkout with Visa
</Button>
</Box>
    </>
  )
}
