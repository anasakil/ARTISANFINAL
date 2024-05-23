import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiCirclePlus } from "react-icons/ci"; // Import de l'icône
import image2 from "../assets/img7.png";


export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Doge Meme",
      description: "Double Bed & Side Tables",
      image: image2,
      price: "$10.99",
    },
    {
      id: 2,
      name: "Another Meme",
      description: "Another fascinating meme.",
      image: image2,
      price: "$12.99",
    },
    {
      id: 3,
      name: "Yet Another Meme",
      description: "Double Bed & Side Tables.",
      image: image2,
      price: "$8.99",
    },
    {
      id: 4,
      name: "More Memes",
      description: "Double Bed & Side Tables",
      image: image2,
      price: "$15.99",
    },
  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 ">Featured Products</h1>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="p-3">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-gray-950">
                <img
                  alt={product.name}
                  className="w-full h-50 object-cover max-image-size"
                  src={product.image}
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    {product.description}
                  </p>
                  <p className="text-gray-700 font-semibold mt-2">
                    {product.price}
                    <button className="mt-4 text-black font-bold py-2 px-4 rounded">
                    <CiCirclePlus /> {/* Remplacer le texte par l'icône */}
                  </button>
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}