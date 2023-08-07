import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from './Components/FromBuilder';
import FormRender from "./RenderedComponent/FromRender";
import Submission from './Components/Submission';
import HomePage from './Components/HomePage';



function App() {
  return (
   <Router>
    <Routes>
      <Route element={<HomePage/>} path="/" exact></Route>
      <Route element={<FormBuilder/>} path="/builder" exact/> 
      <Route element={<FormRender/>} path="/quiz" exact/> 
      <Route element={<Submission/>} path="/submission" exact/> 
    </Routes>
    
   </Router>
  );
}

export default App;
