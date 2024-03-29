import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import LoginForm from '../../components/login-form/login-form';
import { AppRoute, Cities } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { changeCity } from '../../store/reducers/app/app';
import { getAuthStatus } from '../../store/reducers/user/selectors';
import { getRandomCity } from '../../utils/common';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const randomCity = getRandomCity(Object.values(Cities));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authorizationStatus.isAuth) {
    return (
      <Navigate to={AppRoute.Main} />
    );
  }

  return (
    <Layout
      pageTitle="Login"
      className="page--gray page--login"
      hasNav={false}
    >
      <main className="page__main page__main--login" data-testid="login-page">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="/#"
                onClick={(evt) => {
                  evt.preventDefault();

                  dispatch(changeCity(randomCity));
                  navigate(AppRoute.Main);
                }}
              >
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default LoginPage;
