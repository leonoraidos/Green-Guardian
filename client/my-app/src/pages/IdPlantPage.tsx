import React, { useState, useEffect } from 'react';
import { IPlantInfo } from '../types/plant';
import PlantCard from '../components/PlantCard';

interface Props {}

const CACHE_KEY = "identifiedPlant";
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

const PlantId: React.FC<Props> = () => {

  const [file, setFile] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<IPlantInfo | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const cachedPlantInfo = localStorage.getItem(CACHE_KEY);
    if (cachedPlantInfo) {
      const { plantInfo, timestamp } = JSON.parse(cachedPlantInfo);
      if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
        setPlantInfo(plantInfo);
      } else {
        localStorage.removeItem(CACHE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const savePlantInfoToCache = () => {
      if (plantInfo) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            plantInfo,
            timestamp: Date.now(),
          })
        );
      }
    };
    const timerId = setTimeout(savePlantInfoToCache, 1000);
    return () => clearTimeout(timerId);
  }, [plantInfo]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/idplant", {
      method: "POST",
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: file }),
    });

    const data = await response.json();
    setPlantInfo(data);
    setInputValue("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFile(reader.result);
        }
      };
    }

  };

  return (
    <>
      <div className="imageForm">
        <form className="form" onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} value={inputValue}/>
          <button type="submit">Identify Plant</button>
        </form>
      </div>
      <div className="idInfo"><p>When a plant is identified, it will be available to you for 24 hours. If you would like to save it to your collection, click the save button.</p></div>
      <div>
        {plantInfo ? (
          <PlantCard plantInfo={plantInfo} cardClass="idPlantCard" isProfile={false} showAllPlants={true}/>
        ) : (
          <p>No plant identified yet.</p>
        )}
      </div>
    </>
  );
};

export default PlantId;
