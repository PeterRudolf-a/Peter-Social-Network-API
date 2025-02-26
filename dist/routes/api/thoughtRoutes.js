import { Router } from "express"; // Import the Router class
const router = Router(); // Create a new router object
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction, } from "../../controllers/thoughtController.js"; // Import the thought controller functions
// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought); // Set up GET all and POST at /api/thoughts
// /api/thoughts/:id
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought); // Set up GET one, PUT, and DELETE at /api/thoughts/:id
// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction); // Set up POST at /api/thoughts/:thoughtId/reactions
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction); // Set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
export { router as thoughtRouter };
