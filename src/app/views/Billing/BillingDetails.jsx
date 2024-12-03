
import React, {useEffect, useState} from "react";
import {Box, Button, Container, Divider, Grid, IconButton, Paper, Typography} from "@mui/material";
import BillingDetailsHeader from "../../components/BillingDetails/BillingDetailsHeader";
import BillingForm from "../../components/BillingDetails/BillingForm";
import OrderSummary from "../../components/BillingDetails/OrderSummary";
import Footer from "../../components/ProductPage/Footer";
import {useLocation} from "react-router-dom";
import {useAxios} from "../../hooks/useAxios";
import PaymentGrid from "./component/PaymentGrid";
import {useNotistack} from "../../hooks/useNotistack";

const state = {
  type: "cart",
  products: [
      {
        id: 1,
        productName: "Product 1",
        productImage: 'data:image/jpeg;base64,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',
        price: 100,
        quantity: 2
      },
      {
        id: 2,
        productName: "Product 2",
        productImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAzQMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA7EAABAwIEAwUECQIHAAAAAAABAAIDBBEFEiExBkFREyIyYXEjQoGRBxQzUqGxwdHwYuEVQ0RjgpLx/8QAGwEBAQADAQEBAAAAAAAAAAAAAAECAwQFBgf/xAAyEQACAgEEAQIEBAUFAQAAAAAAAQIDEQQSITFBBRMiUWGRMnGBoRRCsdHwFTPB4fEj/9oADAMBAAIRAxEAPwDh15p+nggJjVGRkwFDELKAaAEArIAIQEbKlJBQgwEIPKgyGUoTI23B1KFyWjVQwE7qqVFZQpFDIiqURRFRFUEUKCAaAYQEUA0BIIRkwVCYC6hBEoCQQAgBAFkA9AhiSuEAwoQkhA21GnmgOdxHiBweY6IANbu8jf08l1woWPiPm9Z6zJScafubfDZpJqSN032hbcrXZXjlHsaO+VlUXPtl7hZaTuRFDIiqBFCkSqikUKCAAgJICKAYQDQgwUAFMAagwSBUMRoAQAEIOyDI2t13UIyYshjkaAwcaqBT4bK69nOGQfH+FbKY5mjg9Su9nTSfz4+5xoynxbLvPjEl5O1oLOlZY9211z2PCZ9jRzjBmyR2vbUBcmT0YsoIVM0IhCkSEKRcFUykVSiQDQDQEUAIBhANACEHdAF0GCbViRkgEISQgIQupaearqYaWmZnnneI42+Z/l/QLKuLlJI5tZqFp6ZWPwbCs4FxumzPjfTzd4NHZy2N+nesPx6Hmu50cHzEfVk3np/5/nRzE9ZU4fVSUta20kejmkgn5jRaJ0rwejR6o3y+UaziGqNXHEYmkRMBLr/eWVMVHOTj9X1DvUdnS7/M0d9F0HiN8HX4I4uigLte7+i5bumfW6FuUIN/I6KMd7X8lxvo9RPkhW0Zjb2sY9mdxe+VSM/DNpg2WwoZUKRcxBkpIWSMhWQo0AIBIBICQQEkIJACAYUBNqhGSCEGhBgXKEK6fGpsLxRk1K9kUsJIbJIzONRyHLS4v0JXZpYL8TZ8/wCr3Oxeztyk8vHZtKnj3E5KWSN8MMkoa7sKindlMRcACcrgQb218iQu/wBueHtw/qmfNOFe5LDX0a/5R585lRPK9+S7nOJOgGq439TtUbGvhRZHT1Fu8AGnQguCjwb4V2tc/wBTHfhlVclrGuHKzgs1NHJL0+98pfujo8Gb2JgY62YCxC57X8LPotEtijF9nTsglijhnewiOYExk7OsbH8VytPbyelGyMpOKeWsZ/Xoz4mski8tR+60NG5M0dZTmnnc3kdQt0XlGZSsgRedEKY7lTIiVSiugC6AZQCCAmEAEoBIAQDCAsbssTFjQhJqAk9wijc87AIll4Ndk1CLkzlqyqqat/aujaCNuVl3RioLB8nqdRbfLe1+RrXTS5rOcW+gWeEedK6zOJPBdG+RjmyMlvrqDuo1wboTnFqSlkyxI9wFjvzWvODtUpPryZkDHOsC4sWuVmOjqqrb8m44ewqpr8Wioqdt5JnZWuto0c3H0CxbdjUUdLktLGVtnSOr4nqIXYu6hpDelw9gpYud8viPmS6/yWNzW/C6Rn6bCXse5P8AFN7n+pTSS2HeJLdtlytnppNmLi5DsgAu65+S2VLc3g2Lrk1krHROLXgtcNbFZtNPDCeSl5UMkUkrIyIIAQAgGUAxogHdACAEAIBhAWN2WJGSshiTYFCM1fETTJExrX2DbnIHWLjyH86Lfp08ni+rpyiop9Z48s0cwEYs8SAfea64XV2eHYlXxLP5lTY2k5xNnYBsd1Wa4wz8W/gQieZMze8OYCxyT225bl0ZtNmyX7hB1tfULXN/I76E9vJmQE2Jtdrjq65sFrkzsrxjg9R4Gjbg/DGKcQ1DTHUCAx0pcLacyPV1h/xW2iLhGVhxepT/AIm6vSx68/59EcM2qkhDS92d27iOq5Mbj3PcdfHZlNxIZGktdlNvDusXXk3q9YTMmFstdikFJDcvuM9tcvl8L6+a7NNTzt+5tnalBzfR1fHuDw02D0VS1oEsZEbiOYK3a+CwpHjel6uVuonHw+TgJDYLz0fQooOqpQQAgBASQCQAEAwqBoAQDAUBY1YkLAEIwlmbBGXOLQbd0ONrlWMXJmi+2NUcyf8A2crLBI+oklfKJHk89j6eS7U9qxg+TdM5WynKWX+36fQofIGuySAs82nRZdmic1F7JLBFzQC1r7BvJwG6jyTbHOH9y6OMPk8dja4I0WLlhHRCvMuzL7N4+1yi+xA1K1OXyOtQa/GbzhnCZsdxSDDaWXI55zZ3C4YBuSPJYxi5SwvJtt1EaKnNvKXX5nof0o1lPQ4XhnD1N7JsYzuaNe63RoPxufULo1TUYqCPN9Hr962eos4/u+/t/wAnl8s4bKGktN/CQPw9VzJZR687EpbWZbWPocuY5q11sjBqIweZ/q6dFmoc8Lk6K4vyz0r6PeHXUUX16sHtXi4vyXq01KqP1PI9U16aVUBfSVXNNLDSNOr5A4joG81xayfw4NvoVL3uz5L+p5vKuBH1KRUqUEAIAQDKASAapRhCAgGoCYCgJtUIWDkoRnOY85s1Vk7Voy6Fxdt5ALsoWI5Pk/Vpe5ds3frn9kv6mEGNiZcO7Uc7E3W3k49kYR4eSTHBzmyxuEgHuuGoR9Fg1JqUXn6EHs7Q5swy30G1lE8EnXu58G84bw1tfiVJh07hH9alDGzEXyk7aaX10+KwXxzwdX+xTKUo5a/6LarDpsOxN9HUROhmY7KQRe5/vy63WqUWvhfZ21OE0rIdPz/f5M9i4A4cZgGEPqsSjEVXUNDpXO/yoxqAenU/2Xdpq3XFyfZ876jqVqbVCtcLj838zyziHGJ8XxWerqA60p9jyLWDwi/p+N1w2z3y3n0Wnq/h6Y1Nf++TXwl8DYpnNzTuF4mEXy3979grGPP1N8FLuR3nBHCpc4YjiV3Pcc1ndT1816lFCgsvs87X+obFsh2dvjGLUuE4c9ziAAMobzK2WzjCO59HiaWizV3YjyzyXE6+bEKuSonJu7QNvo0dF4dtjslln3+l08NPWoR+/wAzXSHVYo6StACAEAIBoUFQCEGgBASCjBYFATaoQJw/6vL2ZaH5DlLjYXRPnk06hyVctveHg5n/AA9sb3udNneHEZhz812b+OEfKrRpScpSyzDll7OTJIA8X0fsQti5OOye2e2SyKUFujG3adQ8DVCS3LpfqWwZmuBLbs58yQo+jbVmL64Nxh8z4J4ZqZ7vZSNkZc+FzTcfkuZva8+T1IQU4OHhn0VhlZSYzQUuJiGNxewEPyAujPMX3Gq9WG2aUkfI212UTlVLK/zv9TQ/SZjIwvh51K2QGavvGzXUN94/kPiteps2Q+p2+l6f3b8+I/1PGc12CSZoIvZjLeI/sF5yilyj6zO/s7Xg3hhznjEMT1c7UBw2816mmoUVul2eVrtdsWyJ1+K4pTYVTXc+1tGsG7j0XRZZGuO6R4+n012st2xPOcWxObEah007tPdYDo0LxL75XSyz7rRaGvSV7Y9+X8zWvctKR2lJVAkAIAQAgJIUFSAgBANASBUYJBQFjQoDX4w1khjBc5rm72PJbqcrk8j1KMZYTZopu1Y/2DnPHO66E89nz9qnGXwPJESujJBprudvpdV4Md8oPmHJkxSOlI7SExC1vVYP6HTXNz/FHBkBpYSYtQdxZYPk3KLj+HyWQnKSSO4TfbZYTx0b6+HyuDf4BxFiOAucMKqsjH6vhf3mHztyKkLJ1/hF+ko1ON/a+5h4pX1WOYg6evnc+RzdXk2DGjy6D9Vd0pyzJmUKK6l7cFhG+4NwI4pVirlYRSxaQsd0C79JTl75HPrtSqK9sezsMYxelwqnac2Z20cYHNdd10allnj6TR2a23C68s8+rq+atndNO8lzuV9AOgXiW2ytlukfcaXS16avZWvz+phudda8HSQJVBFACAEAIAQElSghAQAgGgGFCljQsWQrqKgRNs3V5/BbIV55Zy6jUqtYXZq53Oe4krelg8S2UpvLKcoG3zQ1KOCTGEHNqNdLIZqLMhtyOVuenNa2l4Nyy+yYgO4aB6fzRYb/AAbPZb5RfFGGtIJDidwdLrCTT5fBthDb1gi9kbHXtly7XTDwRxgnlcGbhWGzYlXMoYd32dM77o6Lqppc5bfua7LFXB2SPTK6spOGcHbGxoEjRlYwczZetbZGmB89VVZ6hqOOv6I8yraqWrnfNO/M9xJ328gvDnNzeZH2emphTBQgii6xOrIIUCgEgBQAgBACAkqZAgBCDsoBoBsCDohPOIwQN1thDyzh1Gp28I17pMx/RbDypT3MgbuOmoKpjhvok2P72nRTOCqKLmR36fHa61ykbowyiZa0NOxWCbyZ7eOhZg21szehBRrJN20m+UnVxBHW2qij8jKVjxnsUTs2WV7c4H2TCPG/9vzWyMcGnPufkeocIYTFgOEurq8hsr++97+XkvXprVUOe32eL6hqXfYqq+jhOIMZkxnEn1LiRFtE3o1eXfd7ss+D6P0/Sx01Siu/JrS660nooYKhkF0KhoZAgBACAFACAkqZAgGgJBAWNYPeJA8uSnKNUrYopmjkyEgksF/D/LrZCUP1OG52eXwYZaXuvkc47LdwjilmT6IdmBoWc9LrHKJsz4LGR+6bfBYSmZqHgta3SwbfLqLha28m1IsDxlte3kRoVrcTZGSxyVPdGRcgD+pqySkjCTg1n9zGfKDpH33HkBqtkU2ctlkV0NkYY4NmBdKdoGG//Yj8gtiXg1RjJvL4O74R4XeZG4liwAcNY4zs1ehp9Nj4pdnJrdcq1srKeO+J212XDqF/sG6yOHvHotOs1G74ImfpWicP/vZ34ONB81wH0EWTBQ3RZMIZkghRhQyQIUEAIAUAIBrIyGgGgQ9wbdEEs7Wa/t66NhPZPdG3ctGYD5LPZk+clqbIP4kRbimUjM3mbi+yjrItcvBaMThkHtW69WrD22vwm5ayDXx/sI1kThZsgtyvdXa/IWog+iL62FmpNr66bLJRbMJaiEezHkxGK/cB6WHRVVmiWtgnwQ+uzTaMjPqNv7KqvBr/AIuU+EhhrSbvnJd9yIXPz2/NZcExKfk3GF4JiFaQKeE0sLt3uOp+J/8AFuronY/kiuddK5Z2OFYRhGAM7apka+Yal7zt6LurprpXPZwXauy34azS8RcZyVbDS0ByRkd545+i59Rqm/hgbtLoop77OWcrnudAuDB7am2WMusWb4ZL2qHRFEwENqRIaIZDCjKgQoIAUAIUFQSVKCAEA76a81UG1jk1VTEYZLslLSdiHWWxL5HzuprcJcmLOx8pJkGZ33+fzWeWcE6YyKW0+viePLKEz9DX7El1ItZROd4Y5nn0sssP5D2fmzLhwesf4KGRw/3HH9LKqub6Q9uK7f7mbT8OVxIJZDD581sWnsY3Ux8mxi4apWd6vrr+QNlsWmj/ADMj1EV0smZFPgOFNvExr3D3jqs06q+kYSsvn1wjCxDjU6spGho5WWM9S/Br9qOfiZoKnEaqvdeaUkfduuOc5S7Z20xj/KiMcbjyK1ZwehCqTMhkRUbOuFLL2R2UOqNeCwNUNqiTAQzwFkLgdkAlACgBACpRoBqgEAIUVrqmLMSqoG1GuYg+SqbRwanQRv5bwYhwmdp9nOR6rPf9Dz36PavwWfcX1Cuae7LGfUFZKcfka36ZrF/NFl8cWJM2kj+BKy93BP8AS9S+9pcH4sBYTs+ZV/iGP9Iufy+7AjFHf6to9AVj77ZkvR7fmvs2VOoauTV9Y74N/dT3X8jYvRp+Z/t/ciMGaftKiR/xCxdjM16JD+abZazCqVnIu9SsXNnTD0nTR8ZL20sLPCyywydcdLVDpEuzHQIZ+2hhiGagSAQywOyFEgBCAoBIAUINACpQQg0AKlBAAKAdyhAuVcgAUyBpkEbqZAIAQAhQKASAFAAVGR3QCQZBACASgBCAoAQAgCyoGgJFUgWQoBACAR2Qg2oCTtggIc0KMoQSFJgIYsZAsqCs7qGQFADUAFAJQoKkAoUShAQDUAIAVA0B/9k=',
        price: 200,
        quantity: 1
      }

  ]
}

const isObjectFull = (obj, nonRequire = []) => {

  return Object.keys(obj).every(key => {
    if (nonRequire.includes(key)) {
      return true; // Skip non-required fields
    }
    if (Array.isArray(obj[key])) {
      return obj[key].length > 0; // Ensure arrays are not empty
    }
    return obj[key] !== '' && obj[key] !== null && obj[key] !== undefined;
  });
};

export {isObjectFull};

const BillingDetails = () => {

  const [products, setProducts] = useState({})

  const [cardDetails, setCardDetails] = useState({
    cardType: '',
    offset: '',
    expireDate: '',
    token: '',
    chooseType: ''
  })

  const [orderDetails, setOrderDetails] = useState({
    firstName: '',
    lastName: '',
    orderNote: '',
    shippingAddress: '',
    billingAddress: '',
    emailAddress: '',
    contactNos: [],
    paymentMethod: 'CARD',
    district: '',
    city: ''
  })

  const location = useLocation();
  const { triggerNotifications } = useNotistack()
  // const { state } = location || {};

  const { api } = useAxios()

  useEffect(() => {
    console.log(state)

    if(!state || Object.keys(state).length===0){
      //nav to 404
      return
    }

    setProducts(state?.products)
  }, []);


  const isPlaceOrderValid = () => {
    return (
        isObjectFull(orderDetails, ['orderNote']) &&
        (orderDetails.paymentMethod === 'COD' || isObjectFull(cardDetails)) &&
        products.length > 0
    )
  }

  const placeOrder = () => {

    isPlaceOrderValid() &&
        api.post(
            '/place-order/online',
            {
              ...orderDetails,
              ...(orderDetails.paymentMethod === 'CARD' ? {linkedCardDto : {...cardDetails, linkedCardChoice: cardDetails?.chooseType || 'MENTIONED'}} : {}),
              ...(state?.type === 'cart' ? {cartItems: products.map(product => ({cartItemId: product.id, quantity: product.quantity}))} : {productId: products[0]?.id, quantity: products[0]?.quantity})
            })
              .then(response => {
                if(response.status===200){
                  triggerNotifications([{text: 'Order successfully placed.', variant: 'success'}])
                }
              })
              .catch(error => {
                console.log(error)
              })
              .finally(() => {})
  }

  return (
    <>
      <Container maxWidth="lg">
        <BillingDetailsHeader />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={1} style={{ padding: "20px" }}>
              <BillingForm orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
            </Paper>
            <br></br>
            <Paper elevation={1} style={{ padding: "20px" }}>
              <OrderSummary
                  products={products}
                  setProducts={setProducts}
              />
            </Paper>

          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} style={{ padding: "20px" }}>
              <PaymentGrid
                  setCardDetails={setCardDetails}
                  setOrderDetails={setOrderDetails}
                  orderDetails={orderDetails}
                  placeOrder={placeOrder}
                  isPlaceOrderValid={isPlaceOrderValid}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

export default BillingDetails;