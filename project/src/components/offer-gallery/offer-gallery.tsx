const MAX_IMAGES_COUNT = 6;

type OfferGalleryProps = {
  images: string[];
  type: string;
}

function OfferGallery({ images, type }: OfferGalleryProps): JSX.Element {
  return (
    <div className="property__gallery">
      {images.slice(0, MAX_IMAGES_COUNT).map((image) => (
        <div className="property__image-wrapper" key={image}>
          <img className="property__image" src={image} alt={type} />
        </div>))}
    </div>
  );
}

export default OfferGallery;
