import { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { categorySelectors, getAllCategory } from "../features/CategorySlice"
import ListGroup from 'react-bootstrap/ListGroup';
import { getProduct, getProductByCategory } from '../features/ProductSlice';

function Category() {
    const dispatch = useDispatch();
    const category = useSelector(categorySelectors.selectAll);
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getAllCategory()).finally(() => setLoading(false))
    }, [dispatch])
    
    function setActive(elem) {
        var a = document.getElementsByClassName('active')
        for (let index = 0; index < a.length; index++) {
            a[index].classList.remove('active')
        }
        elem.classList.add('active')
    }

    const showAll = () => {
        dispatch(getProduct())
    }

    const categoryClicked = (id) =>{
        dispatch(getProductByCategory(id))
    }

    return (
        <>
            <Col md={2}>
                <h4>Product Category</h4>
                <p>{loading ? "loading..." : ""}</p>
                <hr />
                <ListGroup key="All001">
                    <ListGroup.Item id="All001" className='mb-1 shadow-sm' active action onClick={()=>{
                        setActive(document.getElementById('All001')),showAll()
                    }}>All Product  </ListGroup.Item>
                </ListGroup>
                {category && category.map((item)=>(
                <ListGroup key={item.id}>
                    <ListGroup.Item id={`key${item.id}`} className='mb-1 shadow-sm' action onClick={()=>{
                        setActive(document.getElementById(`key${item.id}`)),categoryClicked(item.id)
                    }}>{item.name}</ListGroup.Item>
                </ListGroup>

                ))}
            </Col>
        </>
    )
}

export default Category