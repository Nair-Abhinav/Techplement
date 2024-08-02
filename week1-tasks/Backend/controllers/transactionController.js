const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deposit = async (req, res) => {
  const amount = Number(req.body.amount);
  try {
    const user = await User.findById(req.user.id);
    console.log("User requested for deposit",user);
    user.balance += amount;
    await user.save();
    await new Transaction({
      user: user._id,
      type: 'deposit',
      amount
    }).save();
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.withdraw = async (req, res) => {
  const  amount  = Number(req.body.amount);
  try {
    const user = await User.findById(req.user.id);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    user.balance -= amount;
    await user.save();
    await new Transaction({
      user: user._id,
      type: 'withdrawal',
      amount
    }).save();
    
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
