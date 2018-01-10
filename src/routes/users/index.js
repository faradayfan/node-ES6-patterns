import express from 'express';
import UsersController from '../../controllers/users';
let router = express.Router();

router.get('/', UsersController.get_index);




export default router;
