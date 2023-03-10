import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Favorites from '../../pages/Favorites/Favorites';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Offer from '../../pages/Offer/Offer';
import Page404 from '../../pages/Page404/Page404';
import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

type AppScreenProps = {
  placeCardCount: number;
}

function App({ placeCardCount }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<Main placeCardCount={placeCardCount} />} />
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
        </Route>
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
