import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import CommentForm from './comment-form';
import { NameSpace, Status } from '../../const';

const mockStore = configureMockStore();

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Comments]: {
        postStatus: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });
});
