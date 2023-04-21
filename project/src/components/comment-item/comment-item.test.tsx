import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeComment } from '../../utils/mocks';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import CommentItem from './comment-item';

const mockStore = configureMockStore();

describe('Component: CommentItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const comment = makeFakeComment();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <CommentItem comment={comment} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
