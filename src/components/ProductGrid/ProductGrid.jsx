/**
 * This code was generated by Builder.io.
 */
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ products }) => {
  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <div key={index} className={styles.gridItem}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
