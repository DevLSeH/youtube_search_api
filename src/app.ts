import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();

//video 정보를 저장할 객체 타입 지정
interface videoObject {
  id: string;
  name: string;
  description: string;
}

//axios 사용을 위한 기본 url과 api키 입력
const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: process.env.API_KEY },
});

//api 요청에 필요한 키워드와 검색 수를 인자로 설정
const videoIds = async (keyWord: string, maxResults: number) => {
  try {
    // /search url로 get 메쏘드로 요청 전송
    const response = await apiClient.get("/search", {
      params: {
        part: 'snippet', //* snippet 정보를 함께 받아옴, 이 안에는 영상의 제목 등 상세 정보가 포함됨
        q: keyWord,
        type: 'video',
        order: 'viewCount',
        maxResults: maxResults
      },
    })
    const data = response.data;

    //결과를 저장하기 위한 배열 선언
    let result = [];

    //for 문으로 전체 결과 중 필요 정보만을 객체로 저장함
    for (let i = 0; i < maxResults; i++) {
      const video = data.items[i];
      const videoName = video.snippet.title;
      const videoDescription = video.snippet.description;
      const videoId = video.id.videoId;

      //결과를 객체 내의 key : value 로 저장
      const videoResult: videoObject = {
        id: videoId,
        name: videoName,
        description: videoDescription,
      }
      //결과 배열의 각 index에 객체를 하나씩 저장
      result[i] = videoResult

    }
    console.log(result);
    return result;

  } catch (error) {
    console.error(error);

  }
};

//api 호출 함수
videoIds('닥터지 진정깊은 수분크림', 3);