import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { Navbar , Cart , Products , Checkout} from './components';
import { commerce } from './lib/commerce';

const App = () => {
 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    {/*} catch (error) {
      setErrorMessage(error.data.error.message);
    } */}
  };

  useEffect(() => {
    fetchProducts();
    fetchCart() ;
  }, []);

  console.log(cart) ;
   
  return (
    <Router>
      <div style={{ display: 'flex' }}>
      <Navbar totalItems={cart.total_items}  />
        <Routes>
          <Route exact path="/"
          element={  <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />}
          />
          <Route exact path="/cart"
           element={ <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />}
          />
         <Route path="/checkout" exact
         element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/> }
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;