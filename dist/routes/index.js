import { Router } from 'express'; // Import the Router class from Express
import apiRoutes from './api/index.js'; // Import the API routes from the /api directory
const router = Router(); // Create a new router object
// Use the API routes
router.use('/api', apiRoutes);
// Export the router
export default router;
