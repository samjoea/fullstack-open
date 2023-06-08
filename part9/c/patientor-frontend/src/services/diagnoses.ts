import axios from "axios";
import { Diagnose } from "../types";
const baseUrl = 'http://localhost:3001/api/diagnoses';


const getAll = async (): Promise<Diagnose[]> => {
   const { data: diagnoses } = await axios.get<Diagnose[]>(baseUrl);
   return diagnoses;
}

const getOne = async (code: string): Promise<Diagnose> => {
   const { data: diagnose } = await axios.get<Diagnose>(`${baseUrl}/${code}`);
   return diagnose;
}

export default { getAll, getOne };