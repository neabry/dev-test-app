# Dev Test App

A quick sample Express and React app written in TypeScript showing results from Flickr and YouTube's REST APIs.

## Installing and Running

Create a new file named `.env` in the project root and enter the following (replacing `<YT_API_KEY>` with your YouTube API key):
```
YOUTUBE_KEY=<YT_API_KEY>
```

In a terminal, run the following to install and start up the server:
```
npm install
npm start
```

In a separate terminal, run the following to install and start up the React client:
```
cd client
npm install
npm start
```

If successful, your browser should open up to `localhost:3000` with the React app running!
