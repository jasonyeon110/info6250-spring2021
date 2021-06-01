const ShowStuff = ({ stuff }) => {
  console.log(`Object Key => ${Object.keys(stuff)}`);
  console.log(`Object values${Object.values(stuff)}`);
  return (
    <ul>
      {/* { Object.keys(stuff).map(key => (<li key={key}> {key}: {stuff[key]}</li>))} */}
      { Object.keys(stuff).map(key => (<li key={key}> {key}:  {stuff[key]}</li>))}
    </ul>
  );
};
export default ShowStuff;
