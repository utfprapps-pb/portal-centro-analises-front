import { Routes, Route } from 'react-router-dom'
// import { NavBar } from '../../components/NavBar'
import { HomePage } from '../../pages/home'
import { SolicitarPage } from '../../pages/solicitar'
import { HistoricoPage } from '../../pages/historico'

export function AuthenticatedRoutes() {
    return (
        <>
            {/* <NavBar /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/solicitar" element={<SolicitarPage />} />
                <Route path="/historico" element={<HistoricoPage />} />

                <Route path="*" element={<HomePage />} />
            </Routes>
        </>
    )
}