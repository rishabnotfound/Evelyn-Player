# RezePlayer

Professional HLS/MP4 video player with subtitle support. Easy to use, just like OPlayer!

## Features

- 🎥 **HLS & MP4 Support** - Automatically detects stream type
- 📝 **Subtitle Support** - SRT and VTT formats
- 🎨 **Beautiful UI** - Modern, responsive player interface
- ⚡ **Fast & Lightweight** - Optimized performance
- 🌐 **Multiple Quality Levels** - Automatic quality switching for HLS
- 📱 **Mobile Friendly** - Touch controls and responsive design

## Installation

```bash
npm install rezeplayer
```

Or use via CDN:

```html
<!-- Include CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rezeplayer@latest/dist/assets/style.css">

<!-- Include JS -->
<script src="https://cdn.jsdelivr.net/npm/rezeplayer@latest/dist/rezeplayer.iife.js"></script>
```

## Usage

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RezePlayer Example</title>

  <!-- Include RezePlayer CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rezeplayer@latest/dist/assets/style.css">
</head>
<body>
  <div id="player"></div>

  <!-- Include RezePlayer JS -->
  <script src="https://cdn.jsdelivr.net/npm/rezeplayer@latest/dist/rezeplayer.iife.js"></script>

  <script>
    // Initialize RezePlayer with multiple servers
    RezePlayer.make('#player', {
      title: 'My Video',
      servers: [
        {
          name: 'Server 1',
          url: 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8',
          type: 'hls'
        },
        {
          name: 'Server 2',
          url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          type: 'hls'
        }
      ],
      subtitles: [
        {
          name: 'English',
          language: 'en',
          src: 'https://example.com/subtitles-en.srt',
          default: true
        },
        {
          name: 'Spanish',
          language: 'es',
          src: 'https://example.com/subtitles-es.srt'
        }
      ],
      autoPlay: true,
      volume: 1,
      startTime: 0,
      enableWatchParty: false  // Optional: disable watch party
    });
  </script>
</body>
</html>
```

### As NPM Module

```javascript
import { make } from 'rezeplayer';
import 'rezeplayer/dist/assets/style.css';

const player = make('#player', {
  source: {
    title: 'My Video',
    src: 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8'
  },
  autoPlay: true
});

// Control the player
player.play();
player.pause();
player.setVolume(0.5);
player.seek(30); // Jump to 30 seconds
```

## API Reference

### RezePlayer.make(selector, options)

Creates a new player instance.

**Parameters:**

- `selector` (string | HTMLElement) - CSS selector or DOM element where player will be mounted
- `options` (RezePlayerOptions) - Player configuration

**Returns:** `RezePlayerInstance` - Player instance with control methods

### Options

```typescript
interface RezePlayerOptions {
  servers: Array<{
    name: string;             // Server name
    url: string;              // Video URL
    type?: 'hls' | 'mp4';    // Stream type (auto-detected if not specified)
  }>;
  title?: string;             // Video title (default: 'Reze Player')
  subtitles?: Array<{
    name: string;             // Subtitle display name
    src: string;              // Subtitle file URL (SRT or VTT)
    language: string;         // Language code (e.g., 'en', 'es', 'ja')
    default?: boolean;        // Set as default subtitle
  }>;
  autoPlay?: boolean;         // Auto-play video (default: true)
  volume?: number;            // Initial volume 0-1 (default: 1)
  startTime?: number;         // Start time in seconds (default: 0)
  enableWatchParty?: boolean; // Enable watch party feature (default: true)
}
```

### Player Instance Methods

```typescript
interface RezePlayerInstance {
  destroy(): void;              // Destroy player instance
  play(): void;                 // Play video
  pause(): void;                // Pause video
  setVolume(volume: number): void;  // Set volume (0-1)
  seek(time: number): void;     // Seek to time in seconds
}
```

## Examples

### HLS Stream with Subtitles

```javascript
RezePlayer.make('#player', {
  source: {
    title: 'Big Buck Bunny',
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    type: 'hls'
  },
  subtitles: [
    {
      name: 'English',
      language: 'en',
      src: 'https://example.com/subtitles.srt',
      default: true
    }
  ]
});
```

### MP4 Video

```javascript
RezePlayer.make('#player', {
  source: {
    title: 'Sample Video',
    src: 'https://example.com/video.mp4',
    type: 'mp4'
  },
  autoPlay: false,
  volume: 0.8
});
```

### Multiple Subtitles

```javascript
RezePlayer.make('#player', {
  source: {
    src: 'https://example.com/video.m3u8'
  },
  subtitles: [
    {
      name: 'English',
      language: 'en',
      src: 'https://example.com/en.srt',
      default: true
    },
    {
      name: 'Japanese',
      language: 'ja',
      src: 'https://example.com/ja.srt'
    },
    {
      name: 'Chinese',
      language: 'zh',
      src: 'https://example.com/zh.srt'
    }
  ]
});
```

## Browser Support

- Chrome/Edge 90+
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## Credits

Built by [rishabnotfound](https://github.com/rishabnotfound)
