import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import { appRoutes } from './routes';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}          
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
