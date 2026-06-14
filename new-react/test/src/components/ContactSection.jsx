import React, { useState } from "react";
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const ContactSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email";
        break;
      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.trim().length < 10) error = "Message must be at least 10 characters";
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update errors
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });
    
    if (isValid) {
      setShowModal(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "general",
        message: ""
      });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-100 rounded-full translate-x-1/4 translate-y-1/4 opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-block mb-3">CONTACT US</span>
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Get in Touch With Us
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our sustainable chemical solutions? We're here to help with any inquiries you might have.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-green-700 mb-6 flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        touched.name && errors.name 
                          ? "border-red-300 bg-red-50" 
                          : touched.name && !errors.name 
                            ? "border-green-300 bg-green-50" 
                            : "border-gray-300"
                      }`}
                      placeholder="Enter your name"
                    />
                    {touched.name && errors.name && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.name}
                      </div>
                    )}
                    {touched.name && !errors.name && (
                      <div className="absolute right-3 top-3 text-green-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        touched.email && errors.email 
                          ? "border-red-300 bg-red-50" 
                          : touched.email && !errors.email 
                            ? "border-green-300 bg-green-50" 
                            : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {touched.email && errors.email && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email}
                      </div>
                    )}
                    {touched.email && !errors.email && (
                      <div className="absolute right-3 top-3 text-green-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="5"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                        touched.message && errors.message 
                          ? "border-red-300 bg-red-50" 
                          : touched.message && !errors.message 
                            ? "border-green-300 bg-green-50" 
                            : "border-gray-300"
                      }`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {touched.message && errors.message && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.message}
                      </div>
                    )}
                    {touched.message && !errors.message && (
                      <div className="absolute right-3 top-3 text-green-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                <h2 className="text-xl font-semibold text-green-700 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Phone Number</p>
                      <p className="text-gray-600 group-hover:text-green-600 transition-colors duration-300">+91 98765 43210</p>
                      <p className="text-gray-600 group-hover:text-green-600 transition-colors duration-300">+91 91234 56789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email Address</p>
                      <p className="text-gray-600 group-hover:text-green-600 transition-colors duration-300">info@greentouchchemicals.com</p>
                      <p className="text-gray-600 group-hover:text-green-600 transition-colors duration-300">support@greentouchchemicals.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Location</p>
                      <p className="text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                        123 Green Avenue, Industrial Area
                        <br />
                        Chennai, Tamil Nadu 600001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-3">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="font-medium text-green-700">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="font-medium text-green-700">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="font-medium text-green-700">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl max-w-md text-center animate-fadeIn shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-colors duration-300 shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CSS animation for modal */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
