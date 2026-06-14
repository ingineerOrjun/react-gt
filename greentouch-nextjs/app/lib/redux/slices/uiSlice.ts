import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface UIState {
  notifications: Notification[];
  isSidebarOpen: boolean;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchBarOpen: boolean;
}

const initialState: UIState = {
  notifications: [],
  isSidebarOpen: false,
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchBarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        ...action.payload,
        id,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleSearchBar: (state) => {
      state.isSearchBarOpen = !state.isSearchBarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    closeSearchBar: (state) => {
      state.isSearchBarOpen = false;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  toggleSidebar,
  toggleCart,
  toggleMobileMenu,
  toggleSearchBar,
  closeSidebar,
  closeCart,
  closeMobileMenu,
  closeSearchBar,
} = uiSlice.actions;

export default uiSlice.reducer; 