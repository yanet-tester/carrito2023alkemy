import React, {useContext} from "react";
import styles from "./styles.module.css"
import {ProductsData} from '../../Data/ProductsData'
import {CartContext} from '../../Context/CartContext'

const Products = () => {
  const {addItemToCart} = useContext(CartContext)
  return (
    
    
      <div className={styles.productsContainer}>
      {ProductsData.map((product, i) => (
        <div key={i} className={styles.product}>
          <img src={product.img}alt={product.name}/>
          <div> 
            <p>
              {product.name} - ${product.price}
            </p>
          </div>
          <button onClick={() => addItemToCart(product)}>Agregar al carrito</button>
          </div>
      ))}
    </div>
    
  );
};
export default Products;
