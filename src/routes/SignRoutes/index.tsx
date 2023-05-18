import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login';
// import { UserSignupPage } from '../../pages/signup'; //TODO

export function SignRoutes() {

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="/signup" element={<UserSignupPage />} /> */}

            <Route path="*" element={<LoginPage />} />
        </Routes>
    )
}