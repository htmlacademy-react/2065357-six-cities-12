import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import EmptyMessage from './empty-message';
import { DEFAULT_CITY, NameSpace } from '../../const';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.App]: {
    city: DEFAULT_CITY
  }
});

describe('Component: EmptyMessage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <EmptyMessage currentCity={DEFAULT_CITY} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
