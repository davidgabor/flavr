import { optimizeImageUrl } from "@/utils/imageUtils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const allImages = images?.length ? images : [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        {allImages.length > 0 && (
          <div 
            className="aspect-square rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedImageIndex(0)}
          >
            <img
              src={optimizeImageUrl(allImages[0])}
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        )}

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-4">
          {allImages.slice(1, 5).map((image, index) => (
            <div 
              key={index}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImageIndex(index + 1)}
            >
              <img
                src={optimizeImageUrl(image)}
                alt={`${name} ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
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