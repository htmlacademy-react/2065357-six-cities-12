import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Map from './map';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();
const offers = [makeFakeOffer()];
const location = offers[0].location;

describe('Component: Map', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Map className="test" location={location} offers={offers} selectedOfferId={null} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
