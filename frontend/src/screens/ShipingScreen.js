import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import ChekoutSteps from '../components/CheckoutSteps';
import { saveShippingAdress } from '../actions/cartAction';

const ShipingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAdress } = cart;

  const [address, setAddress] = useState(shippingAdress.address);
  const [city, setCity] = useState(shippingAdress.city);
  const [postalCode, setPostalCode] = useState(shippingAdress.postalCode);
  const [country, setCountry] = useState(shippingAdress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAdress({
        address,
        city,
        postalCode,
        country,
      })
    );
    history.push('/payment');
  };

  return (
    <FormContainer>
      <ChekoutSteps step1 step2 />

      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          style={{
            marginTop: '20px',
            display: 'block',
          }}
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShipingScreen;
