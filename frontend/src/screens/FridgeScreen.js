import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,

} from '../actions/userActions';


import {listMyOrders} from '../actions/orderActions';

const FridgeScreen = ({ location, history }) => {

  const [message, setMessage] = useState(null);


  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // const prodDetails = useSelector((state) => state.prodDetails);
  // const { loading, error, prod } = prodDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders , error:errorOrders , orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders())
      }
    }
  }, [dispatch, history, userInfo, user]);


  return (
    <Row>
      <Col md={12}>
      <h2>My Fridge</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : user.isProd ? (
          <Row>
            <Col md ={12}>
            
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>:(
              <Table striped bordered hover responsive calssName='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERD</th>
                    <th>DELIVERD</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order=>(
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0,10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0,100):(
                        <i className='fas fa-times' style={{color:'red'}}></i>
                      )}</td>
                      <td>{order.isDelivered ? order.deliveredAtAt.substring(0,100):(
                        <i className='fas fa-times' style={{color:'red'}}></i>
                      )}</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant="light">Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            )}
            </Col>
            <Col></Col>
          </Row>
        ) : (
            <p></p>
        )}
      </Col>
    </Row>
  );
};

export default FridgeScreen;
