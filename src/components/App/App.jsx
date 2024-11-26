/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Header from "../Header/Header";
import WishlistHeader from "../WishlistHeader/WishlistHeader";
import ProductGrid from "../ProductGrid/ProductGrid";
import Footer from "../Footer/Footer";
import styles from "./App.module.css";

const App = () => {
  const wishlistProducts = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/75aea0f7369e2d837e37fba283e2e008dd477a2aa1bf612f3f91159a7602d3ca?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      discount: "-35%",
      title: "Gucci duffle bag",
      price: 960,
      originalPrice: 1160,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b790871d793ce853a860b05c2762706ff603674a62ee5a004a93b92d18a6f651?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      title: "RGB liquid CPU Cooler",
      price: 1960,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/82e755dd62fe5eb6dec31438da91fb9fe0c1a8ea880eaf2dea3e531b5e364017?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      title: "GP11 Shooter USB Gamepad",
      price: 550,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8f566813ed66f92077b4659d5ef62f8fac7b64d06c21cc4a8f91ad40f281b216?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      title: "Quilted Satin Jacket",
      price: 750,
    },
  ];

  const justForYouProducts = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/649f60b49c56315a00fd585e8740287a839199908730d2f3378ec432b1967872?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      discount: "-35%",
      title: "ASUS FHD Gaming Laptop",
      price: 960,
      originalPrice: 1160,
      rating: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d98d1dc21d20860fdd4b13d4013634723d21bf9cf5ac75808b73eb7beba7a856?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      title: "IPS LCD Gaming Monitor",
      price: 1160,
      rating: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2632be86cb5416f2c49e6bd7f096b55e34248c3dd186ccb81ab9212ab4757699?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      discount: "NEW",
      title: "HAVIT HV-G92 Gamepad",
      price: 560,
      rating: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/994d1d7c044ca12614ac1c2f7c53c60ab052e1b251e880ded2da8169854b2443?apiKey=4b22a28b78d84e32b8887416276aba72&&apiKey=4b22a28b78d84e32b8887416276aba72",
      title: "AK-900 Wired Keyboard",
      price: 200,
      rating: 65,
    },
  ];

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <WishlistHeader />
        <ProductGrid products={wishlistProducts} />
        <div className={styles.justForYou}>
          <div className={styles.justForYouHeader}>
            <div className={styles.justForYouTitle}>
              <div className={styles.titleBar} />
              <h2>Just For You</h2>
            </div>
            <button className={styles.seeAllButton}>See All</button>
          </div>
          <ProductGrid products={justForYouProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;