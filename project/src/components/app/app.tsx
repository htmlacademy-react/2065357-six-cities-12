import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import OfferPage from '../../pages/offer/offer';
import Page404 from '../../pages/page-404/page-404';
import { Comment } from '../../types/comment';
import { Offer } from '../../types/offer';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: Offer[];
  comments: Comment[];
}

function App({ offers, comments }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main offers={offers} />}
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
            element={<OfferPage offers={offers} comments={comments} />}
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
