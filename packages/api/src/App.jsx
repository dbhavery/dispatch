import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SimulatorDev from './pages/SimulatorDev';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/prototype" element={<Dashboard />} />
        <Route path="/dev/simulator" element={<SimulatorDev />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
