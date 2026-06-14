import React, { useState } from "react";
import { Calendar, Clock, Tag, ChevronRight, Search, Filter } from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Sustainable Chemistry: Innovations for a Green Future",
      excerpt: "Discover the latest innovations in eco-friendly chemical solutions that are transforming industries while protecting our planet.",
      category: "sustainability",
      date: "May 15, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1616069954520-c883645aeec9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "How Natural Compounds are Revolutionizing Industrial Cleaning",
      excerpt: "Learn how plant-based chemical compounds are providing safer alternatives to traditional industrial cleaning products.",
      category: "innovation",
      date: "June 2, 2023",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "The Environmental Impact of Chemical Manufacturing: Our Commitment",
      excerpt: "Read about our commitment to reducing our carbon footprint and implementing sustainable practices in our manufacturing processes.",
      category: "environment",
      date: "June 18, 2023",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1507668339897-8a035aa9527d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Green Certification: What It Means for Chemical Products",
      excerpt: "Understand the importance of green certification for chemical products and how it ensures environmental compliance.",
      category: "certification",
      date: "July 5, 2023",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1617840517959-4530d92e525e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Biodegradable Formulations: The Future of Industrial Chemicals",
      excerpt: "Explore how biodegradable formulations are setting new standards in the industrial chemical sector.",
      category: "innovation",
      date: "July 28, 2023",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1566221880967-2d471ca5aef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Chemical Safety: Best Practices for Handling and Storage",
      excerpt: "Essential guidelines for safely handling and storing chemical products to protect both people and the environment.",
      category: "safety",
      date: "August 12, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1564889990214-28bae904cc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Filter blog posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // List of unique categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Featured post section */}
      {blogPosts.find(post => post.featured) && (
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <FeaturedPost post={blogPosts.find(post => post.featured)} />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-block mb-3">OUR BLOG</span>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Latest Sustainability Insights
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, innovations, and insights in sustainable chemistry and environmental practices.
          </p>
        </div>

        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-4 md:space-y-0">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-green-600" />
            <span className="text-gray-700 font-medium">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg">No articles found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-green-600 hover:text-green-700 font-medium flex items-center mx-auto"
            >
              Clear filters <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* Newsletter subscription */}
        <div className="mt-20 bg-gradient-to-r from-green-700 to-green-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 items-center p-8 md:p-12">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
              <p className="opacity-90 mb-6">Get the latest sustainability updates, industry insights, and exclusive offers delivered to your inbox.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-700"
                />
                <button className="bg-green-900 hover:bg-green-800 text-white px-6 py-3 rounded-r-lg font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </div>
              <p className="text-xs mt-3 opacity-80">We respect your privacy. Unsubscribe at any time.</p>
            </div>
            <div className="hidden md:block relative h-64">
              <div className="absolute inset-0 bg-green-800 opacity-20 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Sustainability newsletter" 
                  className="object-cover h-full w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPost = ({ post }) => (
  <div className="relative rounded-2xl overflow-hidden shadow-xl group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
    <div className="relative h-96 overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title} 
        className="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
      <div className="flex items-center space-x-4 mb-3">
        <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
          Featured
        </span>
        <span className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-1 opacity-80" />
          {post.date}
        </span>
        <span className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-1 opacity-80" />
          {post.readTime}
        </span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{post.title}</h2>
      <p className="text-gray-200 mb-4 max-w-3xl">{post.excerpt}</p>
      
      <a 
        href="#" 
        className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
      >
        Read Article <ChevronRight className="ml-1 h-4 w-4" />
      </a>
    </div>
  </div>
);

const BlogPostCard = ({ post }) => (
  <article className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
    <div className="relative h-48 overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105"
      />
    </div>
    
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
        <span className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {post.date}
        </span>
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {post.readTime}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
      
      <div className="flex items-center justify-between">
        <span className="flex items-center text-sm text-gray-500">
          <Tag className="h-4 w-4 mr-1" />
          <span className="capitalize">{post.category}</span>
        </span>
        
        <a 
          href="#" 
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
        >
          Read More <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  </article>
);

export default Blog; 