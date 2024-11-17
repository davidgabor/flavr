import { optimizeImageUrl } from "@/utils/imageUtils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const allImages = Array.isArray(images) && images.length > 0 
    ? images 
    : [images[0]];

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => 
      prev !== null ? (prev === 0 ? allImages.length - 1 : prev - 1) : null
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev !== null ? (prev === allImages.length - 1 ? 0 : prev + 1) : null
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevImage();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 h-[600px]">
        <div 
          className="relative rounded-xl overflow-hidden cursor-pointer bg-neutral-800"
          onClick={() => setSelectedImageIndex(0)}
        >
          <img
            src={optimizeImageUrl(allImages[0])}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="hidden md:grid grid-rows-3 gap-4">
          {allImages.slice(1, 4).map((image, index) => (
            <div 
              key={`thumb-${index}`}
              className="relative rounded-xl overflow-hidden cursor-pointer bg-neutral-800 h-full"
              onClick={() => setSelectedImageIndex(index + 1)}
            >
              <img
                src={optimizeImageUrl(image)}
                alt={`${name} ${index + 2}`}
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl p-0 bg-neutral-900 border-neutral-800">
          <div className="relative w-full h-[80vh] bg-neutral-900">
            {selectedImageIndex !== null && allImages[selectedImageIndex] && (
              <img
                src={optimizeImageUrl(allImages[selectedImageIndex])}
                alt={`${name} ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            )}
            
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;