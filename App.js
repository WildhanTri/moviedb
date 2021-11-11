import './App.css';
import { Provider } from 'react-redux'
import AppRoute from './AppRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import { store } from './stores/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoute>
        </AppRoute>
      </Provider>
    </div>
  );
}

export default App;
