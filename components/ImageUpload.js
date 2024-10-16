import { useState } from 'react';

export default function ImageUpload({ onImageUpload }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        id="fileUpload"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <label htmlFor="fileUpload" className="cursor-pointer">
        <div className="bg-purple-500 text-white px-6 py-2 rounded-md mb-4">
          Choose Image
        </div>
      </label>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 h-auto rounded-md border"
        />
      )}
    </div>
  );
}
