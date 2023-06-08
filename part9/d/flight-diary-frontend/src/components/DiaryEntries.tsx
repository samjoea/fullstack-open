import React from 'react'
import { NonSensitiveDiaryEntry } from '../types';

const DiaryEntries = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] | undefined }) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {
        diaries?.map(diary => (
          <>
            <DiaryEntry key={diary.id} diary={diary} />
            <br />
          </>
        ))
      }
    </div>
  )
}

const DiaryEntry = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <table style={{ textAlign: 'left'}}>
        <thead>
          <tr>
            <th>Date:</th>
          <th>{ diary.date }</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Visibility:</td>
          <td>{ diary.visibility }</td>
          </tr>
          <tr>
            <td>Weather:</td>
          <td>{ diary.weather }</td>
          </tr>
        </tbody>
      </table>
  )
};
export default DiaryEntries;