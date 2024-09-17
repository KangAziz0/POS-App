import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/ProductSlice";
import CardComponent from "./CardComponent";
import { addCart, updateCart} from "../features/CartSlice";
import axios from "axios";

function ProductDetail() {
  const products = useSelector((state) => state.product.data);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const setCart = async (product) => {
    const response = await axios.get(`/api/carts/product/${product.id}`);
    if (response.data && response.data.length > 0) {
      // UPDATE CART
      const orderItem = response.data[0];
      orderItem.quantity = parseInt(orderItem.quantity) + 1;
      orderItem.totalPrice = parseInt(orderItem.price) * parseInt(orderItem.quantity);
  
      console.log(orderItem);
      
      dispatch(updateCart(orderItem));
    } else {
   
      // INSERT CART
      const orderItem = {
        quantity: 1,
        price: product.price,
        name: product.name,
        totalPrice: product.price,
        product_id: product.id,
      };
      // console.log(orderItem);
      
      dispatch(addCart(orderItem));
    }
  };

  return (
    <>
      <Col md={7}>
        <h4>Product Details</h4>
        {error ? error : ""}
        <hr />
        <Row style={{maxHeight:"85vh",overflowY:"auto"}}>
          {products ? (
            products.map((item) => (
              <CardComponent key={item.id} product={item} setCart={setCart} />
            ))
          ) : loading ? (
            <p>Loading ...😅</p>
          ) : (
            <p>Data Empty</p>
          )}
        </Row>
      </Col>
    </>
  );
}

export default ProductDetail;
