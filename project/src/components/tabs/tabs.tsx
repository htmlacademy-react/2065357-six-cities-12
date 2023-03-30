import { Link } from 'react-router-dom';
import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import cn from 'classnames';
import { changeCity } from '../../store/action';

type TabsProps = {
  currentCity?: string;
}

function Tabs({ currentCity }: TabsProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li
              className="locations__item"
              key={city}
              onClick={(evt) => {
                evt.preventDefault();

                dispatch(changeCity(city));
              }}
            >
              <Link className={cn('locations__item-link tabs__item', city === currentCity && 'tabs__item--active')} to="/#">
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
