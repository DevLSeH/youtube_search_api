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
let searchWord = 'nodejs';
const apiClient = axios_1.default.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: { key: 'AIzaSyBy_ovayCXpzRXhBQ5Q5Bgb04UmLw2lekw' },
});
const videoIds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiClient.get("search", {
            params: {
                part: 'snippet',
                q: searchWord,
                type: 'video',
                order: 'viewCount',
                maxResults: 5
            },
        }).then((response) => {
            console.log(response.data);
        });
    }
    catch (error) {
        console.error(error);
    }
});
