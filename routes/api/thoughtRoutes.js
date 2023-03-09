const router = require("express").Router();

const {
  getAllThought,
  getThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// route to GET all thoughts and route to POST (create) a new thought
router.route("/").get(getAllThought).post(addThought);

// route to GET a single thought by its _id, route to PUT (update) a thought by its _id, and route to DELETE a thought by its _id
router.route("/:thoughtId").get(getThought).put(updateThought).delete(deleteThought);

// route to Post (add) a new reaction to a thought's reactions array
router.route("/:thoughtId/reactions/").post(addReaction);

// route to DELETE a reaction by the reactions _id
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;