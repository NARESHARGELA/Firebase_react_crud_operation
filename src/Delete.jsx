import React, { useEffect, useState } from 'react';
import app from './FirebaseCongfig';
import {
  getDatabase,
  ref,
  onValue,
  remove
} from 'firebase/database';

const Delete = () => {
  const [fruits, setFruits] = useState({});
  const db = getDatabase(app);

  // 🔄 Fetch data
  useEffect(() => {
    const dbRef = ref(db, 'nature/fruits');
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setFruits(snapshot.val());
      } else {
        setFruits({});
      }
    });
  }, []);

  // ❌ Delete handler
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (confirm) {
      try {
        await remove(ref(db, `nature/fruits/${id}`));
        alert("Item deleted successfully");
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Delete Fruit Entries</h2>
      <ul>
        {Object.entries(fruits).map(([id, item]) => (
          <li key={id}>
            <strong>{item.fruitname}</strong>: {item.defination}
            <button onClick={() => handleDelete(id)} style={{ marginLeft: '10px', color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delete;
