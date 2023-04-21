type GoodsListProps = {
  goods: string[];
}

function GoodsList({ goods }: GoodsListProps): JSX.Element {
  return (
    <ul className="property__inside-list" data-testId="goods-list">
      {goods.map((good) => (
        <li className="property__inside-item" key={good}>
          {good}
        </li>))}
    </ul>
  );
}

export default GoodsList;
