import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "./style.module.css";
import Checkout from "../Checkout";

const ItemCart = ({ item }) => {
  const { deleteItemToCart, addItemToCart } = useContext(CartContext);

  const { id } = item;

  const handleAddItemToCart = () => {
    if (item && item.id) {
      addItemToCart(item);
    } else {
      console.error('Error al agregar al carrito: el producto no tiene una ID.');
    }
  };

  const handleDeleteItemToCart = () => {
    if (item && item.id) {
      deleteItemToCart(item);
    } else {
      console.error('Error al eliminar del carrito: el producto no tiene una ID.');
    }
  };

  return (
    <div className={styles.cartItem}>
      <img src={item.img} alt={item.name} />
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.name}</p>
          <div className={styles.buttons}>
            <button onClick={handleAddItemToCart}>Agregar</button>
            <button onClick={handleDeleteItemToCart}>Eliminar</button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.amount}</div>
          <p className={styles.rightP}>Unidad: ${item.price}</p>
          <p className={styles.rightPtotal}>Total: ${item.amount * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;