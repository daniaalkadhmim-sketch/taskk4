import React, { useState, useEffect } from "react";
import Task from "./task"
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [tab, setTab] = useState("cart");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const firstFive = data.slice(0, 5).map(p => ({ ...p, stock: 5 }));
        const outOfStock = {
          id: 999,
          title: "Super Gadget X",
          price: 199.99,
          image: "https://via.placeholder.com/150",
          stock: 0
        };
        setProducts([...firstFive, outOfStock]);
      });
  }, []);

  const addCart = (p) => {
    if (p.stock === 0) { alert("هذا المنتج غير متوفر في المخزن!"); return; }
    const exist = cart.find(i => i.id === p.id);
    exist ? setCart(cart.map(i => i.id===p.id?{...i, qty:i.qty+1}:i)) : setCart([...cart, {...p, qty:1}]);
  };

  const addWishlist = (p) => !wishlist.find(i => i.id === p.id) && setWishlist([...wishlist, p]);

  const remove = (id, type) =>
    type === "cart" ? setCart(cart.filter(i => i.id!==id)) : setWishlist(wishlist.filter(i => i.id!==id));

  const moveCart = (p) => { addCart(p); remove(p.id, "wishlist"); };

  const total = cart.reduce((t, i) => t + i.price * i.qty, 0);

  return (
    <div className="App">
      <header>
        <h1>ShoppingCart</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10 }}>
          <button className={tab==="cart"?"active":"inactive"} onClick={()=>setTab("cart")}>Cart ({cart.length})</button>
          <button className={tab==="wishlist"?"active":"inactive"} onClick={()=>setTab("wishlist")}>Wishlist ({wishlist.length})</button>
        </div>
      </header>

      <div className="container">
        {tab==="cart" ? (
          <>
            <h2 style={{ textAlign:"center" }}>Products Cart Total: ${total.toFixed(2)}</h2>
            {cart.length===0 ? <p style={{ textAlign:"center" }}>Your cart is empty</p> : (
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>Name</th><th>Price</th><th>Image</th><th>QTY</th><th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((i, idx) => (
                    <tr key={i.id}>
                      <td>{idx+1}</td>
                      <td>{i.title}</td>
                      <td>${i.price}</td>
                      <td><img src={i.image} alt={i.title} style={{ width:50 }}/></td>
                      <td>
                        <input type="number" className="qty" value={i.qty} min="1"
                          onChange={(e)=>e.target.value<1?remove(i.id,"cart"):setCart(cart.map(c=>c.id===i.id?{...c,qty:+e.target.value}:c))}/>
                      </td>
                      <td><button className="delete" onClick={()=>remove(i.id,"cart")}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <h3>Available Products</h3>
            <div className="products">
              {products.map(p => (
                <div key={p.id} className="product-card">
                  <img src={p.image} alt={p.title}/>
                  <h4>{p.title}</h4>
                  <p>${p.price}</p>
                  <button className="add-cart" onClick={()=>addCart(p)}>Add to Cart</button>
                  <button className="add-wishlist" onClick={()=>addWishlist(p)}>Wishlist</button>
                  {p.stock===0 && <p className="out-of-stock">Out of Stock</p>}
                </div>
              ))}
            </div>
          </>
        ) : (
          <Task wishlist={wishlist} moveCart={moveCart} remove={remove}/>
        )}
      </div>
    </div>
  );
}
