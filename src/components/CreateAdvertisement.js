import React, { useState } from 'react';
import '.././styles/edit.css';
import Button from '@mui/material/Button';

const CreateAdvertisement = ({ onSave, maxId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    const newAdvertisement = {
      id: maxId + 1,
      title,
      description,
      price: parseFloat(price),
    };
    onSave(newAdvertisement);
  };

  return (
    <div className="form">
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <Button variant='contained' onClick={handleSave}>Create</Button>
    </div>
  );
};

export default CreateAdvertisement;
