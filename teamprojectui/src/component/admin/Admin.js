import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './Admin.css'

const Admin = () => {
  const [fooditem, setfooditem] = useState([]);
  const [foodcategory, setfoodcategory] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [deleteData, setDelete] = useState(null)
  const [deleteCategory, setdeleteCategory] = useState(null)

  const { state } = useLocation();
  console.log("state",state)

  const logout = () => {
    localStorage.clear("token")
    navigate("/login")
    console.log(localStorage.getItem("token"))
  }
  //get all food item list
  const getfood = () => {
    axios.get("http://192.168.1.4:7000/api/v2/food/getallitem").then((res) => {
      // console.log(res.data.result)
      setfooditem(res.data.result)
    }).catch((error) => {
      console.log(error)
    })
  }

 //get all category item list
  const foodcategorys = () => {
    axios.get("http://192.168.1.4:7000/api/v2/food/getfoodcategory").then((res) => {
      // console.log("category",res.data.result)
      setfoodcategory(res.data.result)
    }).catch((error) => {
      console.log(error)
    })
  }

  //search
  const searchproduct = (key) => {
    console.log(key)
    axios.get('http://192.168.1.4:7000/api/v2/food/searchproduct/' + key, {
      params: { foodName: data, }
    })
      .then((res) => {

        setData(res.data.result)
        console.log("search", res.data.result)
      }).catch((error) => {
        console.log(error)
      })
  }

  //delete food item
  const deleteproduct = async (data) => {
    const token = localStorage.getItem('token')
    getfood()
    // console.log("data", data)
    await axios.delete(`http://192.168.1.4:7000/api/v2/food/delete/${data}`, {
      headers: { "token": token }
    })
      .then((res) => {
        setDelete("delete")
        // console.log(res)
      }).catch((error) => {
        console.log(error)
      })
  }

  //delete category
  const deletecategorys = async (data) => {
    const token = localStorage.getItem('token')
    getfood()
    foodcategorys()
    console.log("data", data)
    await axios.delete(`http://192.168.1.4:7000/api/v2/food/deletecategory/${data}`, {
      headers: { "token": token }
    })
      .then((res) => {
        setdeleteCategory("delete")

        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
  }

  //get indiv food details
  const getIndivData = async (data) => {
    const token = localStorage.getItem('token')
    console.log(data)
    
    await axios.get(`http://192.168.1.4:7000/api/v2/food/getIndifooddetails?food_uuid=${data}`, {
      headers: { "token": token }
    })
      .then((res) => {
        if (res.data.result) {

          console.log("deatilss", res.data.result)
          navigate('/AdminViewDetails', { state: res.data.result })
        }
        console.log("indivproductdetails", res.data)
      }).catch((error) => {
        console.log(error)
      })
  }


  let cartItems = []
  const [cart, setcart] = useState([]);
  function addtocart(curElem) {
    // cartItems.push(curElem)
    console.log("regtrg", curElem)

    if (cart.indexOf(curElem) !== -1) return;
    setcart([...cart, curElem]);
    console.log("cart", cart)

    console.log("curElem", curElem)
  }

  useEffect(() => {
    getfood()
    foodcategorys()
    deleteproduct()
    // cart()
    // getProducts()
  }, []);


  return (
    <div>
      <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex justify-content-center justify-content-md-between">
        </div>
      </div>
      {/* <!-- ======= Header ======= --> */}
      <header id="header" className="fixed-top d-flex align-items-cente">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
          <h1 className="logo me-auto me-lg-0"><a href="index.html">Admin</a></h1>
          <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">

<h1 className="logo me-auto me-lg-0"><a href="index.html">Restaurantly</a></h1>

<nav id="navbar" className="navbar order-last order-lg-0">
 
  
</nav>

<a href="#book-a-table" className="book-a-table-btn scrollto d-none d-lg-flex" onClick={logout}>LogOut</a>

</div>
        </div>
        
      </header>
      {/* <!-- End Header --> */}

      {/* <!-- ======= Menu Section ======= --> */}
      <section id="menu" className="menu section-bg">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            {/* <h2>Menu</h2> */}
            <p>Check Our Tasty Menu   <input type="text" className="search-box" onChange={(key) => searchproduct(key.target.value)} placeholder="Search" /></p>

          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="menu-flters">


                {
                  foodcategory.map((curElem, index) => {
                    return (
                      <li key={index} >
                        <li data-filter=".filter-starters">{curElem.CategoryName}</li><button onClick={() => deletecategorys(curElem.uuid)} >-</button>
                      </li>

                    )
                  })
                }
                <button>+</button>
              </ul>
            </div>
          </div>
          <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
            {
              fooditem.map((curElem, index) => {
                // console.log("sdfer ",curElem.foodName)
                return (

                  <div className="col-lg-6 menu-item filter-starters" key={index}>
                    <img src={curElem.foodImage} className="menu-img " alt="" />
                    <div className="menu-content">
                      <span>{curElem.foodName}</span><span>Rs.{curElem.Price}</span>
                      <span className="delete" style={{backgroundColor: "white"}} onClick={() => deleteproduct(curElem.uuid)}>Delete</span>                                                                                  
                      <span className="view" onClick={() => getIndivData(curElem.uuid)}>ViewDetails</span>
                     
                    </div>
                    <div className="menu-ingredients">
                      {curElem.ingredients}
                    </div>                        
                  </div>
                )
              })
            }
            <button onClick={()=>navigate("/Addfood",{state: state})}>+</button>
          </div>

        </div>
      </section>


    </div>
  )
}
export default Admin