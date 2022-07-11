import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Addtocart.css'
import {Link,useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

 const Addtocart=()=>{
  const navigate = useNavigate()
  const {state} = useLocation();
  // const{setcart}=useLocation();
// console.log("values",setcart)
const [cartLists, setCartLists] = useState([]);
const [price, setPrice] = useState(0);
const [cart,setcart]=useState([]);


const check = () => {
  
  setcart(state.cart)
console.log("values",cart)
};
const handlePrice = () => {
  let ans = 0;
  state.cart.map((item) => (ans += item.amount * item.Price));
  setPrice(ans);
};
const removeFromCart = index =>
setcart(cartList => cartList.filter((_, i) => i !== index));
// const handleRemove = (id) => {
//   const arr = state.cart.filter((item) => item.id !== id);
//  setcart(arr);

//   handlePrice();
// };


// const removeFromCart = index =>
// set(cartList => cartList.filter((_, i) => i !== index));

// const clearCart = () => setCartLists([]);
useEffect(() => {
  handlePrice()
  // check()
});






    return(
      <div>  <button onClick={()=>navigate('/home')}>Back</button>
     
<article>
  <div className="wholebody">
      {
      state.cart.map((item,index) =>{return (
        <div className="cart_box" key={index.id}>
          <div className="cart_img">
            <img src={item.foodImage} alt="" />
            <p>{item.foodName}</p>
          </div>
          <div>
            <button  >+</button>
            <button>{item.amount}</button>
            <button >-</button>
          </div>
          <div>
            <span>{item.amount}</span>
            <button onClick={()=>removeFromCart(index)} >Remove</button>
          </div>
        
        </div>
        
      )})}
       <div className="total">
          <span>Total Price of your Cart</span>
          <span>Rs - {price}</span>
        </div>
        </div>
    </article>
     </div>
    )
}
export default Addtocart