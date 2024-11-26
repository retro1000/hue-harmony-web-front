/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({
  image,
  discount,
  title,
  price,
  originalPrice,
  rating,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {discount && <div className={styles.discount}>{discount}</div>}
        <img src={image} alt={title} className={styles.productImage} />
        <img src="http://b.io/ext_28-" alt="" className={styles.wishlistIcon} />
      </div>
      <button className={styles.addToCartButton}>
        <img src="http://b.io/ext_29-" alt="" className={styles.cartIcon} />
        <span>Add To Cart</span>
      </button>
      <div className={styles.title}>{title}</div>
      <div className={styles.priceContainer}>
        <div className={styles.price}>${price}</div>
        {originalPrice && (
          <div className={styles.originalPrice}>${originalPrice}</div>
        )}
      </div>
      {rating && (
        <div className={styles.rating}>
          <img
            src="http://b.io/ext_30-"
            alt="Rating"
            className={styles.ratingStars}
          />
          <div>({rating})</div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
