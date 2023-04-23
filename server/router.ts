import { Router } from 'express';
import * as userController from './controllers/user';
import * as plantController from './services/plantidAPI';
import * as gardenController from './controllers/plant';
import authMiddleware from './middleware/authmiddleware';

const router = Router();

//USER REQUESTS


router.post('/register', userController.create);

router.post('/login', userController.login);

router.get('/me', authMiddleware, userController.profile);

//to save plant to own guarden
router.post('/saveplant', authMiddleware, gardenController.save);

//to get own plants
router.get('/myguarden', authMiddleware, gardenController.getPlants);


//router.post('/removeplant', authMiddleware, )



//API REQUESTS
router.post('/idplant', plantController.getPlant);

router.get('/ownplantdetails')


export default router;