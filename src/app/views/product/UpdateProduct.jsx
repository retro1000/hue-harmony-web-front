import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = ({ productId }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productDiscount: 0,
    coat: 0,
    productQuantity: 0,
    onlineLimit: 0,
    dryingTime: "",
    coverage: 0,
    productStatus: "AVAILABLE",
    brand: "DULUX",
    roomType: "BEDROOM",
    finish: "GLOSS",
    productTypes: [],
    surfaces: [],
    positions: [],
    productFeatures: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const brands = ["DULUX", "ROBBIALAC", "NIPPON_PAINT", "ASIAN_PAINTS", "KANSAI_PAINT"];
  const finishes = [
    "GLOSS",
    "GLOSS_SEMI_GLOSS_MATTE",
    "HIGH_GLOSS",
    "LOW_SHEEN",
    "MATT",
    "MID_SHEEN",
    "SEMI_GLOSS",
  ];
  const roomTypes = [
    "BATHROOM",
    "BEDROOM",
    "CHILDRENS_ROOM",
    "KITCHEN",
    "LIVING_ROOM",
    "HOME_OFFICE",
    "HALLWAY",
    "DINING_ROOM",
  ];

  // Fetch product details when component loads
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${productId}`);
        const product = response.data;

        setFormData({
          productName: product.productName || "",
          productDescription: product.productDescription || "",
          productPrice: product.productPrice || 0,
          productDiscount: product.productDiscount || 0,
          coat: product.coat || 0,
          productQuantity: product.productQuantity || 0,
          onlineLimit: product.onlineLimit || 0,
          dryingTime: product.dryingTime || "",
          coverage: product.coverage || 0,
          productStatus: product.productStatus || "AVAILABLE",
          brand: product.brand || "DULUX",
          roomType: product.roomType || "BEDROOM",
          finish: product.finish || "GLOSS",
          productTypes: product.productTypes || [],
          surfaces: product.surfaces || [],
          positions: product.positions || [],
          productFeatures: product.productFeatures || [],
        });

        setSelectedImages(product.images || []); // Assuming `product.images` contains base64 strings
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "surfaces" || name === "positions" || name === "productFeatures" || name === "productTypes"
          ? value.split(",").map((item) => item.trim())
          : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    base64ConversionForImages(files);
  };

  async function base64ConversionForImages(files) {
    const base64Strings = [];
    for (const file of files) {
      base64Strings.push(await getBase64(file));
    }
    setSelectedImages(base64Strings);
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      images: selectedImages,
    };

    try {
      console.log("Payload being sent:", JSON.stringify(updatedProduct));
      await axios.put(`http://localhost:8080/product/${productId}/update`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields similar to AddProduct */}
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Discount:</label>
          <input
            type="number"
            name="productDiscount"
            value={formData.productDiscount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Coat:</label>
          <input
            type="number"
            name="coat"
            value={formData.coat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Drying Time:</label>
          <input
            type="text"
            name="dryingTime"
            value={formData.dryingTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Coverage:</label>
          <input
            type="number"
            name="coverage"
            value={formData.coverage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Online Order Limit:</label>
          <input
            type="number"
            name="onlineLimit"
            value={formData.onlineLimit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Status:</label>
          <select
            name="productStatus"
            value={formData.productStatus}
            onChange={handleChange}
            required
          >
            <option value="AVAILABLE">Available</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>
        <div>
          <label>Brand:</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Room Type:</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
          >
            {roomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Finish:</label>
          <select
            name="finish"
            value={formData.finish}
            onChange={handleChange}
            required
          >
            {finishes.map((finish) => (
              <option key={finish} value={finish}>
                {finish}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Product Types(Comma-separated):</label>
          <input
            type="text"
            name="productTypes"
            value={formData.productTypes.join(",")}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Surfaces (Comma-separated):</label>
          <input
            type="text"
            name="surfaces"
            value={formData.surfaces.join(",")}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Positions (Comma-separated):</label>
          <input
            type="text"
            name="positions"
            value={formData.positions.join(",")}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Features (Comma-separated):</label>
          <input
            type="text"
            name="productFeatures"
            value={formData.productFeatures.join(",")}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Images:</label>
          <input
            type="file"
            name="productImages"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
