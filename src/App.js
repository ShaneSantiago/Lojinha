import { ResultsProvider } from "./Components/Context/GlobalContext";
import Header from "./Components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TelaInicial from "./Paginas/TelaInicial/TelaInicial";

function App() {
  return (
    <ResultsProvider>
      <Header />
     <TelaInicial />
     <ToastContainer />
    </ResultsProvider>
  );
}

export default App;


