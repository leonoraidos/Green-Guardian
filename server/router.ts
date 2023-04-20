import { Router, Request, Response } from 'express';
import * as userController from './controllers/user';
import authMiddleware from './middleware/authmiddleware';

const router = Router();

//USER REQUESTS
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

router.get('/login', userController.login);

router.post('/register', userController.create);

//to save plant to own guarden
router.post('/save')

//to get own plants
router.get('/myguarden', authMiddleware, userController.profile);


router.post('/removeplant', authMiddleware, )



//API REQUESTS
router.get('/idplant', );

router.get('/ownplantdetails', )


module.exports = router;