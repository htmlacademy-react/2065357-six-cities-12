import { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import Tabs from '../../components/tabs/tabs';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import cn from 'classnames';
import Loader from '../../components/loader/loader';
import { getIsEmpty, getOffersStatus } from '../../store/reducers/offers/selectors';
import { getCurrentCity } from '../../store/reducers/app/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchOffersAction } from '../../store/api-actions';
import ErrorPage from '../error-page/error-page';
import OffersBoard from '../../components/offers-board/offers-board';

function MainPage(): JSX.Element {
  const status = useAppSelector(getOffersStatus);
  const city = useAppSelector(getCurrentCity);
  const isEmpty = useAppSelector(getIsEmpty);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (status.isLoading) {
    return <Loader isSmall={false} />;
  }

  if (status.isError) {
    return <ErrorPage />;
  }

  return (
    <Layout className="page--gray page--main">
      <main className={cn('page__main page__main--index', isEmpty && 'page__main--index-empty')}>
        <h1 className="visually-hidden">Cities</h1>

        <Tabs currentCity={city} />

        <OffersBoard />

      </main>
    </Layout >
  );
}

export default MainPage;
