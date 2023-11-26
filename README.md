_This is a fork of [node-genius-lyrics](https://github.com/zyrouge/node-genius-lyrics) to use Axios instead of Undici for HTTP. I made this fork because I'm using this library in a MeteorJS 2.x application that can't use Undici due to its usage of WASM (`archived threads in combination with wasm not supported`), something that may be fixed by the future release of MeteorJS 3.x_

<h1 align="center">Genius Lyrics 🎵</h1>

[![npm](https://img.shields.io/npm/v/genius-lyrics)](https://npmjs.com/package/genius-lyrics)
[![npm](https://img.shields.io/npm/dw/genius-lyrics)](https://npmjs.com/package/genius-lyrics)
[![npm](https://img.shields.io/npm/l/genius-lyrics)](https://npmjs.com/package/genius-lyrics)
[![Documentation](https://github.com/zyrouge/node-genius-lyrics/actions/workflows/docs.yml/badge.svg?branch=master)](https://github.com/zyrouge/node-genius-lyrics/actions/workflows/docs.yml)

## 🤔 Whats is this?

Just a simple lyrics fetcher that uses [Genius](https://genius.com). This also has official API implementations.

## 💻 Installation

```
npm install genius-lyrics-axios
```

## ⚙️ Usage

```js
const Genius = require("genius-lyrics-axios");
const Client = new Genius.Client("top-secret-optional-key");
```

## 📎 Links

-   [Documentation](https://genius-lyrics.js.org/)
-   [NPM](https://npmjs.com/genius-lyrics)
-   [GitHub](https://github.com/zyrouge/node-genius-lyrics)

## ✏️ Examples

### Requiring

**JavaScript**

```js
const Genius = require("genius-lyrics-axios");
const Client = new Genius.Client("top-secret-optional-key"); // Scrapes if no key is provided
```

**TypeScript**

```ts
import Genius from "genius-lyrics-axios";
const Client = new Genius.Client("top-secret-optional-key"); // Scrapes if no key is provided
```

### Fetching a Song and Lyrics

```js
const searches = await Client.songs.search("faded");

// Pick first one
const firstSong = searches[0];
console.log("About the Song:\n", firstSong, "\n");

// Ok lets get the lyrics
const lyrics = await firstSong.lyrics();
console.log("Lyrics of the Song:\n", lyrics, "\n");
```

### Fetching an Artist

```js
const artist = await Client.artists.get(456537);
console.log("About the Artist:\n", artist, "\n");
```

<br>
