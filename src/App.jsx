import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import { appRoutes } from './routes';
import { Suspense } from 'react';
import Spinner2 from './components/Spinner2';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner2 />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}

export default App
