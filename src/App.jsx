import './App.css';
import { Route, Routes } from 'react-router-dom';
import { getAllSets, getSetById } from './services/sets';
import { getAllSeries, getSeriesById } from './services/series';
import Home from './pages/Home';
import Series from './pages/Series';
import Sets from './pages/Sets';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/series' element={<Series />} />
        <Route path='/sets' element={<Sets />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
