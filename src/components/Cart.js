import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity(productId, newQuantity));
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleViewDetails = (id) => {
    navigate(`/item-details/${id}`);
  };

  return (
    <div className="container mt-4">
      <h1>Cart</h1>
      {cartItems?.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <h4>Total Items: {totalItems}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewDetails(item.id)}
                  >
                    <img
                      src={item.image}
                      style={{ height: 50, width: 50, marginRight: 10 }}
                      alt={item.title}
                    />
                    {item.title}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="input-group">
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            <button className="btn btn-primary mt-3 focus-ring py-1 px-2">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
