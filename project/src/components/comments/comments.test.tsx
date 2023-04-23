import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Comments from './comments';
import { makeFakeComment } from '../../utils/mocks';
import { AuthorizationStatus, NameSpace, Status } from '../../const';

const mockStore = configureMockStore();
const comments = [makeFakeComment()];

describe('Component: Comments', () => {
  it('should render correctly when user authorizated', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.Comments]: {
        postStatus: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Comments comments={comments} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('comments')).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should render correctly when user no authorizated', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      },
      [NameSpace.Comments]: {
        postStatus: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Comments comments={comments} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('comments')).toBeInTheDocument();
    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
  });
});
