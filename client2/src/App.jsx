import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problems from './components/Problems';
import CodeEditor from './components/CodeEditor';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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
        </Routes>
      </div>
    </Router>
  );
}