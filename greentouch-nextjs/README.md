# GreenTouch Chemicals - Next.js Website

A modern, responsive website for GreenTouch Chemicals built with Next.js, Redux Toolkit, and Tailwind CSS.

## Setup Instructions

Follow these steps to set up and run the project:

1. **Initialize a new Next.js project**:
   ```bash
   npx create-next-app@latest greentouch-nextjs
   ```
   When prompted, select:
   - Yes to TypeScript
   - Yes to ESLint
   - Yes to Tailwind CSS
   - No to src/ directory
   - Yes to App Router
   - No to import alias

2. **Navigate to the project directory**:
   ```bash
   cd greentouch-nextjs
   ```

3. **Install additional dependencies**:
   ```bash
   npm install @reduxjs/toolkit axios clsx next-themes react-redux tailwind-merge
   ```

4. **Copy the project files**:
   Copy all the files we've created into the appropriate directories in the new project.

5. **Set up environment variables**:
   Create a `.env` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
greentouch-nextjs/
├── app/                  # Main application code
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and helpers
│   │   ├── api/          # API services
│   │   ├── redux/        # Redux state management
│   │   │   ├── slices/   # Redux slices
│   │   └── utils.ts      # Utility functions
│   ├── blog/             # Blog page
│   ├── contact/          # Contact page
│   ├── products/         # Products page
│   ├── about/            # About page
│   ├── admin/            # Admin page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Context providers
├── public/               # Static assets
├── .env                  # Environment variables
└── package.json          # Project dependencies
```

## Features

- Responsive design with Tailwind CSS
- State management with Redux Toolkit
- Server-side rendering with Next.js
- Blog with CMS capabilities
- Contact form with real-time validation
- Admin panel for content management
- Dark mode support
- and more...

## API Integration

The website connects to a backend API at `http://localhost:3001/api`. You can:
- Set up a mock server using [json-server](https://github.com/typicode/json-server)
- Or implement a full backend using Express.js (see the separate backend repository)

## License

MIT 