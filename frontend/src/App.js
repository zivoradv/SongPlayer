import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SongList from './componets/songList';

function App() {
  return (
    <div className="App">
      <h1>Kreator Plejliste za Muziku</h1>  
      <SongList/>
      <ToastContainer/>
    </div>
  );
}

export default App;
