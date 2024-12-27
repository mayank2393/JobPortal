import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import CategoryCarousel from './CategoryCarousel'
import HeroSection from './HeroSection'
import Footer from './shared/Footer'
import LatestJobs from './LatestJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("/admin/companies")
    }
  },[]);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home