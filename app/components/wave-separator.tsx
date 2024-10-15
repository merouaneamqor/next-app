export default function WaveSeparator() {
    return (
        <div className="relative w-full h-64 bg-primary-700">
          <div className="absolute bottom-0 left-0 w-full">
            <svg 
              viewBox="0 0 1440 320" 
              fill="#f3f4f6" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path 
                fill="#f3f4f6" 
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
    )
  }