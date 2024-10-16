import axios from 'axios';
import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import AnimeResult from '../components/AnimeResult';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSubmitted, setImageSubmitted] = useState(false); // Track if the image has been submitted

  const handleImageUpload = async (image) => {
    setSelectedImage(image);
    setLoading(true);
    setImageSubmitted(true); // Set to true when the image is submitted

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios({
        method: 'POST',
        url: 'https://api.trace.moe/search',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnimeData(response.data.result);
    } catch (error) {
      console.error("Error fetching anime data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6 relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url("../public/anime.png")', // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Container with black background */}
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-bold mb-8 text-white">Otaku Search</h1>

        {/* Centered content when no image is submitted */}
        {!imageSubmitted ? (
          <div className="flex flex-col items-center">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <ImageUpload onImageUpload={handleImageUpload} />
            {loading && <p className="text-center text-white">Searching for anime... 🧑‍💻</p>}
            {animeData && <AnimeResult data={animeData} />}
          </div>
        )}
      </div>

      {/* Made by section at the bottom right */}
      <div className="absolute bottom-4 right-4 text-center transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in">
        <div className="bg-black bg-opacity-80 p-2 rounded-lg shadow-lg hover:bg-opacity-90 transition duration-300">
          <p className="text-white">
            Made by{' '}
            <a
              href="https://twitter.com/HOTHEAD01TH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              @HOTHEAD01TH
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}