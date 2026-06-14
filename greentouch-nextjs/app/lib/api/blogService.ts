import axios from './axios';
import { BlogPost } from '../redux/slices/blogSlice';

interface CreatePostData {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
}

interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export const getPosts = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
}): Promise<{ posts: BlogPost[]; total: number; pages: number }> => {
  const response = await axios.get('/blog/posts', { params });
  return response.data;
};

export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await axios.get(`/blog/posts/${slug}`);
  return response.data;
};

export const getPostById = async (id: string): Promise<BlogPost> => {
  const response = await axios.get(`/blog/posts/id/${id}`);
  return response.data;
};

export const createPost = async (data: CreatePostData): Promise<BlogPost> => {
  const response = await axios.post('/blog/posts', data);
  return response.data;
};

export const updatePost = async (data: UpdatePostData): Promise<BlogPost> => {
  const response = await axios.put(`/blog/posts/${data.id}`, data);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`/blog/posts/${id}`);
};

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get('/blog/categories');
  return response.data;
};

export const getTags = async (): Promise<string[]> => {
  const response = await axios.get('/blog/tags');
  return response.data;
}; 