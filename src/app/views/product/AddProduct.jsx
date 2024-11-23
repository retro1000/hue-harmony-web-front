import React, { useState } from "react";
import axios from "axios";
import AddBookRequest from "../../models/AddProductRequest"; 

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productDiscount: 0,
    coat: 0,
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
  

  async function base64ConversionForImages(files) {
    const base64Strings = [];
    for (const file of files) {
      base64Strings.push(await getBase64(file));
    }
    setSelectedImages(base64Strings);
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    base64ConversionForImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productRequest = new AddBookRequest(
      formData.brand,
      formData.coat,
      formData.coverage,
      formData.dryingTime,
      formData.finish,
      formData.positions,
      formData.productDescription,
      formData.productDiscount,
      formData.productName,
      formData.productPrice,
      formData.productStatus,
      formData.productTypes,
      formData.roomType,
      formData.surfaces,
      formData.productFeatures,
      selectedImages // Array of image Base64 strings
    );

    try {
      console.log("Payload being sent:", JSON.stringify(productRequest));
      const response = await axios.post(
        "http://localhost:8080/product/create",
        JSON.stringify(productRequest),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
