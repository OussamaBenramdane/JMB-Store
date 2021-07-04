import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listStocks, createStock } from '../actions/stockAction';
import FormContainer from '../components/FormContainer';

const StockScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [lequdationDate, setLequdationDate] = useState('');
  const [receptionDate, setReceptionDate] = useState('');

  const dispatch = useDispatch();

  const stockItems = useSelector((state) => state.stockItems);
  const { loading, error, stocks } = stockItems;

  const stockCreate = useSelector((state) => state.stockCreate);
  const {
    loading: stockLoading,
    error: stockError,
    userInfo: stockUserInfo,
  } = stockCreate;

  const totalPrice = (stocks) => {
     let total = 0;

    for (const item in stocks) {
     total += stocks[item].price
    }
    return total;
  };

  const totalStock = (stocks) => {
     let total = 0;

    for (const item in stocks) {
     total += stocks[item].qty
    }
    return total;
  };

  
  const totalItems = (stocks) => {
     let total = 0;

    for (const item in stocks) {
     total ++;
    }
    return total;
  };

  console.log(totalPrice(stocks));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listStocks());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    dispatch(createStock(name, qty, price, lequdationDate, receptionDate));
  };

  return (
    <>
      <h1>Create Stock Order</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Sign Up</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Unitary price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId='qty'>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter qty'
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Row>
                <Col>
                  <Form.Group controlId='receptionDate'>
                    <Form.Label>Reception date</Form.Label>
                    <Form.Control
                      type='date'
                      placeholder='Reception Date'
                      value={receptionDate}
                      onChange={(e) => setReceptionDate(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='lequdtionDtae'>
                    <Form.Label>Lequidation date</Form.Label>
                    <Form.Control
                      type='date'
                      placeholder='Enter Final date'
                      value={lequdationDate}
                      onChange={(e) => setLequdationDate(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Row>

            <Button
              type='submit'
              variant='primary'
              style={{
                marginTop: '20px',
                display: 'block',
              }}
            >
              Add
            </Button>
          </Form>
        </FormContainer>
      )}
      <h1>Stock history</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm'
          variant='dark'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>UNIT PRICE</th>
              <th>ENTRY</th>
              <th>OUT</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{item.lequdationDate.substring(0, 10)}</td>
                <td>{item.receptionDate.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h1>Statistics</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col className='md-4'>
            <div class='card text-white bg-dark mb-3'>
              <div class='card-header'>Section 1</div>
              <div class='card-body'>
                <h5 class='card-title'>Stock Items Count</h5>
                <p class='card-text'>
                  There is a total of <h1 class="text-success">{totalItems(stocks) } Products </h1>  / items in our store 
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div class='card text-white bg-dark mb-3'>
              <div class='card-header'>Section 2</div>
              <div class='card-body'>
                <h5 class='card-title'>Totale Cost</h5>
                <p class='card-text'>
                  There in a total of  <h1 class="text-success">{totalPrice(stocks)} €</h1> Euros of marchendise stocked in
                  our wehrehouses
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div class='card text-white bg-dark mb-3'>
              <div class='card-header'>Section 3</div>
              <div class='card-body'>
                <h5 class='card-title'>Total Stock</h5>
                <p class='card-text'>
                  There is <h1 class="text-success">{totalStock(stocks) } Pcs/Kg</h1> 
                   in total quantity stored in mass of
                  of goods
                </p>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default StockScreen;
