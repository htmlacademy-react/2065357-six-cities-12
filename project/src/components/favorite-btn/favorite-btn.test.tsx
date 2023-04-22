import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeOffer } from '../../utils/mocks';
import FavoriteButton from './favorite-btn';
import { AuthorizationStatus, NameSpace } from '../../const';

const mockStore = configureMockStore();
const offer = makeFakeOffer();

describe('Component: FavoriteButton', () => {
  it('should render correctly when offer is favorite', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
    });
    offer.isFavorite = true;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteButton className="property" id={offer.id} isFavorite={offer.isFavorite} />
        </HistoryRouter>
      </Provider>
    );

    screen.getByRole('button').classList.contains('property__button--bookmark-button--active');
  });

  it('should render correctly when offer is not favorite', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
    });
    offer.isFavorite = false;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteButton className="property" id={offer.id} isFavorite={offer.isFavorite} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).not.toHaveClass('property__button--bookmark-button--active');
  });
});
