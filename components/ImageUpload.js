import { useState } from 'react';

export default function ImageUpload({ onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected file

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file); // Store the selected file
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onImageUpload(selectedFile); // Call the upload function with the selected file
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
          className="w-64 h-auto rounded-md border mb-4"
        />
      )}

      {preview && (
        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white px-6 py-2 rounded-md mb-4"
        >
          Search
        </button>
      )}

      {/* Made by section */}
      {/* <div className="mt-4 text-center">
        <p>
          Made by{' '}
          <a
            href="https://twitter.com/gothead"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            @hothead
          </a>
        </p>
      </div> */}
    </div>
  );
}