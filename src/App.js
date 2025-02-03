
// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BasicCrud from './Components/Basic_Crud';
import DB_Mobiles from './Components/DB_Mobiles';


function App() {
  return (
    <div className="App">
     {/* <BasicCrud/>
    <DB_Mobiles/> */}
    <BrowserRouter>
    <Routes>
      <Route path='/basic' element={<BasicCrud/>}/>
      <Route path='/' element={<DB_Mobiles/>}/>

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
