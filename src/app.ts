import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();

let searchWord = '닥터지'
const maxResults = 10

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: process.env.API_KEY },
});

const videoIds = async () => {
  try {
    const response = await apiClient.get("/search", {
      params: {
        part: 'snippet',
        q: searchWord,
        type: 'video',
        order: 'viewCount',
        maxResults: maxResults
      },
    })
    const data = response.data;

    for (let i = 0; i < maxResults; i++) {
      const video = data.items[i];
      const videoName = video.snippet.title;
      const videoDescription = video.snippet.description;
      const videoId = video.id.videoId;
      console.log(videoName);
      console.log(videoDescription);
      console.log(videoId);
    }
  } catch (error) {
    console.error(error);

  }
};

videoIds();