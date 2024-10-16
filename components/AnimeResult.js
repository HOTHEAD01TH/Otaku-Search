export default function AnimeResult({ data }) {
  console.log(data); // Debugging line to inspect full data response

  return (
    <div className="mt-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8">Anime Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((anime, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              {/* Video preview */}
              {anime.video && (
                <video
                  controls
                  src={`${anime.video}&size=l`}  // Large video preview
                  className="w-full h-48 object-cover"
                />
              )}
              <span className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 text-sm font-semibold rounded">
                Episode: {anime.episode}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Anime ID: {anime.anilist}</h3>
              <p className="text-sm text-gray-600">
                <strong>Filename:</strong> {anime.filename}
              </p>
              <p className="text-sm text-gray-600">
                <strong>From:</strong> {anime.from.toFixed(2)}s &nbsp;
                <strong>To:</strong> {anime.to.toFixed(2)}s
              </p>
              <p className="text-sm text-gray-600">
                <strong>Similarity:</strong> {(anime.similarity * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}