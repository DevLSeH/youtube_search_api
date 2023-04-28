import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();

interface videoObject {
  id: string;
  name: string;
  description: string;
}

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: process.env.API_KEY },
});

const videoIds = async (keyWord: string, maxResults: number) => {
  try {
    const response = await apiClient.get("/search", {
      params: {
        part: 'snippet',
        q: keyWord,
        type: 'video',
        order: 'viewCount',
        maxResults: maxResults
      },
    })
    const data = response.data;

    let result = [];

    for (let i = 0; i < maxResults; i++) {
      const video = data.items[i];
      const videoName = video.snippet.title;
      const videoDescription = video.snippet.description;
      const videoId = video.id.videoId;

      const videoResult: videoObject = {
        id: videoId,
        name: videoName,
        description: videoDescription,
      }
      result[i] = videoResult

    }
    console.log(result);

  } catch (error) {
    console.error(error);

  }
};

videoIds('닥터지 진정깊은 수분크림', 3);