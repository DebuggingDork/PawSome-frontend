import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import SuccessStories from "../pages/SuccessStories/SuccessStories";
import FindMatch from "../pages/FindMatch/FindMatch";
import MyPets from "../pages/MyPets/MyPets";
import Messages from "../pages/Messages/Messages";
import Profile from "../pages/Profile/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/how-it-works" element={<HowItWorks />}/>

      <Route path="/success-stories" element={<SuccessStories />}/>

      <Route path="/find-match" element={<FindMatch />} />

      <Route path="/my-pets" element={<MyPets />} />

      <Route path="/messages" element={<Messages />} />
      
      <Route path="/profile" element={<Profile />} />

      
    </Routes>
  );
}

export default AppRoutes;