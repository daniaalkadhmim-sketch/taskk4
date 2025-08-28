import React from "react";

export default function Wishlist({ wishlist, moveCart, remove }) {
  return (
    <>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your wishlist is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((i, idx) => (
              <tr key={i.id}>
                <td>{idx + 1}</td>
                <td>{i.title}</td>
                <td>${i.price}</td>
                <td>
                  <img src={i.image} alt={i.title} style={{ width: 50 }} />
                </td>
                <td>
                  <button className="move" onClick={() => moveCart(i)}>Add to Cart</button>
                  <button className="delete" onClick={() => remove(i.id, "wishlist")}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
