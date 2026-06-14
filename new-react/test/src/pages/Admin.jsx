import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  PlusCircle, 
  Edit, 
  Trash, 
  Save,
  Image,
  Search
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication check (in a real app, this would be connected to a backend)
    if (loginCredentials.username === 'admin' && loginCredentials.password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-700">Admin Login</h2>
            <p className="text-gray-600">Enter your credentials to access the admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input 
                type="text" 
                value={loginCredentials.username}
                onChange={(e) => setLoginCredentials({...loginCredentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input 
                type="password"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo credentials: admin / password</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-green-700 flex items-center">
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Admin Panel
          </h2>
        </div>
        
        <nav className="p-4 space-y-1">
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<FileText className="w-5 h-5" />} 
            text="Blog Posts" 
            active={activeTab === 'blog'} 
            onClick={() => setActiveTab('blog')} 
          />
          <NavItem 
            icon={<ShoppingBag className="w-5 h-5" />} 
            text="Products" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <NavItem 
            icon={<Users className="w-5 h-5" />} 
            text="Users" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <NavItem 
            icon={<Settings className="w-5 h-5" />} 
            text="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
          
          <div className="pt-4 mt-4 border-t">
            <button 
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md w-full text-left"
              onClick={() => setIsAuthenticated(false)}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'blog' && <BlogPostsTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick }) => (
  <button 
    className={`flex items-center px-4 py-2 rounded-md w-full text-left ${
      active 
        ? 'bg-green-50 text-green-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    {text}
  </button>
);

const DashboardTab = () => {
  const stats = [
    { title: 'Total Blog Posts', value: '24', color: 'bg-blue-500' },
    { title: 'Total Products', value: '48', color: 'bg-green-500' },
    { title: 'Total Users', value: '1,257', color: 'bg-purple-500' },
    { title: 'Total Views', value: '24,589', color: 'bg-yellow-500' },
  ];

  const recentActivity = [
    { id: 1, type: 'New post', title: 'Green Chemistry Innovations', date: '2 hours ago' },
    { id: 2, type: 'Updated product', title: 'Eco-Friendly Cleaner', date: '5 hours ago' },
    { id: 3, type: 'New user', title: 'Mary Johnson', date: '1 day ago' },
    { id: 4, type: 'Updated post', title: 'Sustainable Manufacturing', date: '2 days ago' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className={`w-12 h-12 rounded-lg ${stat.color} mb-4 flex items-center justify-center text-white`}>
              {index === 0 && <FileText className="w-6 h-6" />}
              {index === 1 && <ShoppingBag className="w-6 h-6" />}
              {index === 2 && <Users className="w-6 h-6" />}
              {index === 3 && <LayoutDashboard className="w-6 h-6" />}
            </div>
            <h3 className="text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map(activity => (
            <div key={activity.id} className="flex border-b border-gray-100 pb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                {activity.type.includes('post') && <FileText className="w-6 h-6 text-blue-500" />}
                {activity.type.includes('product') && <ShoppingBag className="w-6 h-6 text-green-500" />}
                {activity.type.includes('user') && <Users className="w-6 h-6 text-purple-500" />}
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.type} - {activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostsTab = () => {
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'Sustainable Chemistry: Innovations for a Green Future', status: 'Published', date: 'May 15, 2023' },
    { id: 2, title: 'How Natural Compounds are Revolutionizing Industrial Cleaning', status: 'Published', date: 'June 2, 2023' },
    { id: 3, title: 'The Environmental Impact of Chemical Manufacturing', status: 'Draft', date: 'June 18, 2023' },
    { id: 4, title: 'Green Certification: What It Means for Chemical Products', status: 'Published', date: 'July 5, 2023' },
    { id: 5, title: 'Biodegradable Formulations: The Future of Industrial Chemicals', status: 'Published', date: 'July 28, 2023' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: '',
    content: '',
    category: '',
    status: 'Draft'
  });

  const handleEditPost = (post) => {
    setCurrentPost({
      id: post.id,
      title: post.title,
      content: post.content || 'Sample content for this post...',
      category: post.category || 'general',
      status: post.status
    });
    setIsEditing(true);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
    }
  };

  const handleCreateNewPost = () => {
    setCurrentPost({
      id: Date.now(),
      title: '',
      content: '',
      category: 'general',
      status: 'Draft'
    });
    setIsEditing(true);
  };

  const handleSavePost = () => {
    if (!currentPost.title.trim()) {
      alert('Post title is required');
      return;
    }
    
    if (blogPosts.some(post => post.id === currentPost.id)) {
      // Update existing post
      setBlogPosts(blogPosts.map(post => 
        post.id === currentPost.id ? { ...currentPost, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } : post
      ));
    } else {
      // Add new post
      setBlogPosts([
        ...blogPosts, 
        { 
          ...currentPost, 
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
      ]);
    }
    
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
          onClick={handleCreateNewPost}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>
      
      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {currentPost.id ? 'Edit Post' : 'Create New Post'}
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
              <input 
                type="text"
                value={currentPost.title}
                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Content</label>
              <textarea
                value={currentPost.content}
                onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="8"
                placeholder="Enter post content"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
                <select
                  value={currentPost.category}
                  onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="sustainability">Sustainability</option>
                  <option value="innovation">Innovation</option>
                  <option value="environment">Environment</option>
                  <option value="safety">Safety</option>
                  <option value="certification">Certification</option>
                  <option value="general">General</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                <select
                  value={currentPost.status}
                  onChange={(e) => setCurrentPost({...currentPost, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Featured Image</label>
              <div className="flex items-center space-x-4">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200 transition-colors">
                  <Image className="w-5 h-5 mr-2" />
                  Upload Image
                </button>
                <span className="text-sm text-gray-500">No image selected</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
                onClick={handleSavePost}
              >
                <Save className="w-5 h-5 mr-2" />
                Save Post
              </button>
              <button 
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center bg-gray-50 p-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogPosts.map(post => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-green-600 hover:text-green-900 mr-3"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const ProductsTab = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
      <h2 className="text-xl text-gray-600 mb-4">Product Management Interface</h2>
      <p className="text-gray-500 mb-6">This section allows you to manage your product catalog including adding new products, updating details, and managing inventory.</p>
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center mx-auto hover:bg-green-700 transition-colors">
        <PlusCircle className="w-5 h-5 mr-2" />
        Add New Product
      </button>
    </div>
  </div>
);

const UsersTab = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>
    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
      <h2 className="text-xl text-gray-600 mb-4">User Management</h2>
      <p className="text-gray-500 mb-6">Manage user accounts, permissions, and access control for the admin panel.</p>
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center mx-auto hover:bg-green-700 transition-colors">
        <PlusCircle className="w-5 h-5 mr-2" />
        Add New User
      </button>
    </div>
  </div>
);

const SettingsTab = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">General Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Site Title</label>
          <input 
            type="text"
            defaultValue="GreenTouch Chemicals"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Site Description</label>
          <textarea
            defaultValue="Leading manufacturer of eco-friendly chemical solutions for a sustainable future."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="3"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Contact Email</label>
            <input 
              type="email"
              defaultValue="info@greentouchchemicals.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Contact Phone</label>
            <input 
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  </div>
);

export default Admin; 