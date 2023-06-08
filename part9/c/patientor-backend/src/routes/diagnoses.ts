import { Router } from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnosesRouter = Router();

diagnosesRouter.get('/', (_req, res) => {
   res.send(diagnosesService.getAllDiagnosesEntries());
});

diagnosesRouter.get('/:code', (_req, res) => {
   const code = _req.params.code;
   res.send(diagnosesService.getOneDiagnosesEntry(code));
});

export default diagnosesRouter;