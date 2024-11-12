import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Products';
import LoginSignup from './Pages/LoginSignup';
import ShopCategory from './Pages/ShopCategory';
import Footer from './Components/Footer/Footer';
import banner1 from './Components/Assets/banner1.png'
import banner2 from './Components/Assets/banner2.jpg'
import banner3 from './Components/Assets/banner3.jpg'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>} />
          <Route path='/Men' element={<ShopCategory banner={banner2} category= 'Men'/>} />
          <Route path='/women' element={<ShopCategory banner= {banner1} category= "women"/>} />
          <Route path='/Kids' element={<ShopCategory banner= {banner3} category= "Kids"/>} />
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/LoginSignup' element={<LoginSignup/>} />
          <Route path='/Cart' element={<Cart/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
