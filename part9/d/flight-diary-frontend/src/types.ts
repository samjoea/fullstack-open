export interface DiaryEntry {
   id: number;
   date: string;
   weather: string;
  visibility: string;
  comment: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
type Value = {
  value: string;
}

export type FormValues = {
  date: Value;
  visibility: Value;
  weather: Value;
  comment: Value;
}