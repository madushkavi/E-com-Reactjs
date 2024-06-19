import React, { useState, useEffect } from 'react';
import '.././styles/edit.css';
import Button from '@mui/material/Button';

const EditAdvertisement = ({ advertisement, onSave }) => {
  const [title, setTitle] = useState(advertisement.title);
  const [description, setDescription] = useState(advertisement.description);
  const [price, setPrice] = useState(advertisement.price);

  useEffect(() => {
    setTitle(advertisement.title);
    setDescription(advertisement.description);
    setPrice(advertisement.price);
  }, [advertisement]);

  const handleSave = () => {
    const updatedAdvertisement = {
      id: advertisement.id,
      title,
      description,
      price: parseFloat(price),
    };

    console.log("Updated Advertisement on Save:", updatedAdvertisement);
    let advertisements = JSON.parse(localStorage.getItem('advertisements')) || [];

    advertisements = advertisements.map(ad => ad.id === advertisement.id ? updatedAdvertisement : ad);
    localStorage.setItem('advertisements', JSON.stringify(advertisements));
    onSave(updatedAdvertisement);
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
      <Button variant='' onClick={handleSave}>Save</Button>
    </div>
  );
};

export default EditAdvertisement;
