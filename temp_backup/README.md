# MonkyJam Frontend

This is the frontend application for the MonkyJam AI Music Generator, built with Next.js and Tailwind CSS.

## Features

- User-friendly interface for music generation
- Integration with the MonkyJam backend API
- Responsive design using Tailwind CSS
- Audio playback of generated music

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the API URL if your backend is not running on the default port

## Development

Start the development server:

```
npm run dev
```

The application will be available at http://localhost:3001

## Building for Production

```
npm run build
```

To test the production build locally:

```
npm start
```

## Deployment

### Using Docker

You can deploy the frontend using Docker:

```
docker build -t monkyjam-frontend .
docker run -p 3001:3000 -e NEXT_PUBLIC_API_URL=http://your-backend-url monkyjam-frontend
```

### Deploying to Render

The project includes a `render.yaml` file in the root directory that configures the frontend service for Render deployment.

1. Push your code to a Git repository
2. Connect your repository to Render
3. Deploy the service using the Blueprint feature

## Environment Variables

- `NEXT_PUBLIC_API_URL`: URL of the backend API (default: http://localhost:8000)

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [HeadlessUI](https://headlessui.dev/) - Unstyled, accessible UI components
- [Heroicons](https://heroicons.com/) - Beautiful SVG icons
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications
