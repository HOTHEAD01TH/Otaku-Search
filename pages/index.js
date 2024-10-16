import axios from 'axios';
import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import AnimeResult from '../components/AnimeResult';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (image) => {
    setSelectedImage(image);
    setLoading(true);

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl text-center font-bold mb-8">Anime Finder</h1>

      <ImageUpload onImageUpload={handleImageUpload} />

      {loading && <p className="text-center">Searching for anime... 🧑‍💻</p>}

      {animeData && <AnimeResult data={animeData} />}
    </div>
  );
}
