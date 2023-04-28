import axios from 'axios';

let searchWord = '닥터지'
const maxResults = 10

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: 'AIzaSyBy_ovayCXpzRXhBQ5Q5Bgb04UmLw2lekw' },
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