import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="w-full h-full absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(/img/WaterBoat.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Capturing Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Beautiful Moments
            </span>
            Forever
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Professional photography that tells your unique story with elegance and artistry
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => scrollToSection('#contact')}
              className="group bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-105 flex items-center space-x-2"
            >
              <span>Book Your Session</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('#gallery')}
              className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>View Gallery</span>
            </button>
          </div>
        </div>

        {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          </div>
        </div> */}
      </div>
    </section>
  );
}



// import { ArrowRight, Play, Pause } from 'lucide-react';
// import { useRef, useState } from 'react';

// export default function Hero() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const scrollToSection = (href: string) => {
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const toggleVideo = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         loop
//         className="absolute inset-0 w-full h-full object-cover"
//         poster="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920"
//       >
//         <source
//           src="https://videos.pexels.com/video-files/3946656/3946656-sd_640_360_30fps.mp4"
//           type="video/mp4"
//         />
//       </video>
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="space-y-6 animate-fadeIn">
//           <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
//             Capturing Your
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
//               Beautiful Moments
//             </span>
//             Forever
//           </h1>

//           <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
//             Professional photography that tells your unique story with elegance and artistry
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
//             <button
//               onClick={() => scrollToSection('#contact')}
//               className="group bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-105 flex items-center space-x-2"
//             >
//               <span>Book Your Session</span>
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>

//             <button
//               onClick={() => scrollToSection('#gallery')}
//               className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 flex items-center space-x-2"
//             >
//               <Play className="w-5 h-5" />
//               <span>View Gallery</span>
//             </button>
//           </div>
//         </div>

//         <button
//           onClick={toggleVideo}
//           className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/30 transition-all border-2 border-white/30 hover:scale-110"
//           aria-label="Toggle video playback"
//         >
//           {isPlaying ? (
//             <Pause className="w-6 h-6 text-white" />
//           ) : (
//             <Play className="w-6 h-6 text-white" />
//           )}
//         </button>
//       </div>
//     </section>
//   );
// }