import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page-404/page-404';
import { Comments } from '../../types/comments';
import { Offers } from '../../types/offer';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  placeCardCount: number;
  offers: Offers;
  comments: Comments;
}

function App({ placeCardCount, offers, comments }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main placeCardCount={placeCardCount} offers={offers} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<Offer />}
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
