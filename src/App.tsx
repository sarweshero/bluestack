import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
    </BrowserRouter>
  )
}

export default App
