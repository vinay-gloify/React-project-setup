import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Router from './navigation/Router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
      <Router />
    </BrowserRouter>
  );
}

export default App;
