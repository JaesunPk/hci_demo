import React from "react";
import "./cart.css";

function Cart({ cart, clearCart, removeFromCart, toggleCart, submitCart }) {
  return (
    <div className="cart-overlay">
      <div className="cart-content">
        <button className="cart-close-button" onClick={toggleCart}>
          &times;
        </button>
        <h3 className="cart-title">Your Cart</h3>
        {cart.length > 0 ? (
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-info">
                  <strong className="cart-item-title">{item.title}</strong>
                  <p className="cart-item-description">{item.description}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cart-empty-message">Your cart is empty.</p>
        )}
        {cart.length > 0 && (
          <div className="cart-actions-column">
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="submit-cart-button" onClick={submitCart}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
