import { optimizeImageUrl } from "@/utils/imageUtils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const allImages = images?.length ? [images[0], ...images.slice(1)] : [images[0]];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 h-[500px]">
        {/* Main Image */}
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

        {/* Thumbnail Grid */}
        <div className="grid grid-rows-3 gap-4">
          {allImages.slice(1, 4).map((image, index) => (
            image && (
              <div 
                key={image}
                className="relative rounded-xl overflow-hidden cursor-pointer bg-neutral-800"
                onClick={() => setSelectedImageIndex(index + 1)}
              >
                <img
                  src={optimizeImageUrl(image)}
                  alt={`${name} ${index + 2}`}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )
          ))}
        </div>
      </div>

      {/* Image Gallery Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImageIndex !== null && allImages[selectedImageIndex] && (
            <img
              src={optimizeImageUrl(allImages[selectedImageIndex])}
              alt={`${name} ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;