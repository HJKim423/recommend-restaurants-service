import './App.css';
import Login from './Login';
import Map from './Map';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './Intro';
import Main from './Main';


// 90138a9dfab3401f5b0181cc35933644

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Intro/>}></Route>
        <Route path='/main' element={<Main/>}></Route>
        
      </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
