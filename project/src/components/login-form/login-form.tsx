import { ChangeEvent, FormEvent, useState } from 'react';
import classes from './login-form.module.scss';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { loginAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getLoginStatus } from '../../store/user-slice/selectors';
import Loader from '../loader/loader';

const EMAIL_PATTERN = /^[_a-z0-9-+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*[a-z])(?=.*[0-9])/g;

const LOGIN_FIELDS: Record<string, string> = {
  email: 'E-mail',
  password: 'Password'
};

type Field = {
  value: string;
  error: boolean;
  pattern: RegExp;
  errorText: string;
};

function LoginForm(): JSX.Element {
  const status = useAppSelector(getLoginStatus);
  const [formData, setFormData] = useState<Record<string, Field>>({
    email: {
      value: '',
      error: false,
      pattern: EMAIL_PATTERN,
      errorText: 'This mail is incorrect'
    },
    password: {
      value: '',
      error: false,
      pattern: PASSWORD_PATTERN,
      errorText: 'Password must contain at least one letter and number'
    }
  });

  const dispatch = useAppDispatch();

  const isValid = Object.values(formData).every((field) => !field.error);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        value: value,
        error: !formData[name].pattern.test(value)
      }
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction({
      login: formData.email.value,
      password: formData.password.value
    }));
  };

  return (
    <form
      className="login__form form"
      action=""
      method="post"
      onSubmit={handleSubmit}
    >
      {Object.entries(LOGIN_FIELDS).map(([name, label]) => (
        <div className="login__input-wrapper form__input-wrapper" key={name}>
          <label className="visually-hidden">{label}</label>
          <input
            className={cn('login__input form__input', formData[name].error && classes.invalid)}
            type={name}
            name={name}
            placeholder={label}
            onChange={handleChange}
            required
          />
          {formData[name].error && (<div className={classes.errorMessage}>{formData[name].errorText}</div>)}
        </div>
      ))}

      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!isValid}
      >
        {status.isLoading ? <Loader /> : 'Sign in'}
      </button>
    </form>
  );
}

export default LoginForm;
