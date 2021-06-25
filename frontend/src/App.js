import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterUserScreen from './screens/RegisterUserScreen';
import RegisterProdScreen from './screens/RegisterProdScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShipingScreen from './screens/ShipingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import FridgeScreen from './screens/FridgeScreen';
import UserListScreen from './screens/UserListScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/shipping' component={ShipingScreen} exact />
          <Route path='/fridge' component={FridgeScreen} exact />
          <Route path='/order/:id' component={OrderScreen} exact />
          <Route path='/payment' component={PaymentScreen} exact />
          <Route path='/placeorder' component={PlaceOrderScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/register' component={RegisterUserScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/registerpro' component={RegisterProdScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
