// Cart.jsx

import React, { useEffect, useState, useContext } from "react";
import { CartContext } from '../../Context/CartContext';
import styles from "./styles.module.css";
import ItemCart from '../../Components/ItemCart';
import cartLogo from '../../images/cart-logo.svg';
import Checkout from "../Checkout";

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [productsLength, setProductsLength] = useState(0);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const { cartItems, clearCart } = useContext(CartContext);

  useEffect(() => {
    setProductsLength(
      cartItems.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);

  const total = cartItems.reduce(
    (previous, current) => previous + current.amount * current.price, 0
  );

  const handleClearCart = () => {
    clearCart();
    setCartOpen(false);
    setCheckoutVisible(false);
    setPurchaseSuccess(false);
  };

  const handleCheckout = () => {
    handlePurchaseSuccess();
    setCheckoutVisible(true);
  };

  const handlePurchaseSuccess = () => {
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
    }, 60000);
  };
  const handleCancelClick = () => {
    // Limpiar el formulario, mensajes de compra y vaciar el carrito
    setCheckoutVisible(false);
    setPurchaseSuccess(false);
  };

  return (
    <div className={styles.cartContainer}>
      <div
        onClick={() => {
          setCartOpen(!cartOpen);
        }}
        className={styles.buttonCartContainer}
      >
        <div className={styles.buttonCart}>
          {<img src={cartLogo} alt="Cart Logo"/>}
        </div>
        {!cartOpen && <div className={styles.productsNumber}>{productsLength}</div>}
      </div>

      {cartOpen && (
        <div className={styles.cart}>
          <h2>Tu carrito</h2>

          {cartItems.length === 0 ? (
            <p className={styles.cartVacio}>Tu carrito está vacío</p>
          ) : (
            <div className={styles.productsContainer}>
              {cartItems.map((item, i) => (
                <ItemCart key={i} item={item} />
              ))}
            </div>
          )}

          <h2 className={styles.total}>Total: ${total}</h2>
          {cartItems.length > 0 && (
            <button onClick={handleClearCart} className={styles.clearButton}>
              Vaciar Carrito
            </button>
          )}

          {cartItems.length > 0 && !checkoutVisible && !purchaseSuccess && (
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Proceder al Checkout
            </button>
          )}

          {purchaseSuccess && (
            <div className={styles.successMessage}>
              Compra realizada con éxito. ¡Gracias!
            </div>
          )}


        </div>
      )}

      {checkoutVisible && (
        <div className={styles.overlay}>
          <div className={styles.checkoutModal}>
            <Checkout onClose={handleCancelClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
