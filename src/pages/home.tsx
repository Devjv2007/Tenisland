import { Link } from "react-router-dom";
import { useState, useEffect, type SetStateAction } from 'react';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    {
      src: "https://newbrasil.vtexassets.com/assets/vtex.file-manager-graphql/images/12e5b29c-5f7d-4632-ab0c-16117788c59f___b17924cb01af09a9f11d2b7e40c7ffa6.png",
      alt: "Nike Air Max 1",
      title: "New Balance 2010"
    },
    {
      src: "https://www.overkillshop.com/cdn/shop/collections/overkill_webshop_category-1062_Kopie.webp?v=1719307054&width=1050", 
      alt: "Nike React Infinity",
      title: "Air Max 90"
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0095/4420/4367/files/105A5163.jpg?v=1696966847",
      alt: "Tênis Lifestyle",
      title: "Adidas Samba"
    },
    {
      src: "https://urbansyndicate.co.uk/wp-content/uploads/2024/09/Asics-Gel-NYC-2055.jpg",
      alt: "Asics Running",
      title: "Asics Performance"
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="relative h-96 overflow-hidden bg-black rounded-2xl">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-xl"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-xl" />
            
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
              <p className="text-gray-300">Descobra a coleção completa</p>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <section className="flex justify-center">
      </section>
      
      <ImageCarousel />
      
      <section className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-4 gap-4">
          <img
            src="https://thumbor.cartpanda.com/D4YdmDAUoLRphjP-cRu14aa9iD8=/1200x1200/https://assets.mycartpanda.com/static/products_images/ea/ca/03/1689718892.jpg"
            className="h-72 rounded-lg hover:scale-105 transition-transform duration-200"
          />
          <img
            src="https://droper-media.us-southeast-1.linodeobjects.com/174202413522774.webp"
            className="h-72 rounded-lg hover:scale-105 transition-transform duration-200"
          />
          <img
            src="https://www.asphaltgold.com/cdn/shop/files/JqKNyDtIHpKh5m5Gqo55_1203A558-101-Asics-GEL-NYC--Utility--White-Black-sm-1.jpg?crop=center&height=768&v=1737719104&width=768"
            className="h-72 rounded-lg hover:scale-105 transition-transform duration-200"
          />  
          <img
            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/422df1e9-a0b5-4e11-8cff-77990905f14a/air-jordan-11-retro-big-kids-shoes-KK99vE.png"
            className="h-72 rounded-lg hover:scale-105 transition-transform duration-200"
          />         
        </div>
      </section>
    




      <section className="flex flex-row mx-auto max-w-6xl p-6 ">
        <Link to="/nike">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-dpKSxRuVcSyDRPMgEBBfweI42FyTtr0Kw&s"
            className="h-64 m-5 hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <Link to="/asics">
          <img
            src="https://i.pinimg.com/736x/37/1f/20/371f20c81bc1d31cf5ab3c6f3fa746fd.jpg"
            className="h-64 m-5 hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <Link to="/adidas">
          <img
            src="https://turbologo.com/articles/wp-content/uploads/2019/07/Three-Bars-adidas-logo-1.jpg.webp"
            className="h-64 m-5 hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <Link to="/jordan">
          <img
            src="https://img.icons8.com/?size=192&id=45774&format=png"
            className="h-64 m-5 hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </section>
    </>
  )
}
