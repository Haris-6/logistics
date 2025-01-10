//image use in ads d
import { Carousel } from "flowbite-react";

function ImageCarousel({ data }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 sm:w-[50%]">
      <Carousel slideInterval={5000}>
        {data.map((image) => (
          <img src={image} alt="image" className="object-cover"/>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
