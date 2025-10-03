import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Series from './pages/Series';
import Sets from './pages/Sets';
import SetDetail from './pages/SetDetail';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import SeriesDetail from './pages/SeriesDetail';
import CardDetail from './pages/CardDetail';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/cards/:id' element={<CardDetail />} />
        <Route path='/series' element={<Series />} />
        <Route path='/series/:id' element={<SeriesDetail />} />
        <Route path='/sets' element={<Sets />} />
        <Route path='/sets/:id' element={<SetDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
