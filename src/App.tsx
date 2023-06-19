import { Route, Routes } from "react-router-dom";
import { Layout } from "./pages/layout";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/home";
import { HistoricoPage } from "./pages/historico";
import { SolicitarPage } from "./pages/solicitar";
import { RequireAuth } from "./components/required-auth";
import { EmailConfirmationPage, SignUpPage, AdminPage } from "./pages";
import { Project } from "./pages/projetc";
import { ProjectPageForm } from "./pages/projetc/ProjectPageForm";
import { EquipmentsPage } from "./pages/equipment/EquipmentPage";
import { EquipmentPageForm } from "./pages/equipment/EquipamentPageForm";

const ROLES = {
  Admin: "ADMIN",
  Professor: "PROFESSOR",
  Student: "STUDENT",
  External: "EXTERNAL",
};

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/email-confirm/:hashKey"
          element={<EmailConfirmationPage />}
        />
        {/* <Route path="signup" element={<UserSignupPage />} /> */}
        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

        {/* protected routes - Roles: User and Admin */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES.Student,
                ROLES.Admin,
                ROLES.Student,
                ROLES.External,
              ]}
            />
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="/solicitar" element={<SolicitarPage />} />
          <Route path="/projeto" element={<Project />} />
          <Route path="/projeto/form" element={<ProjectPageForm />} />
          <Route path="/projeto/form/:id" element={<ProjectPageForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/equipamento" element={<EquipmentsPage />} />
          <Route path="/equipamento/form" element={<EquipmentPageForm />} />
          <Route path="/equipamento/form/:id" element={<EquipmentPageForm />} />
        </Route>

        {/* protected routes - Role: Admin */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/product-v2" element={<ProductListPageV2 />} />
          <Route path="/product-v2/new" element={<ProductFormPageV2 />} />
          <Route path="/product-v2/:id" element={<ProductFormPageV2 />} />
        </Route> */}

        {/* catch all */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}
