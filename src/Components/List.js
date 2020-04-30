import React from 'react';

const List = ({ items, jauheliha, remove}) => (
    <ul>
      {
        items.map((item, index) => <li key={index}>{item}  <button onClick={(event) => {
            event.preventDefault();
            remove(item)
        }}>Poista</button></li>)
      }
      <p>Jauhelihan määrä on aina {jauheliha}</p>
    </ul>
  );

export default List;