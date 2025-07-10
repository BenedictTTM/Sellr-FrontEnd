import React, { RefObject } from 'react';

interface ImageGridProps {
  images: File[];
  onAddImageClick: (idx: number) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxImages?: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onAddImageClick,
  fileInputRef,
  onFileInputChange,
  maxImages = 3, // Only 3 images for this layout
}) => (
  <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-4">
    {/* Main Image (large, spans 2 cols and 2 rows) */}
    <div
      className="relative flex flex-col items-center justify-center border-1 border-dashed border-orange-300 rounded-lg col-span-2 row-span-2 cursor-pointer bg-white hover:bg-orange-50 transition"
      style={{ height: '304px' }}
      onClick={() => onAddImageClick(0)}
    >
      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded z-10">
        Main Image
      </span>
      {images[0] ? (
        <img
          src={URL.createObjectURL(images[0])}
          alt="Main Preview"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <span className="text-4xl text-orange-400 mb-2">+</span>
          <span className="text-gray-400">Main Image</span>
        </>
      )}
    </div>
    {/* Small Image 1 (top right) */}
    <div
      className="flex flex-col items-center justify-center border-1 border-dashed border-orange-300 rounded-lg cursor-pointer bg-white hover:bg-orange-50 transition"
      style={{ height: '148px' }}
      onClick={() => onAddImageClick(1)}
    >
      {images[1] ? (
        <img
          src={URL.createObjectURL(images[1])}
          alt="Preview 2"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <span className="text-3xl text-orange-400 mb-2">+</span>
          <span className="text-gray-400">Image</span>
        </>
      )}
    </div>
    {/* Small Image 2 (bottom right) */}
    <div
      className="flex flex-col items-center justify-center border-1 border-dashed border-orange-300 rounded-lg cursor-pointer bg-white hover:bg-orange-50 transition"
      style={{ height: '148px' }}
      onClick={() => onAddImageClick(2)}
    >
      {images[2] ? (
        <img
          src={URL.createObjectURL(images[2])}
          alt="Preview 3"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <span className="text-3xl text-orange-400 mb-2">+</span>
          <span className="text-gray-400">Image</span>
        </>
      )}
    </div>
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: 'none' }}
      onChange={onFileInputChange}
    />
  </div>
);

export default ImageGrid;