import { useState, useEffect } from "react";

const AboutBody = () => {
  const [openTimeline, setOpenTimeline] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (count === 0) {
        let currentCount = 0;
        const interval = setInterval(() => {
          if (currentCount < 25) {
            currentCount++;
            setCount(currentCount);
          } else {
            clearInterval(interval);
          }
        }, 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [count]);

  return (
    <> 
      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1462899006636-339e08d1844e')",
        }}
      >
        <div className="absolute inset-0 bg-green-700/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Story of Sustainable Innovation
          </h1>
          <p className="text-xl md:text-2xl">
            Pioneering eco-friendly solutions since 2012
          </p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12 text-center">
            Our Journey
          </h2>
          <div className="relative pl-8 md:pl-0 space-y-12">
            <div className="relative flex md:justify-between items-center group">
              <div className="hidden md:block md:w-1/2"></div>
              <div className="absolute left-0 h-full w-1 bg-green-100 md:hidden"></div>
              <div className="absolute left-[-7px] top-4 w-4 h-4 rounded-full bg-green-700 md:hidden"></div>
              <div className="md:w-1/2 md:pl-12 transition-all duration-300 hover:scale-[1.02]">
                <div
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={() => setOpenTimeline(!openTimeline)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white mr-4">
                      2012
                    </div>
                    <h3 className="text-xl font-bold text-green-700">
                      Founding Vision
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {openTimeline
                      ? "Our founders, Sarah and Michael, started with a simple bamboo toothbrush design, driven by their passion for environmental conservation. Despite early challenges, they secured their first major retail partnership within 18 months."
                      : "Established in a small garage with a mission to reduce plastic waste..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center ">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">{count}M+</div>
              <p className="text-green-100">Million Products Sold</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">650K+</div>
              <p className="text-green-100">Trees Planted</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-green-100">Customer Satisfaction</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">40+</div>
              <p className="text-green-100">Countries Served</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutBody;
