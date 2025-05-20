import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { SendMoney } from './pages/TransferMoney'
import { Dashboard } from './pages/Dashboard'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/send' element={ <SendMoney />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
