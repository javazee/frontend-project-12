import routes from './utils/routes.js';
import LoginPage from './components/loginPage.jsx';
import NotFoundPage from './components/notFoundPage.jsx';
import ChatPage from './components/chatPage.jsx';
import { ProtectedRoute } from './components/protectedRoute.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.notFound} element={<NotFoundPage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.main} element={<ChatPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;