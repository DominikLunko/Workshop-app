import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useState } from 'react';

import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Homepage/Homepage';
import WorkShopDetails from './pages/WorkshopDetails/WorkshopDetails';
import Checkout from './components/Checkout/Checkout';




const App:React.FC = () => {
 
  const [showCheckout, setShowCheckout] = useState(false)

  
  

  return (
    <Router>
        <Navbar />
        <Cart  setShowCheckout={setShowCheckout}/>
        <Checkout setShowCheckout={setShowCheckout} showCheckout={showCheckout} />
        
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/workshop/:id" component={WorkShopDetails} />
          </Switch>
       
    </Router>
  )
}

export default App;
