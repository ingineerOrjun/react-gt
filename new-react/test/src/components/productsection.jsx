import React from "react";
import pd1Image from "../assest/prodduct/pd1.jpeg";
import pd2Image from "../assest/prodduct/pd2.jpeg";
import pd3Image from "../assest/prodduct/pd3.jpeg";

const ProductSection = () => {
  const products = [
    {
      id: 1,
      image: pd2Image,
      title: "Prithvi Phenyl",
      description:
        "Keep your home fresh and germ-free with Prithvi Phenyl, a powerful disinfectant that removes stains and odors for a spotless clean.",
    },
    {
      id: 2,
      image: pd1Image,
      title: "Prithvi Liquid Blue",
      description:
        "Enhance your whites with Prithvi Liquid Blue, delivering a bright, long-lasting shine to your fabrics with every wash.",
    },
    {
      id: 3,
      image: pd3Image,
      title: "Prithvi Tiles Cleaner",
      description:
        "Restore the sparkle of your floors with Prithvi Tiles Cleaner, an effective formula that removes tough stains, grime, and watermarks effortlessly.",
    },
    {
      id: 4,
      image: pd3Image,
      title: "Prithvi Tiles Cleaner",
      description:
        "Restore the sparkle of your floors with Prithvi Tiles Cleaner, an effective formula that removes tough stains, grime, and watermarks effortlessly.",
    },
  ];

  const industries = [
    "Pharmaceuticals",
    "Agriculture",
    "Water Treatment",
    "Manufacturing",
  ];

  const ProductCard = ({ image, title, description }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 fade-in border border-green-300">
      <img src={image} alt={title} className="w-full h-70 rounded" />
      <h3 className="text-xl font-semibold mt-4 text-green-700">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  const IndustryItem = ({ name }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:bg-green-100 transition fade-in border border-green-300">
      <p className="font-semibold text-green-700">{name}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8 fade-in">
        Our Products & Services
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>

      <h3 className="text-2xl font-bold text-green-700 mt-12 mb-4 fade-in">
        Industries Served
      </h3>
      <div className="grid md:grid-cols-4 gap-6 text-center">
        {industries.map((industry, index) => (
          <IndustryItem key={index} name={industry} />
        ))}
      </div>

      <h3 className="text-2xl font-bold text-green-700 mt-12 mb-4 fade-in">
        Technical Specifications
      </h3>
      <div className="bg-white p-6 rounded-lg shadow-md fade-in border border-green-300">
        <p className="text-gray-700">
          Download detailed technical specifications and safety guidelines:
        </p>
        <button
          className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-800 transition"
          onClick={() => {
            // Create a temporary anchor element
            const link = document.createElement("a");
            link.href = `${process.env.PUBLIC_URL}/pdfs/report.pdf`; // Path to your PDF file
            link.download = "report.pdf"; // Name for the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
