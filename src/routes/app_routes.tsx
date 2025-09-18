import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from '@pages/home';
import { LoginPage } from '@pages/login';
import { DashboardPage } from '@pages/dashboard';
import MainLayout from '@layouts/main_layout';
import { ROUTES } from '@constants/config';
import { PrivateRoute } from '@components/private-route';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.ROOT} replace />} />
      </Route>
    </Routes>
  );
}
