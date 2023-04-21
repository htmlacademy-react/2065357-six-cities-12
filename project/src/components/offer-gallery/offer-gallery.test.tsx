import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import OfferGallery from './offer-gallery';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();

describe('Component: OfferGallery', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = makeFakeOffer();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <OfferGallery images={offer.images} type="test" />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
  });
});
