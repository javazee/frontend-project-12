import routes from './utils/routes.js';
import LoginPage from './components/loginPage.jsx';
import NotFoundPage from './components/notFoundPage.jsx';
import MainPage from './components/mainPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.notFound} element={<NotFoundPage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.main} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
