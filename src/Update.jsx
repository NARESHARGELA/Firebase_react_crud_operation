import React, { useEffect, useState } from 'react';
import app from './FirebaseCongfig';
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove
} from 'firebase/database';

const Update = () => {
  const db = getDatabase(app);
  const [fruits, setFruits] = useState({});
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    fruitname: '',
    defination: ''
  });

  // 🧠 Fetch data on mount
  useEffect(() => {
    const fruitsRef = ref(db, 'nature/fruits');
    onValue(fruitsRef, (snapshot) => {
      if (snapshot.exists()) {
        setFruits(snapshot.val());
      } else {
        setFruits({});
      }
    });
  }, []);

  // 📥 Handle input changes
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✏️ Start editing
  const handleEdit = (id, data) => {
    setEditId(id);
    setForm(data);
  };

  // ✅ Save update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editId) {
      await update(ref(db, `nature/fruits/${editId}`), form);
      setEditId(null);
      setForm({ fruitname: '', defination: '' });
    }
  };

  // ❌ Delete item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      await remove(ref(db, `nature/fruits/${id}`));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{editId ? 'Update Fruit' : 'Select a fruit to edit'}</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="fruitname"
          value={form.fruitname}
          placeholder="Fruit Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="defination"
          value={form.defination}
          placeholder="Definition"
          onChange={handleChange}
        />
        <button type="submit" disabled={!editId}>
          Update
        </button>
      </form>

      <h3>Fruits List</h3>
      <ul>
        {Object.entries(fruits).map(([id, item]) => (
          <li key={id}>
            <strong>{item.fruitname}</strong>: {item.defination}
            <br />
            <button onClick={() => handleEdit(id, item)}>Edit</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Update;
