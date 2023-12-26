import React from "react";
import styles from "./styles.module.css";  
import Cart from "../Cart";
import Products from "../Products";
import Footer from "../Footer";



const Home = () => {
  return (
    <div className={styles.home}>
      
      <h2 className={styles.h2}>Mis compras navideñas</h2>

      <Cart />
      <Products />

      <Footer />
    </div>
  );
};

export default Home;