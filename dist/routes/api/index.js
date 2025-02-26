import { Router } from 'express'; // Import the Router class from express
import { userRouter } from './userRoutes.js'; // Import the userRouter from userRoutes
import { thoughtRouter } from './thoughtRoutes.js'; // Import the thoughtRouter from thoughtRoutes
// Create a new router to handle all the routes
const router = Router();
// Use the userRouter and thoughtRouter with the /users and /thoughts paths
router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);
export default router;
