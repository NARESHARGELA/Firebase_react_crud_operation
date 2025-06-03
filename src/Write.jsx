import React, { useState } from 'react';
import app from './FirebaseCongfig';
import { ref, getDatabase, set, push } from 'firebase/database';

const Write = () => {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    if (!inputValue1 || !inputValue2) {
      alert('Please fill both fields');
      return;
    }

    setLoading(true);

    try {
      const db = getDatabase(app);
      const newDocRef = push(ref(db, 'nature/fruits'));
      await set(newDocRef, {
        fruitname: inputValue1,
        defination: inputValue2,
      });
      alert('Data posted successfully');
      setInputValue1('');
      setInputValue2('');
    } catch (err) {
      console.error(err);
      alert('Error posting data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue1}
        placeholder="Fruit Name"
        onChange={(e) => setInputValue1(e.target.value)}
      /> <br />
      <input
        type="text"
        value={inputValue2}
        placeholder="Definition"
        onChange={(e) => setInputValue2(e.target.value)}
      /> <br />
      <button onClick={saveData} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default Write;
