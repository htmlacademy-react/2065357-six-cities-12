import { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import MainPage from '../../pages/main-page/main-page';
import { checkAuthAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/reducers/user/selectors';
import Loader from '../loader/loader';
import PrivateRoute from '../private-route/private-route';

const FavoritesPage = lazy(() => import('../../pages/favorites-page/favorites-page'));
const LoginPage = lazy(() => import('../../pages/login-page/login-page'));
const OfferPage = lazy(() => import('../../pages/offer-page/offer-page'));
const Page404 = lazy(() => import('../../pages/page-404/page-404'));

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus.isLoading) {
    return <Loader isSmall={false} />;
  }

  return (
    <Suspense fallback={<Loader isSmall={false} />}>
      <HelmetProvider>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
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
            element={<LoginPage />}
          />
        </Routes>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
