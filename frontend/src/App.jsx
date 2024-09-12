import "./App.css";
import Category from "./components/Category";
import Order from "./components/Order";
import ProductDetail from "./components/ProductDetail";
import MainLayout from "./layouts/MainLayout";
import { Row } from "react-bootstrap";

function App() {
  return (
    <MainLayout>
      <Row>
        <Category />
        <ProductDetail />
        <Order />
      </Row>
    </MainLayout>
  );
}

export default App;
