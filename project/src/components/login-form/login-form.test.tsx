import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import LoginForm from './login-form';
import { AuthorizationStatus, NameSpace, Status } from '../../const';

const mockStore = configureMockStore();

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        login: '',
        avatarUrl: '',
        status: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});
