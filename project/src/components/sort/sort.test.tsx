import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { DEFAULT_SORT_TYPE, NameSpace } from '../../const';
import Sort from './sort';

const mockStore = configureMockStore();

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.App]: {
        sortType: DEFAULT_SORT_TYPE
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sort currentSortType={DEFAULT_SORT_TYPE} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
