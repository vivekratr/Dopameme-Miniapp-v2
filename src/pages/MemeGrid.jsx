import React, { useState } from "react";
import "tailwindcss/tailwind.css"; // Make sure Tailwind CSS is imported

const MemeGrid = ({ memes }) => {
  const [context, setContext] = useState("");

  return (
    <div className="flex flex-col items-start w-full max-w-lg mx-auto p-4 text-white">
      
        <h2 className="text-lg font-semibold">Trending Memes</h2>
      {memes?.map((meme, index) => (
        <div key={index} className="grid bg-white grid-cols-2 gap-4 w-full">
          <div className="relative pb-full overflow-hidden rounded-lg bg-gray-800">
            <img
              src={meme.url}
              alt={`Meme ${index}`}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemeGrid;
