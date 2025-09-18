type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

type ToastType = 'success' | 'error' | 'info';
type ToastItem = { id: string; type: ToastType; message: string };

export type { AuthContextValue, ToastType, ToastItem };
