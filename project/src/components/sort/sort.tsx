import { useRef, useState } from 'react';
import cn from 'classnames';
import { SortType } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { changeSortType } from '../../store/action';
import { useOnClickOutside } from '../../hooks/use-on-click-outside/use-on-click-outside';

type SortProps = {
  currentSortType: SortType;
}

function Sort({ currentSortType }: SortProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef(null);

  const dispatch = useAppDispatch();

  useOnClickOutside(sortRef, () => setIsOpen(false));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options places__options--custom', isOpen && 'places__options--opened')} ref={sortRef}>
        {Object.values(SortType).map((sortType) => (
          <li
            className={cn('places__option', { 'places__option--active': sortType === currentSortType })}
            tabIndex={0}
            key={sortType}
            onClick={(evt) => {
              evt.preventDefault();

              dispatch(changeSortType(sortType));
              setIsOpen(false);
            }}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
