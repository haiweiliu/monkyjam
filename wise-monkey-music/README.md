# Wise Monkey Music Creator

A web application that allows users to create, store, and manage their own music using Suno API.

## Features

- Create music using text prompts
- Toggle instrumental mode
- Manage playlists
- Store and organize generated music
- Clean and intuitive user interface

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Suno API credentials

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wise-monkey-music.git
   cd wise-monkey-music
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your Suno API credentials:
   ```
   SUNO_API_KEY=your_suno_api_key_here
   SUNO_API_URL=https://suno-api.example.com
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Create Music**
   - Enter a description of the music you want to create
   - Toggle instrumental mode if desired
   - Click "Generate Music"
   - Wait for the generation to complete
   - Preview and save the generated music

2. **Manage Playlists**
   - Create new playlists
   - Add generated music to playlists
   - Organize and manage your music collection

## Development

- The application is built with Next.js 13+ and TypeScript
- Uses Tailwind CSS for styling
- Implements Suno API for music generation
- Uses in-memory storage for development (replace with database for production)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Suno API](https://github.com/gcui-art/suno-api) for music generation
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling 