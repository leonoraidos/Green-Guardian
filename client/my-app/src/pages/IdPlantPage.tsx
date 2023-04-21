import React, { useState } from 'react';
import { PlantInfo } from '../types/plant';

interface Props {}

const PlantId: React.FC<Props> = () => {

  const [file, setFile] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(file);

    const response = await fetch("http://localhost:3001/idplant", {
      method: "POST",
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: file }),
    });

    console.log(response.body);

    const data = await response.json();
    setPlantInfo(data);
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
    <div className="imageForm">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Identify Plant</button>
      </form>
      {plantInfo && (
        <div>
          <h2>{plantInfo.name}</h2>
          <p>{plantInfo.description}</p>
          <a href={plantInfo.url}>Learn more about this plant</a>
        </div>
      )}
    </div>
  );
};

export default PlantId;