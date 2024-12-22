import React, { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useAuth from "../hooks/useAuth";

const galleryImages = [
  {
    src: "https://via.placeholder.com/400",
    title: "Sunset Bliss",
    description: "Captured during a serene sunset at the beach.",
    addedBy: "John Doe",
  },
  {
    src: "https://via.placeholder.com/400",
    title: "Mountain Escape",
    description: "A breathtaking view of the mountains.",
    addedBy: "Jane Smith",
  },
  // Add more image objects
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { user } = useAuth(); // Access logged-in user

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      {/* Title Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">Gallery of Wonders</h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore the beauty captured by our community.{" "}
          {user && (
            <span className="font-semibold text-gray-800">
              Welcome, {user.displayName || "Guest"}!
            </span>
          )}
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            onClick={() => openLightbox(index)}
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold">{image.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{image.description}</p>
              <small className="text-gray-400 mt-1">
                {user ? `Shared by: ${user.name}` : `Added by: ${image.addedBy}`}
              </small>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={galleryImages.map((image) => ({ src: image.src }))}
        index={lightboxIndex}
      />
    </div>
  );
};

export default Gallery;
