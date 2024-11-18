
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/index.jsx"
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <BrowserRouter>
    <App />
   </BrowserRouter>
</Provider>
)