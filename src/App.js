
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from './Components/FromBuilder';

function App() {
  return (
   <Router>
    <Routes>
      <Route element={<FormBuilder/>} path="/builder" exact/> 
    </Routes>
    
   </Router>
  );
}

export default App;
