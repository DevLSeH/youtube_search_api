"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//axios 사용을 위한 기본 url과 api키 입력
const apiClient = axios_1.default.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: { key: process.env.API_KEY },
});
//api 요청에 필요한 키워드와 검색 수를 인자로 설정
const videoIds = (keyWord, maxResults) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // /search url로 get 메쏘드로 요청 전송
        const response = yield apiClient.get("/search", {
            params: {
                part: "snippet",
                q: keyWord,
                type: "video",
                order: "viewCount",
                maxResults: maxResults
            },
        });
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
            const videoResult = {
                id: videoId,
                name: videoName,
                description: videoDescription,
            };
            //결과 배열의 각 index에 객체를 하나씩 저장
            result[i] = videoResult;
        }
        console.log(result);
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
//api 호출 함수
videoIds("닥터지 진정깊은 수분크림", 3);
