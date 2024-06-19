import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import advertisementData from "./Record.json";
import EditAdvertisement from "./components/EditAdvertisement";
import CreateAdvertisement from "./components/CreateAdvertisement";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function App() {
  const [advertisements, setAdvertisements] = useState([]);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const storedAds = localStorage.getItem("advertisements");
    if (storedAds) {
      setAdvertisements(JSON.parse(storedAds));
    } else {
      setAdvertisements(advertisementData);
    }
  }, []);

  const updateLocalStorage = (updatedAdvertisements) => {
    localStorage.setItem(
      "advertisements",
      JSON.stringify(updatedAdvertisements)
    );
  };

  const handleDelete = (id) => {
    const updatedAdvertisements = advertisements.filter(
      (record) => record.id !== id
    );
    setAdvertisements(updatedAdvertisements);
    updateLocalStorage(updatedAdvertisements);
  };

  const handleEdit = (advertisement) => {
    console.log("Editing advertisement:", advertisement);
    setEditing(advertisement);
  };

  const handleSaveEdit = (updatedAdvertisement) => {
    console.log("Saving updated advertisement:", updatedAdvertisement);
    const updatedAdvertisements = advertisements.map((ad) =>
      ad.id === updatedAdvertisement.id ? updatedAdvertisement : ad
    );
    setAdvertisements(updatedAdvertisements);
    updateLocalStorage(updatedAdvertisements);
    setEditing(null);
    console.log("Updated JSON after edit:", updatedAdvertisements);
  };

  const handleCreate = () => {
    setCreating(true);
  };

  const handleSaveCreate = (newAdvertisement) => {
    console.log("Creating new advertisement:", newAdvertisement);
    const updatedAdvertisements = [...advertisements, newAdvertisement];
    setAdvertisements(updatedAdvertisements);
    updateLocalStorage(updatedAdvertisements);
    setCreating(false);
    console.log("Updated JSON after create:", updatedAdvertisements);
  };

  const getMaxId = () => {
    return advertisements.reduce((maxId, ad) => Math.max(maxId, ad.id), 0);
  };

  return (
    <div className="App">
      <NavBar />
      <br />
      <h1>Advertisment Dashboard</h1>
      <div className="add">
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Add Advertisement
        </Button>
      </div>
      
      <div className="left">
        {advertisements.map((record) => (
          <Card sx={{ maxWidth: 445 }} key={record.id}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {record.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {record.description}
                <br />
                {record.price}
              </Typography>
              <CardActions>
                <Chip
                  label="Edit"
                  onClick={() => handleEdit(record)}
                  color="default"
                />
                <Chip
                  label="Delete"
                  icon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDelete(record.id)}
                />
              </CardActions>
            </CardContent>
          </Card>
        ))}
        {editing && (
          <EditAdvertisement advertisement={editing} onSave={handleSaveEdit} />
        )}
        {creating && (
          <CreateAdvertisement onSave={handleSaveCreate} maxId={getMaxId()} />
        )}
      </div>

      
    </div>
  );
}

export default App;
