import ToastProvider from '@context/toast_context/provider';
import AuthProvider from '@context/auth_context/provider';
import { AppRoutes } from '@routes/app_routes';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
