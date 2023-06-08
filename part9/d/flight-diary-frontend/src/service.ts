import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';
export const getAllDiaries = async () => {
   return axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
};

export const createNewDiary = async (entry: NewDiaryEntry) => {
   return axios.post<NewDiaryEntry>(baseUrl, entry);
};