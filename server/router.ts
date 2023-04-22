import { Router, Request, Response } from 'express';
import * as userController from './controllers/user';
import * as plantController from './services/plantidAPI';
import authMiddleware from './middleware/authmiddleware';

const router = Router();

//USER REQUESTS
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

router.post('/register', userController.create);

router.post('/login', userController.login);

router.get('/me', authMiddleware, userController.profile);

//to save plant to own guarden
router.post('/save')

//to get own plants
//router.get('/myguarden', authMiddleware, userController);


//router.post('/removeplant', authMiddleware, )



//API REQUESTS
router.post('/idplant', plantController.getPlant);

router.get('/ownplantdetails')


module.exports = router;