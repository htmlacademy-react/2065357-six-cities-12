import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Mark from './mark';

const mockStore = configureMockStore();

describe('Component: Mark', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Mark className="test" text="test" />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('mark')).toBeInTheDocument();
  });
});
