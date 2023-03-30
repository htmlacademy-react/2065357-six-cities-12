import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/page-404/page-404';
import { Comment } from '../../types/comment';
import { Offer } from '../../types/offer';
import { getOffersByCity } from '../../utils/common';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: Offer[];
  comments: Comment[];
}

function App({ offers, comments }: AppProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const offersByCity = getOffersByCity(currentCity, offers);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main currentCity={currentCity} offers={offersByCity} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <Favorites offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage offers={offersByCity} comments={comments} />}
          />
          <Route
            path='*'
            element={<Page404 />}
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider >
  );
}

export default App;
