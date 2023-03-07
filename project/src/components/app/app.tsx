import Main from '../../pages/Main/Main';

type AppScreenProps = {
  placeCardCount: number;
}

function App({ placeCardCount }: AppScreenProps): JSX.Element {
  return (
    <Main placeCardCount={placeCardCount} />
  );
}

export default App;
