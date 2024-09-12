import { Card, Col } from "react-bootstrap"
import PropTypes from "prop-types"
const CardComponent = ({product,setCart}) => {
  return (
    <Col md={4} xs={4} className="mb-4">
      <Card className="shadow" onClick={() => setCart(product)} style={{cursor:"pointer"}}>
        <Card.Img variant="top" src={product.image}  style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Rp. {product.price.toLocaleString('id-ID')}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

CardComponent.propTypes ={
  product:PropTypes.object,
  setCart:PropTypes.func
}

export default CardComponent