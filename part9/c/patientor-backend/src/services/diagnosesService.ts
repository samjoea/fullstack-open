import diagnosesData from '../data/diagnoses';
import { Diagnose } from '../types/types';

const getAllDiagnosesEntries = (): Diagnose[] => {
      return diagnosesData;
};

const getOneDiagnosesEntry = (code: string): Diagnose | undefined => {
      return diagnosesData.find(diagnose => diagnose.code === code);
};

export default { getAllDiagnosesEntries, getOneDiagnosesEntry };