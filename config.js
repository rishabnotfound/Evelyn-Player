// Standalone Video Player Configuration
window.__PLAYER_CONFIG__ = {
  // HLS Stream Configuration
  stream: {
    // Example HLS stream URL - replace with your own
    url: 'https://queenselti.me/gbtd/uwu.m3u8',

    // Server/Source name to display
    name: 'Test Server',

    // Stream type: 'hls' or 'mp4'
    type: 'hls',

    // Optional: Subtitles/Captions
    captions: [
      // Example:
      // {
      //   id: 'en',
      //   language: 'en',
      //   label: 'English',
      //   url: 'https://example.com/subtitles/en.vtt',
      //   type: 'vtt'
      // }
    ]
  },

  // Player metadata
  meta: {
    title: 'Video Player Demo',
    description: 'Standalone HLS Video Player'
  },

  // Player settings
  settings: {
    // Start volume (0-1)
    defaultVolume: 1.0,

    // Auto-play (may be blocked by browser)
    autoPlay: false,

    // Start time in seconds
    startTime: 0
  }
};
