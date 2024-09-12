import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { delCart, getCart } from "../features/CartSlice";
import { useEffect } from "react";
import TotalCart from "./totalCart";
import Swal from "sweetalert2";

function Order() {
  const carts = useSelector((state) => state.cart.data);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const deleteCart = (id) => {
    Swal.fire({
      title: "Are You Sure",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delCart(id))
        Swal.fire("Deleted Success", "", "success");
      }else{
        return false
      }
    });
  };

  return (
    <>
      <Col md={3}>
        <h4>Order List</h4>
        {error ? error : ""}
        <hr />
        <ListGroup variant="flush">
          {carts ? (
            carts.map((item) => (
              <ListGroup.Item key={item.id} variant="flush">
                <div className="d-flex justify-content-between">
                  <div className="fw-bold">{item.name}</div>
                  <button
                    className="text-align-center bg-danger text-white px-2"
                    style={{
                      borderRadius: "20px",
                      cursor: "pointer",
                      border: "none",
                    }}
                    onClick={()=>deleteCart(item.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="me-auto">
                    <small>
                      Rp. {parseInt(item.price).toLocaleString("id-ID")}
                    </small>
                  </div>
                  <div className="d-flex gap-5">
                    <small style={{ color: "red" }} className="fw-bold">
                      x {item.qty}
                    </small>
                    <strong>
                      <small>
                        Rp{" "}
                        {parseInt(item.price * item.qty).toLocaleString(
                          "id-ID"
                        )}
                      </small>
                    </strong>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          ) : loading ? (
            <p>Loading ...</p>
          ) : (
            ""
          )}
        </ListGroup>
        <TotalCart carts={carts} />
      </Col>
    </>
  );
}

export default Order;
