import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Register from './pages/Register'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Transfer from './pages/Transfer'
import Openacc from './pages/Createaccount'
import Summary from './pages/Accountsummary'
import Close from './pages/Closeaccount'
function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/main" element={<MainPage />} />
          <Route path="/deposit" element={<Deposit />}/>
          <Route path="/withdraw" element={<Withdraw />}/>
          <Route path="/transfer" element={<Transfer />}/>
          <Route path="/create" element={<Openacc />}/>
          <Route path="/summary" element={<Summary />}/>
          <Route path="/close" element={<Close />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
