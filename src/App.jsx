import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GridScan from './components/GridScan';
import Home from './pages/Home';
import Products from './pages/Products';
import Careers from './pages/Careers';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import DeleteAccount from './pages/DeleteAccount';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="grid-scan-background">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#392e4e"
            gridScale={0.1}
            scanColor="#FF9FFC"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.6}
            chromaticAberration={0.002}
            noiseIntensity={0.01}
          />
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
