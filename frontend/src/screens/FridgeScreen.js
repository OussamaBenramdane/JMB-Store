import React, { useState, useEffect } from 'react';
import { Table, Form, Image, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import Moment from 'moment';

import { listMyOrders, listMyOrdersItems } from '../actions/orderActions';

const FridgeScreen = ({ location, history }) => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderItems = useSelector((state) => state.orderItems);
  const {
    loading: loadingOrderItems,
    error: errorOrderItems,
    ordersItems,
  } = orderItems;

  const dateNow = new Date();

  // const prodDetails = useSelector((state) => state.prodDetails);
  // const { loading, error, prod } = prodDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
        dispatch(listMyOrdersItems());
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <div>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Row>
        <Col md={12}>
          <h2>My Orders</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row>
              <Col md={12}>
                {loadingOrders ? (
                  <Loader />
                ) : errorOrders ? (
                  <Message variant='danger'>{errorOrders}</Message>
                ) : (
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    calssName='table-sm'
                    variant='dark'
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERD</th>
                        <th>INFO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 100)
                            ) : (
                              <i
                                className='fas fa-times'
                                style={{ color: 'red' }}
                              ></i>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              order.deliveredAtAt.substring(0, 100)
                            ) : (
                              <i
                                className='fas fa-times'
                                style={{ color: 'red' }}
                              ></i>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button className='btn-sm' variant='light'>
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h2>My Fridge</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div>
              <Row>
                <Col md={6}>
                  {loadingOrderItems ? (
                    <Loader />
                  ) : errorOrderItems ? (
                    <Message variant='danger'>{errorOrderItems}</Message>
                  ) : (
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      calssName='table-sm'
                    >
                      <thead>
                        <tr className='table-success'>
                          <th colspan='3' className='text-center'>
                            Not expierd
                          </th>
                        </tr>
                        <tr className='table-success'>
                          <th>PRODUCT</th>
                          <th>EXPERATION DATE</th>
                          <th>DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersItems.map((orderItem) =>
                          orderItem.isPromp &&
                          Moment(orderItem.expDate).diff(dateNow, 'days') >
                            30 ? (
                            <tr key={orderItem._id} className='table-success'>
                              <td>
                                <Image
                                  style={{ height: '30px' }}
                                  src={orderItem.image}
                                  alt={orderItem.name}
                                  fluid
                                  rounded
                                />{' '}
                                {orderItem.name}
                              </td>
                              <td>{orderItem.expDate.substring(0, 10)}</td>
                              <td>
                                <LinkContainer
                                  to={`/product/${orderItem.product}`}
                                >
                                  <Button className='btn-sm' variant='light'>
                                    Details
                                  </Button>
                                </LinkContainer>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </Table>
                  )}
                </Col>
                <Col md={6}>
                  {loadingOrderItems ? (
                    <Loader />
                  ) : errorOrderItems ? (
                    <Message variant='danger'>{errorOrderItems}</Message>
                  ) : (
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      calssName='table-sm'
                      style={{ backgroundColor: 'red' }}
                    >
                      <thead>
                        <tr className='table-warning'>
                          <th colspan='3' className='text-center'>
                            Nearly Expierd
                          </th>
                        </tr>
                        <tr className='table-warning'>
                          <th>PRODUCT</th>
                          <th>EXPERATION DATE</th>
                          <th>DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersItems.map((orderItem) =>
                          orderItem.isPromp &&
                          Moment(orderItem.expDate).diff(dateNow, 'days') > 1 &&
                          Moment(orderItem.expDate).diff(dateNow, 'days') <
                            7 ? (
                            <tr key={orderItem._id} className='table-warning'>
                              <td>
                                <Image
                                  style={{ height: '30px' }}
                                  src={orderItem.image}
                                  alt={orderItem.name}
                                  fluid
                                  rounded
                                />{' '}
                                {orderItem.name}
                              </td>
                              <td>{orderItem.expDate.substring(0, 10)}</td>
                              <td>
                                <LinkContainer
                                  to={`/product/${orderItem.product}`}
                                >
                                  <Button className='btn-sm' variant='light'>
                                    Details
                                  </Button>
                                </LinkContainer>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {loadingOrderItems ? (
                    <Loader />
                  ) : errorOrderItems ? (
                    <Message variant='danger'>{errorOrderItems}</Message>
                  ) : (
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      calssName='table-sm'
                    >
                      <thead>
                        <tr className='table-danger'>
                          <th colspan='3' className='text-center'>
                            Expierd "(It can be consumed)"
                          </th>
                        </tr>
                        <tr className='table-danger'>
                          <th>PRODUCT</th>
                          <th>EXPERATION DATE</th>
                          <th>DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersItems.map((orderItem) =>
                          orderItem.isPromp &&
                          Moment(orderItem.expDate).diff(dateNow, 'days') >=
                            -7 &&
                          Moment(orderItem.expDate).diff(dateNow, 'days') <=
                            0 ? (
                            <tr key={orderItem._id} className='table-danger'>
                              <td>
                                <Image
                                  style={{ height: '30px' }}
                                  src={orderItem.image}
                                  alt={orderItem.name}
                                  fluid
                                  rounded
                                />{' '}
                                {orderItem.name}
                              </td>
                              <td>{orderItem.expDate.substring(0, 10)}</td>
                              <td>
                                <LinkContainer
                                  to={`/product/${orderItem.product}`}
                                >
                                  <Button className='btn-sm' variant='light'>
                                    Details
                                  </Button>
                                </LinkContainer>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </Table>
                  )}
                </Col>
                <Col md={6}>
                  {loadingOrderItems ? (
                    <Loader />
                  ) : errorOrderItems ? (
                    <Message variant='danger'>{errorOrderItems}</Message>
                  ) : (
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      calssName='table-sm'
                    >
                      <thead>
                        <tr className='table-primary'>
                          <th colspan='3' className='text-center'>
                            Expierd "(Do not consume)"
                          </th>
                        </tr>
                        <tr className='table-primary'>
                          <th>PRODUCT</th>
                          <th>EXPERATION DATE</th>
                          <th>DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersItems.map((orderItem) =>
                          orderItem.isPromp &&
                          Moment(orderItem.expDate).diff(dateNow, 'days') <=
                            -7 ? (
                            <tr key={orderItem._id} className='table-primary'>
                              <td>
                                <Image
                                  style={{ height: '30px' }}
                                  src={orderItem.image}
                                  alt={orderItem.name}
                                  fluid
                                  rounded
                                />
                                {orderItem.name}
                              </td>
                              <td>{orderItem.expDate.substring(0, 10)}</td>
                              <td>
                                <LinkContainer
                                  to={`/product/${orderItem.product}`}
                                >
                                  <Button className='btn-sm' variant='light'>
                                    Details
                                  </Button>
                                </LinkContainer>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )
                        )}
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FridgeScreen;
