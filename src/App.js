import './App.css';
import MainPage from './components/pages/MainPage';
import Navbar from './components/ux/Navbar';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Footer from './components/ux/Footer';
import './CusstomScrollBar.css'
import Product from './components/pages/ProductPage';
import ProfilePage from './components/pages/ProfilePage';
import CartPage from './components/pages/CartPage';
import CategoriesPage from './components/pages/CategoriesPage';
import { Link } from 'react-router-dom';
import { BiHomeAlt2, BiCategoryAlt  } from "react-icons/bi";
import { LuHeart, LuUser2  } from "react-icons/lu";
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import PublicOfferPage from './components/pages/PublicOfferPage';
import PaymentPage from './components/pages/PaymentPage';
import { useEffect, useState } from 'react';
import CategoriesModal from './components/ux/modals/CategoriesModal';
import AboutUsPage from './components/pages/AboutUsPage';

const BottomTabs = ({ onCategoryPress  }) => {
  
  return (
    <nav className="fixed z-50 bottom-0 left-0 right-0 mobile:flex tablet:hidden justify-around rounded-tl-2xl rounded-tr-2xl p-4 bg-[#FFF]">
      <Link to='/main?cat=all'>
        <BiHomeAlt2 className='text-4xl text-[#0D0D0D]/60'/>
      </Link>
      <button onClick={onCategoryPress} to='/categories'>
        <BiCategoryAlt  className='text-4xl text-[#0D0D0D]/60'/>
      </button>
      <Link to='/cart'>
        <IoCartOutline className='text-4xl text-[#0D0D0D]/60'/>
      </Link>
      <Link to='/profile/favourite'>
        <LuHeart className='text-4xl text-[#0D0D0D]/60'/>
      </Link>
      <Link to='/profile/info'>
        <LuUser2 className='text-4xl text-[#0D0D0D]/60'/>
      </Link>
    </nav>
  );
};


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isShowCategories, setIsShowCategories] = useState(false);
  // Функция для получения значения куки по имени
  const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  };
  useEffect(() => {
      const authToken = getCookie("auth_token");
      setIsLogged(!!authToken); 
  }, []);
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen App overflow-y-hidden">
        <Navbar/>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/profile/:category' element={<ProfilePage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/categories' element={<CategoriesPage/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
          <Route path='/public-offer' element={<PublicOfferPage/>}/>
          <Route path='/payment' element={<PaymentPage/>}/>
          <Route path='/about-us' element={<AboutUsPage/>}/>
        </Routes>
        { isLogged && <BottomTabs onCategoryPress={() => setIsShowCategories(true)}/> }
        { isShowCategories && <CategoriesModal onClose={() => setIsShowCategories()}/> }
        <div className={ isLogged ? "mobile:mb-12 tablet:mb-0" : "mobile:mb-0 tablet:mb-0" }>
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;