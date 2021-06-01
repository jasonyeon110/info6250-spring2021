const ShowStuff = ({ stuff }) => {
  return (
    <ul>
      { Object.keys(stuff).map( key => ( <li key={key}>{key}: {stuff[key]}</li> ) ) }
    </ul>
  );
};
export default ShowStuff;
