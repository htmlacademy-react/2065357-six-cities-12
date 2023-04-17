import { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import MainPage from '../../pages/main-page/main-page';
import { checkAuthAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/reducers/user/selectors';
import HistoryRouter from '../history-router/history-router';
import Loader from '../loader/loader';
import PrivateRoute from '../private-route/private-route';

const FavoritesPage = lazy(() => import('../../pages/favorites-page/favorites-page'));
const LoginPage = lazy(() => import('../../pages/login-page/login-page'));
const OfferPage = lazy(() => import('../../pages/offer-page/offer-page'));
const Page404 = lazy(() => import('../../pages/page-404/page-404'));

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader isSmall={false} />}>
      <HelmetProvider>
        <HistoryRouter history={browserHistory}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<MainPage />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                >
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferPage />}
            />
            <Route
              path='*'
              element={<Page404 />}
            />
            <Route
              path={AppRoute.Login}
              element={<LoginPage authorizationStatus={authorizationStatus} />}
            />
          </Routes>
        </HistoryRouter>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
