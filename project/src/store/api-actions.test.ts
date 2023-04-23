import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchCommentsAction, fetchFavoritesAction, fetchNearOffersAction, fetchOfferAction, fetchOffersAction, loginAction, logoutAction, sendCommentAction, toggleFavoriteAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/store';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import { pushNotification } from './reducers/notifications/notifications';
import { makeFakeComment, makeFakeOffer } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      fetchFavoritesAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456vc' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      pushNotification.type,
      fetchFavoritesAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch Load_Offers when GET /offers', async () => {
    const mockOffers = Array.from({ length: 5 }, makeFakeOffer);
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Offer when GET /offers', async () => {
    const mockOffer = makeFakeOffer();
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOffer.id}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchOfferAction(mockOffer.id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Near_Offers when GET /offers', async () => {
    const mockOffer = makeFakeOffer();
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`)
      .reply(200, [mockOffer]);

    const store = mockStore();

    await store.dispatch(fetchNearOffersAction(mockOffer.id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchNearOffersAction.pending.type,
      fetchNearOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Favorite_Offers when GET /favorite', async () => {
    const mockOffer = makeFakeOffer();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, [mockOffer]);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type
    ]);
  });

  it('should dispatch Toggle_Favorite_Offer when POST /favorite', async () => {
    const mockOffer = makeFakeOffer();
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockOffer.id}/${+mockOffer.isFavorite}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(toggleFavoriteAction(mockOffer));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      toggleFavoriteAction.pending.type,
      toggleFavoriteAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Comments when GET /comments', async () => {
    const mockComments = Array.from({ length: 5 }, makeFakeComment);
    const mockOffer = makeFakeOffer();
    mockAPI
      .onGet(`${APIRoute.Comments}/${mockOffer.id}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(mockOffer.id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch Send_Comment when POST /comments', async () => {
    const mockComments = Array.from({ length: 5 }, makeFakeComment);
    const mockNewComment = makeFakeComment();

    mockAPI
      .onPost(`${APIRoute.Comments}/${mockNewComment.id}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(sendCommentAction(mockNewComment));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      sendCommentAction.fulfilled.type
    ]);
  });
});
