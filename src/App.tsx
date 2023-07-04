import { Route, Routes } from "react-router-dom";
import { Layout } from "./pages/layout";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/home";
import { HistoricoPage } from "./pages/historico";
import { SolicitarPage } from "./pages/solicitar";
import { RequireAuth } from "./components/required-auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts";
import { EmailConfirmationPage, SignUpPage, ProfilePage, AdminPage, PartnerListPage, PartnerPage, AprovacoesPage } from "./pages";
import { NotFound } from "./pages/notFound";
import { Project } from "./pages/projetc";
import { ProjectPageForm } from "./pages/projetc/ProjectPageForm";
import { EquipmentsPage } from "./pages/equipment/EquipmentPage";
import { EquipmentPageForm } from "./pages/equipment/EquipamentPageForm";
import { AprovacoesView } from "./pages/aprovacoes/AprovacoesView";
import { ROLES } from "./commons/roles";
import { Transaction } from "./pages/transaction/list";
import { TransactionPageForm } from "./pages/transaction/form";

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

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES.Student,
                ROLES.External,
                ROLES.Professor,
                ROLES.Admin,
              ]}
            />
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="/solicitar" element={<SolicitarPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES.External,
              ]}
            />
          }
        >
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES.Professor,
                ROLES.Admin,
              ]}
            />
          }
        >
          <Route path="/projeto" element={<Project />} />
          <Route path="/projeto/form" element={<ProjectPageForm />} />
          <Route path="/projeto/form/:id" element={<ProjectPageForm />} />
          <Route path="/aprovacoes" element={<AprovacoesPage />} />
          <Route path="/aprovacoes/view/:id" element={<AprovacoesView />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES.Admin,
              ]}
            />
          }
        >
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/equipamento" element={<EquipmentsPage />} />
          <Route path="/equipamento/form" element={<EquipmentPageForm />} />
          <Route path="/equipamento/form/:id" element={<EquipmentPageForm />} />
          <Route path="/partner" element={<PartnerListPage />} />
          <Route path="/partner/new" element={<PartnerPage />} />
          <Route path="/partner/:id" element={<PartnerPage />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/new" element={<TransactionPageForm />} />
          <Route path="/transaction/:id" element={<TransactionPageForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
