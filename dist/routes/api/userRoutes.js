import { Router } from "express"; // Import the Router class
const router = Router(); // Create a new instance of the Router class
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend, } from "../../controllers/userController.js"; // Import the user controller functions
// /api/users
router.route("/").get(getAllUsers).post(createUser); // Create a new route for the /api/users endpoint
// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser); // Create a new route for the /api/users/:id endpoint
// /api/users/:userId/friends
router.route("/:userId/friends").post(addFriend); // Create a new route for the /api/users/:userId/friends endpoint
// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(removeFriend); // Create a new route for the /api/users/:userId/friends/:friendId endpoint
// Export the router
export { router as userRouter };
