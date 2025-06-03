import React, { useState } from 'react';
import app from './FirebaseCongfig'; // Make sure this is the correct path and the file exports `app`
import { ref, get, getDatabase } from 'firebase/database';

const Read = () => {
  const [fruitsArray, setFruitsArray] = useState([]);

  const fetchData = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, 'nature/fruits');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const valuesArray = Object.values(data);
        setFruitsArray(valuesArray);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Fruits Data</h2>
      <button onClick={fetchData}>Fetch Fruits</button>
      <ul>
        {fruitsArray.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.fruitname} <br />
            <strong>Definition:</strong> {item.defination}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Read;
