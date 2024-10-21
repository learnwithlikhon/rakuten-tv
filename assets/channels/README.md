# Channels Directory

This folder contains the **`channels.json`** file, which stores the data for all IPTV channels included in the Rakuten Family Kids IPTV project.

## channels.json Structure

The **`channels.json`** file is a JSON array where each object represents a channel with the following properties:

- **`id`**: Unique identifier for the channel.
- **`name`**: The name of the channel (e.g., "Rakuten Kids").
- **`url`**: The URL of the stream (must be an HLS-compatible stream).
- **`category`**: The category the channel belongs to (e.g., "Kids", "Sports").
- **`logo`**: The URL of the channel's logo image.

### Sample Structure:

```json
[
  {
    "id": 1,
    "name": "Rakuten Kids",
    "url": "https://streaming-url/rakuten-kids.m3u8",
    "category": "Kids",
    "logo": "https://rakuten-family.vercel.app/assets/images/rakuten-kids.png"
  },
  {
    "id": 2,
    "name": "Rakuten Sports",
    "url": "https://streaming-url/rakuten-sports.m3u8",
    "category": "Sports",
    "logo": "https://rakuten-family.vercel.app/assets/images/rakuten-sports.png"
  }
]
