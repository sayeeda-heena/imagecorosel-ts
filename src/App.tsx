import { useState, useEffect } from 'react'
import './index.css'

type ImageType =  {
    id: number;
    url: string;
    title: string;
};

function App() {
  const images: ImageType[] = [
    {id:1, url: "https://wallpaperaccess.com/full/31193.jpg", title: "Nature"},
    {id:2, url: "https://wallpaperaccess.com/full/806131.jpg", title: "Baby Girl"},
    {id:3, url: "https://cdn.wallpapersafari.com/41/39/SadjUW.jpg", title: "London"},
    {id:4, url: "https://wallpaperaccess.com/full/2346185.jpg", title: "Taj Mahal"},
    {id:5, url: "https://wallpaperaccess.com/full/1136555.jpg", title: "Dubai"},
    {id:6, url: "https://p0.pikist.com/photos/103/699/beach-north-sea-sea-sunset-water-abendstimmung.jpg", title: "Beach and Sun"},
];
//current state
const [current, setCurrent] = useState<number>(0);

const nextSlide = () => {
  setCurrent((prev) => (prev === images.length-1 ? 0 : current + 1)); 
};

const prevSlide = () => {
  setCurrent((prev) => (prev === 0 ? images.length -1 : current - 1));
};

//effect to change slide after 3 sec
useEffect(() => {
  const timer = setInterval(() => {
    setCurrent((prev) => 
    prev === images.length - 1 ? 0 : prev + 1);
  },3000);

  return () => clearInterval(timer);
},[images.length]);
  
return (
  <div className='min-h-screen  flex flex-cols justify-center items-center bg-linear-to-br from-purple-300 via-pink-300 to-indigo-300 p-8'>
  <div className='relative w-full max-w-3xl h-72 md:h-96 overflow-hidden rounded-2xl shadow-2xl'>
   {/* Images */}
    {images.map((img, index) => (
      <div 
      key={img.id}
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}>
        <img 
        src={img.url} 
        alt={img.title} 
        className='w-full h-full object-cover'>
        </img>
           
            {/* Title Overlay */}
        <div 
        className='absolute bottom-0 left-0 right-0 p-2 bg-black/40 text-white text-center text-lg font-medium'>
        {img.title}
          </div>
        </div>
    ))}
    {/* Prev Button */}
    <button 
    onClick={prevSlide} 
    className='absolute cursor-pointer top-1/3 left-4 w-12 h-12 transform translate-y-1/2 bg-black/30 hover:bg-black/60 text-white font-bold rounded-full p-2 shadow-md transition-all'>
       ❮
       </button>
    
     {/* Next Button */}
    <button
     onClick={nextSlide} 
     className='absolute cursor-pointer top-1/3 right-4 w-12 h-12 transform translate-y-1/2 bg-black/30 hover:bg-black/60 text-white font-bold rounded-full p-2 shadow-md transition-all'>
      ❯
      </button>
      </div>
    
    {/*Thumbnail*/}
     <div className='absolute lg:bottom-22 md:bottom-30 sm:bottom-45 flex flex-wrap justify-center'>
      {images.map((img,index) => (
        <button 
        key={img.id}
        className={`cursor-pointer border-3 overflow-hidden rounded-xl transition-all duration-300 ${index === current ? "border-indigo-500 scale-105 shadow-2xl" : "border-transparent hover:scale-105 hover:border-indigo-500 opacity-70 hover:opacity-100"}`}
        onClick={() => setCurrent(index)}>
          <img 
          src={img.url}
          alt={img.title}
          className='w-24 h-16 object-cover md:w-32 md:h-20 '>
          </img>
        </button>
      ))}

     </div>
     
 

  </div>
)
  
}

export default App;
