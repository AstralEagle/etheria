import Express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../DB/schema/User.js';

const router = Express.Router();

const verifEmail = (email) =>
  !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      .test(email);


router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    if (verifEmail(email)) {
      throw new Error({
        message: 'Invalid input',
        code: 400,
      });
    }
    const user = await User.findOne({where: {email}});
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error({message: 'Invalid password', code: 400});
    }
    const token = await jwt.sign(
        {userId: user.id, email: user.email},
        process.env.TOKEN_SECRET,
        {expiresIn: '10h'});
    res.status(200).json({userID: user.id, token});
  } catch (e) {
    console.error(e);
    res.status(e.code || 500).send(e.message);
  }
});
router.post('/signup', async (req, res) => {
  try {
    const {email, password, name} = req.body;
    if (verifEmail(email)) {
      throw new Error('Invalid input');
    }
    const user = await User.findOne({where: {email}});
    if (user) {
      throw new Error('Invalid email');
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({name, email, password: hash});
    res.status(201).send('user created');
  } catch (e) {
    console.error(e);
    res.status(e.code || 500).send(e.message);
  }
});

export default router;
