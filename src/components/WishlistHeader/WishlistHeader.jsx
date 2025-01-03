/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Button from "../Button/Button";
import styles from "./WishlistHeader.module.css";

const WishlistHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Wishlist (4)</div>
      <Button variant="outline">Move All To Bag</Button>
    </div>
  );
};

export default WishlistHeader;
