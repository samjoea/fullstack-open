import { Router } from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils/patientUtils';

const patientsRouter = Router();
// patientsRouter.route('/').get((_req, res) => { }, (_req, res) => { }, (_req, res) => { });

patientsRouter.get('/', (_req, res) => {
   res.send(patientsService.getNonSensitivePatientEntries()).status(200);
});

patientsRouter.post('/', (_req, res) => {
   try {
      const newPatientEntry = toNewPatientEntry(_req.body);
      const addedEntry = patientsService.addPatient(newPatientEntry);
      res.json(addedEntry);
   } catch (error: unknown) {
      let errorMessage = 'Something went wrong';
      if (error instanceof Error) {
         errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
   }
});

patientsRouter.get('/:id', (_req, res) => {
   const id = _req.params.id;
   const patient = patientsService.getPatientById(id);
   if (patient) {
      res.send(patient);
   } else {
      res.sendStatus(404);
   }
});

patientsRouter.post('/:id/entries', (_req, res) => {
   try {
      const id = _req.params.id;
      const newEntry = _req.body;
      const patient = patientsService.addEntry(id, newEntry);
      res.send(patient);
   } catch (error: unknown) {
      let errorMessage = 'Something went wrong';
      if (error instanceof Error) {
         errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
   }
});

export default patientsRouter;