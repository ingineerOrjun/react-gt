import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<BlogPost[]>) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPostByIdStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostByIdSuccess: (state, action: PayloadAction<BlogPost>) => {
      state.isLoading = false;
      state.currentPost = action.payload;
    },
    fetchPostByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createPostSuccess: (state, action: PayloadAction<BlogPost>) => {
      state.isLoading = false;
      state.posts = [...state.posts, action.payload];
    },
    createPostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostByIdStart,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
} = blogSlice.actions;

export default blogSlice.reducer; 