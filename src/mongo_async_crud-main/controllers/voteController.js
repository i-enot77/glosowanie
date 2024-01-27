const Vote = require("../model/Vote");

const submitVote = async (req, res) => {
  const { useremail, user, answer } = req.body;

  try {
    const existingVote = await Vote.findOne({ useremail }).exec();

    if (existingVote) {
      return res
        .status(409)
        .json({ message: "Vote already submitted, cannot change it." });
    }

    const newVote = new Vote({
      useremail,
      user,
      answer,
    });

    await newVote.save();

    res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error submitting vote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  submitVote,
};
