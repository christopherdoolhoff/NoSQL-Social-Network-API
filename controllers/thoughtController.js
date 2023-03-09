const { User, Thought} = require('../models');

 module.exports= {
  // /api/thoughts

  // get all thoughts
  getAllThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // get one thoughts by id
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts with that ID" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

//   add thought
  addThought({ body }, res) {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(thought => {
            if (!thought) {
                res.status(404).json({ message: 'No user thought with this id!' });
                return;
            }
            res.json(thought);
        })
        .catch(err => res.json(err));
},

  // update Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  

  // delete thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: parmas.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

//   add a reaction
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(reaction => {
        if (!reaction) {
            res.status(404).json({message: 'No thoughts with this ID.'});
            return;
        }
        res.json(reaction);
    })
    .catch(err => res.status(400).json(err))
},

// delete a reaction
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    )
      .then((reaction) => {
        if (!reaction) {
          res.status(404).json({ message: 'No thoughts with this ID.'});
          return;
        }
       res.json(reaction);
      })
      .catch(err => res.json(err));
  }

};