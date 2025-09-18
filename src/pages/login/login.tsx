import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/common/button';
import useAuth from '@hooks/use_auth';
import { login, signup } from '@services/auth_service';
import { ROUTES, SEARCH_PARAMS } from '@constants/config';
import getErrorMessage from '@utils/error';
import useToast from '@hooks/use_toast';
import MESSAGES from '@constants/messages';
import { loginSchema, signupSchema } from '@schemas/auth.schema';
import { SignInSignUpFormType } from 'src/types';

const LoginPage = () => {
  const { login: setToken } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSignUpFormType>({
    resolver: yupResolver(isSignup ? signupSchema : loginSchema),
  });

  const onSubmit = async (values: SignInSignUpFormType) => {
    setLoading(true);

    try {
      const trimmedEmail = values.email.trim();
      const trimmedPassword = values.password.trim();

      let data: { token: string };
      if (isSignup) {
        const trimmedName = values.name?.trim() || '';
        data = await signup({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        });
      } else {
        data = await login({
          email: trimmedEmail,
          password: trimmedPassword,
        });
      }

      setToken(data.token);
      const next = searchParams.get(SEARCH_PARAMS.NEXT);
      const dest = next ? decodeURIComponent(next) : ROUTES.DASHBOARD;
      const isSafePath = dest.startsWith('/');
      navigate(isSafePath ? dest : ROUTES.DASHBOARD, { replace: true });
    } catch (err: any) {
      toast.showError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => setIsSignup((v) => !v);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isSignup ? MESSAGES.AUTH_PAGE.TITLE.SIGNUP : MESSAGES.AUTH_PAGE.TITLE.LOGIN}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 card">
        {isSignup && (
          <div>
            <label className="block mb-1">{MESSAGES.AUTH_PAGE.FIELD.NAME}</label>
            <input className="input" {...register('name')} />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          </div>
        )}
        <div>
          <label className="block mb-1">{MESSAGES.AUTH_PAGE.FIELD.EMAIL}</label>
          <input type="email" className="input" {...register('email')} />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block mb-1">{MESSAGES.AUTH_PAGE.FIELD.PASSWORD}</label>
          <input type="password" className="input" {...register('password')} />
          {errors.password && <span className="text-red-600">{errors.password.message}</span>}
        </div>

        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Button type="submit" disabled={loading}>
            {loading
              ? MESSAGES.BUTTONS.LOADING
              : isSignup
                ? MESSAGES.BUTTONS.SIGNUP
                : MESSAGES.BUTTONS.LOGIN}
          </Button>
          <Button type="button" variant="secondary" onClick={handleSwitch}>
            {isSignup ? MESSAGES.BUTTONS.SWITCH_TO_LOGIN : MESSAGES.BUTTONS.SWITCH_TO_SIGNUP}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
