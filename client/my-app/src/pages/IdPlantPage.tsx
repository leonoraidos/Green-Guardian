import React, { useState } from 'react';
import { PlantInfo } from '../types/plant';

interface Props {}

const PlantId: React.FC<Props> = () => {

  const [file, setFile] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(file);

    const response = await fetch("http://localhost:3001/idplant", {
      method: "POST",
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: file }),
    });

    const data = await response.json();
    setPlantInfo(data);
    setInputValue("");
    console.log(plantInfo);
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
    <div>
      {plantInfo && (
              <div className="plantIDCard">
                <h2>{plantInfo.plant_name}</h2>
                <h2>OTHER NAME FOR CSS STYLING I WILL NOT MAKE MORE REQS</h2>
                <button>Save to your garden!</button>
              </div>
            )}
    <div className="plantIDCard">
      <h2>Plant Name</h2>
      <button>Save to your garden!</button>
    </div>
    </div>

    </>

  );
};

export default PlantId;