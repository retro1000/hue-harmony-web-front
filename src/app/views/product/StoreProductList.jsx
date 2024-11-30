import { useState, useEffect } from "react";
import { Stack, Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard, MuiTable } from "app/components";

// Styled Component
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function StoreProductList() {
  // Define only column names

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book category");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl = `http://localhost:8080/products`;

      let url = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong in products fetching");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.products;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      console.log("responseData",responseData);

      const loadedBooks = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      console.log("loadedBooks",loadedBooks);

      setProducts(responseData);
      setIsLoading(false);
    };

    fetchBooks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);



  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const columns = [
    {
      name: "productName",
      label: "Product Name",
    },
    {
      name: "productDescription",
      label: "Product Description",
    },
    {
      name: "productPrice",
      label: "Product Price",
    },
    {
      name: "productDiscount",
      label: "Product Discount",
    },
    {
      name: "coat",
      label: "Coat",
    },
    {
      name: "dryingTime",
      label: "Drying Time",
    },
    {
      name: "coverage",
      label: "Coverage",
    },
    {
      name: "onlineLimit",
      label: "Online Limit",
    },
    {
      name: "productQuantity",
      label: "Product Quantity",
    },
    {
      name: "productPublishedTime",
      label: "Product Published Time",
    },
    {
      name: "productStatus",
      label: "Product Status",
    },
    {
      name: "brand",
      label: "Brand",
    },
    {
      name: "roomType",
      label: "Room Type",
    },
    {
      name: "finish",
      label: "Finish",
    },
    {
      name: "productType",
      label: "Product Type",
    },
    {
      name: "surfaces",
      label: "Surfaces",
    },
    {
      name: "positions",
      label: "Positions",
    },
    {
      name: "productFeatures",
      label: "Product Features",
    },
    {
      name: "_links",
      label: "Links",
    },
  ];
  

  const data = products.map((product, index) => ({
    productName: product.productName,               // Product Name
    productDescription: product.productDescription,        // Product Description
    productPrice: product.productPrice,              // Product Price
    productDiscount: product.productDiscount,           // Product Discount
    coat: product.coat,                      // Coat
    dryingTime: product.dryingTime,                // Drying Time
    coverage: product.coverage,                  // Coverage
    productQuantity: product.productQuantity,           // Product Quantity
    productPublishedTime: product.productPublishedTime,      // Product Published Time
    productStatus: product.productStatus,            // Product Status
    brandcol11: product.brand,                    // Brand
    roomType: product.roomType,                 // Room Type
    finish: product.finish,                   // Finish
    productType: product.productType.join(", "),   // Product Type (joined)
    surfaces: product.surfaces.join(", "),      // Surfaces (joined)
    positions: product.positions.join(", "),     // Positions (joined)
    productFeatures: product.productFeatures.join(", "), // Product Features (joined)
  }));

  console.log("sending Data", data);
  

  const options = {
    filter: true,
    print: false,
    download: true,
    search: true,
  };

  const handleUpdate = (rowIndex) => {
    console.log("Update row:", rowIndex);
  };

  const handleDelete = (rowIndex) => {
    console.log("Delete row:", rowIndex);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Product", path: "/Product/list" },
            { name: "List" },
          ]}
        />
      </Box>

      <MuiTable
      title="Enhanced Table"
      columns={columns}
      data={data}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />

    </Container>
  );
}

export default StoreProductList;
