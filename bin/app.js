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
const apiClient = axios_1.default.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: { key: process.env.API_KEY },
});
const videoIds = (keyWord, maxResults) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiClient.get("/search", {
            params: {
                part: 'snippet',
                q: keyWord,
                type: 'video',
                order: 'viewCount',
                maxResults: maxResults
            },
        });
        const data = response.data;
        let result = [];
        for (let i = 0; i < maxResults; i++) {
            const video = data.items[i];
            const videoName = video.snippet.title;
            const videoDescription = video.snippet.description;
            const videoId = video.id.videoId;
            const videoResult = {
                id: videoId,
                name: videoName,
                description: videoDescription,
            };
            result[i] = videoResult;
        }
        console.log(result);
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
videoIds('닥터지 진정깊은 수분크림', 3);
