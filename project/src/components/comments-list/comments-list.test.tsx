import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeComment } from '../../utils/mocks';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import CommentsList from './comments-list';

const mockStore = configureMockStore();

describe('Component: CommentsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const comments = [makeFakeComment()];

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <CommentsList comments={comments} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('comments-list')).toBeInTheDocument();
  });
});
