import { ChangeEvent, FormEvent, useState } from 'react';
import classes from './login-form.module.scss';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

const EMAIL_PATTERN = /^[_a-z0-9-+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*[a-z])(?=.*[0-9])/g;

type Input = {
  value: string;
  dirty: boolean;
  pattern: RegExp;
  errorText: string;
};

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<Input>({
    value: '',
    dirty: false,
    pattern: EMAIL_PATTERN,
    errorText: 'This mail is incorrect'
  });

  const [password, setPassword] = useState<Input>({
    value: '',
    dirty: false,
    pattern: PASSWORD_PATTERN,
    errorText: 'Password must contain at least one letter and number'
  });

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      login: email.value,
      password: password.value
    });
  };

  return (
    <form
      className="login__form form"
      action=""
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className={cn('login__input form__input', email.dirty && classes.invalid)}
          type="email"
          name="email"
          placeholder="Email"
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            setEmail({
              ...email,
              value: evt.target.value,
              dirty: !email.pattern.test(evt.target.value)
            });
          }}
          required
        />
        {email.dirty && (<div className={classes.errorMessage}>{email.errorText}</div>)}
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className={cn('login__input form__input', password.dirty && classes.invalid)}
          type="password"
          name="password"
          placeholder="Password"
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            setPassword({
              ...password,
              value: evt.target.value,
              dirty: !password.pattern.test(evt.target.value)
            });
          }}
          required
        />
        {password.dirty && (<div className={classes.errorMessage}>{password.errorText}</div>)}
      </div>

      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={email.dirty || password.dirty}
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
