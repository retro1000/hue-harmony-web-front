import React, { useState, useEffect } from "react";
import useAuth from "app/hooks/useAuth";
import { useAxios } from "app/hooks/useAxios";
import { Navigate, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Rating,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ColorSelector from "../../components/ProductDetails/ColorSelector";
import SizeSelector from "../../components/ProductDetails/SizeSelector";
import QuantitySelector from "../../components/ProductDetails/QuantitySelector";
import DeliveryInfo from "../../components/ProductDetails/DeliveryInfo";
import ProductImages from "../../components/ProductDetails/ImageGrid";
import ProductGrid from "../../components/HomePage/PopularProducts";
import Footer from "../../components/ProductPage/Footer";
import NotFound from "../sessions/NotFound";
import { MatxLoading } from "app/components";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { api } = useAxios();
  const { apiNonAuth } = useAxios();
  const { user, role } = useAuth();
  const [value, setValue] = useState(0);
  const [on, setOn] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const [reviews, setReviews] = useState(undefined);
  const [attributes, setAttributes] = useState([]);
  const [variations, setVariations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [swipTo, setSwipTo] = useState(undefined);
  const [notFount, setNotFound] = useState(false);
  const [size, setSize] = useState(0);
  const [productColor, setProductColor] = useState("");
  const [brand, setBrand] = useState("");
  const [coat, setCoat] = useState("");
  const [coverage, setCoverage] = useState("");
  const [dryingTime, setDryingTime] = useState("");
  const [finish, setFinish] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [onlineLimit, setOnlineLimit] = useState(0);
  const [positions, setPositions] = useState([]);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStatus, setProductStatus] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [surfaces, setSurfaces] = useState([]);
  const [productFeatures, setProductFeatures] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [userQuantity, setUserQuantity] = useState(0);


  const [qty, setQty] = useState(1)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productRes, reviewRes] = await Promise.allSettled([
          apiNonAuth.get(`/product/read/${id}`),
          apiNonAuth.get(`/product/review/get/${id}`),
        ]);

        console.log("response Product", productRes);

        if (productRes.value.status === 200) {
          setNotFound(false);
          const product = productRes.value.data;
          setProductColor(product.productColor);
          setSize(product.productSize);
          setBrand(product.brand);
          setCoat(product.coat);
          setCoverage(product.coverage);
          setDryingTime(product.dryingTime);
          setFinish(product.finish);
          setProductQuantity(product.productQuantity);
          setOnlineLimit(product.onlineLimit);
          setPositions(product.positions);
          setProductDescription(product.productDescription);
          setProductDiscount(product.productDiscount);
          setProductName(product.productName);
          setProductPrice(product.productPrice);
          setProductStatus(product.productStatus);
          setProductTypes(product.productTypes);
          setRoomType(product.roomType);
          setSurfaces(product.surfaces);
          setProductFeatures(product.productFeatures);
          setSelectedImages(product.imageIds);
        }

        if (productRes.value.status === 204) {
          setNotFound(true);
        }

        if (reviewRes.value.status === 200) {
          setReviews(reviewRes.value.data);
        }
      } catch (err) {
        console.error("Error fetching product or reviews:", err);
      } finally {
        setPageLoading(false);
      }
    };

    setPageLoading(true);
    fetchProduct();
  }, []);

  const buyNow = () => {
    navigate('/billing-details', {state: {type: 'buy', products: [{id: id, quantity: qty, productName: productName, price: productPrice-productDiscount, productImage: productImages[0]}]}})
  }

  if (notFount) return <NotFound />;
  if (pageLoading) return <MatxLoading />;

  return (
    <>
      <Grid container spacing={2} sx={{ padding: "0 20px" }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 501, ml: 20, maxHeight: 9 }}>
            <ProductImages images={selectedImages} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 501 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, letterSpacing: "0.72px", mb: 2 }}
            >
              {productName}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              {productQuantity - onlineLimit > 0 ? (
                <Typography variant="body2" color="success.main">
                  In Stock
                </Typography>
              ) : (
                <Typography variant="body2" color="error.main">
                  Out of Stock
                </Typography>
              )}
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 400, letterSpacing: "0.72px", mb: 3 }}
            >
              LKR {productPrice}
            </Typography>
            <Typography variant="body2" mb={3}>
              {productDescription}
            </Typography>
            <Box sx={{ borderTop: "1px solid black", my: 3 }} />
            <ColorSelector productColor={productColor} />
            <SizeSelector productSize={size} />
            <Box display="flex" alignItems="center" gap={2} my={3}>
              <QuantitySelector qty={qty} onQuantityChange={setQty}/>
              <Button variant="contained" color="error" sx={{ flexGrow: 1 }} onClick={buyNow} disabled={productQuantity - onlineLimit <= 0}>
                Buy Now
              </Button>
              <Button variant="outlined">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fa9def9ca7809dc127749110b56d93aaeb78208b8aca3ad0069665c489173ab?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
                  alt="Wishlist"
                  width={24}
                  height={24}
                />
              </Button>
            </Box>
            <DeliveryInfo />
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Specifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Brand: ${brand}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Coat: ${coat}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Drying Time: ${dryingTime}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Coverage (sq ft/L): ${coverage}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Surfaces: ${surfaces.join(", ")}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Room Type: ${roomType}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Product Features: ${productFeatures.join(", ")}`}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Grid>
        <Box
          maxWidth="1200px"
          margin="0 auto"
          padding="0 20px"
          mt={20}
          mb={10}
        >
          <ProductGrid Title="Related Products" />
        </Box>
      </Grid>
      <Footer />
    </>
  );
};

export default ProductDetails;
