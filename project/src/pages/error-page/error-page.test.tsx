import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import ErrorPage from './error-page';
import HistoryRouter from '../../components/history-router/history-router';

const mockStore = configureMockStore();

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ErrorPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
    expect(screen.getByText(/Try again/i)).toBeInTheDocument();
  });
});
