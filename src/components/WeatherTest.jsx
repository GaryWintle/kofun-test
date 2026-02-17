'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const weatherImages = {
  Clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=400',
  Clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400',
  Rain: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=400',
  Snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400',
  // Add more as needed
};

const WeatherTest = () => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const MY_API = 'c63466566a94eed443aa24282e402241';
  const myLat = 34.57;
  const myLon = 135.48;

  useEffect(() => {
    async function getWeather(lat, lon) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MY_API}`,
        );

        if (!response.ok) {
          throw new Error('Weather data not available!');
        }

        const data = await response.json();
        console.log(data.weather[0].main);
        const currentWeather = data.weather[0].main;
        setWeather(currentWeather);
      } catch (err) {
        console.error('Error fetching weather', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getWeather(myLat, myLon);
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div>
          <h2>Current weather: {weather}</h2>
          <Image
            src={weatherImages[weather]}
            alt={`${weather} weather`}
            width={400}
            height={300}
            style={{ borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherTest;
