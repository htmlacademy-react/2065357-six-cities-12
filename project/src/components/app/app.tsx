import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
// import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/page-404/page-404';
import { getAuthorizationStatus } from '../../store/user-slice/selectors';
import HistoryRouter from '../history-router/history-router';
import PrivateRoute from '../private-route/private-route';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
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
          {/* <Route
            path={AppRoute.Offer}
            element={<OfferPage offers={offersByCity} comments={comments} />}
          /> */}
          <Route
            path='*'
            element={<Page404 />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider >
  );
}

export default App;
