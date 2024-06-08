//  ESTILO
import './style/style.css';

//  PÁGINAS
import HomePage from './paginas/HomePage';
import AboutPage from './paginas/AboutPage';
import BrandsCarsPage from './paginas/BrandsCarsPage';
import CarsPage from './paginas/CarsPage';
import LoginPage from './paginas/LoginPage';
import SignUpPage from './paginas/SignUpPage';
import DashboardPage from './paginas/DashboardPage';
import AnalyzePage from './paginas/AnalyzePage';
import AnalyzeSesionPage from './paginas/AnalyzeSesionPage';
import AnalyzeLapPage from './paginas/AnalyzeLapPage';
import LeaderboardPage from './paginas/LeaderboardPage';
import SessionsPage from './paginas/SessionsPage';
import SettingsPage from './paginas/SettingsPage';
import ProfilePage from './paginas/ProfilePage';
import BestPlayersPage from './paginas/BestPlayersPage';

//  COMPONENTES
import RequireAuth from './componentes/RequireAuth';

//  DEPENDENCIAS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//  CONTEXT
import { ContextProvider } from './contexts/ContextProvider';

function App() {

    return (
        <BrowserRouter>
            <ContextProvider>
                <Routes>

                    <Route path='/' element={<HomePage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/brandscars' element={<BrandsCarsPage />} />
                    <Route path='/brandscars/:marca/' element={<CarsPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage />} />

                    <Route path="/dashboard" element={
                        <RequireAuth>
                            <DashboardPage />
                        </RequireAuth>
                    } />

                    <Route path="/analyze" element={
                        <RequireAuth>
                            <AnalyzePage />
                        </RequireAuth>
                    } />

                    <Route path="/leaderboards" element={
                        <RequireAuth>
                            <LeaderboardPage />
                        </RequireAuth>
                    } />

                    <Route path="/bestplayers" element={
                        <RequireAuth>
                            <BestPlayersPage />
                        </RequireAuth>
                    } />

                    <Route path="/sessions" element={
                        <RequireAuth>
                            <SessionsPage />
                        </RequireAuth>
                    } />

                    <Route path='/sessions/:session_id' element={
                        <RequireAuth>
                            <AnalyzeSesionPage />
                        </RequireAuth>
                    } />

                    <Route path='/sessions/:session_id/lap/:number_lap' element={
                        <RequireAuth>
                            <AnalyzeLapPage />
                        </RequireAuth>
                    } />

                    <Route path="/profile/settings" element={
                        <RequireAuth>
                            <SettingsPage />
                        </RequireAuth>
                    } />

                    <Route path="/profile" element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    } />

                </Routes>
            </ContextProvider>
        </BrowserRouter>
    )
}

export default App
