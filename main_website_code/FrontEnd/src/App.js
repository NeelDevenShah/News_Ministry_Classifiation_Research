import './App.css';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { Dashboard } from './components/Dashboard';
import { News } from './components/News';
import Stats from "./components/Stats"
import User from './components/User';
import { Report } from './components/Report';
import UserState from './context/Users/UserState';
import Profile from './components/Profile';

function App() {
  return (
    <>

      <UserState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/user" element={<User />}>
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/dashboard" element={<Dashboard />}>
                <Route path="/user/dashboard/news" element={<News />} />
                <Route path="/user/dashboard/stats" element={<Stats />} />
              </Route>
              <Route path="/user/report" element={<Report />} />
            </Route>
            <Route path="" element={<Homepage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserState>
    </>
  );
}

export default App;
