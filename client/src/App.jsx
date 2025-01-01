import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import CodeEditor from "./components/CodeEditor";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problem/:id" element={<CodeEditor />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}
