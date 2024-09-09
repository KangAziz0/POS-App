import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { categorySelectors, getAllCategory } from "../features/CategorySlice"
import ListGroup from 'react-bootstrap/ListGroup';

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

    return (
        <>
            <Col md={2}>
                <h4>Product Category</h4>
                <p>{loading ? "loading..." : ""}</p>
                <hr />
                <ListGroup key="All001">
                    <ListGroup.Item id="All001" className='mb-1 shadow-sm' active>All Product  </ListGroup.Item>
                </ListGroup>
            </Col>
        </>
    )
}

export default Category