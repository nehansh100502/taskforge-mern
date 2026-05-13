import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 📧 Register
export const registerUser = async (req, res) => {
    try {
      console.log("BODY:", req.body);
  
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
      }
  
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = await User.create({
        name,
        email,
        password
      });
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
  
    } catch (error) {
      console.error(error); // 👈 VERY IMPORTANT
      res.status(500).json({ message: 'Server error' });
    }
  };
// 📧 Login
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      // ❌ No user
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // ❌ Google account trying email login
      if (!user.password) {
        return res.status(400).json({
          message: 'This account was created with Google. Please login with Google.'
        });
      }
  
      // ❌ Wrong password
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // ✅ Success
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const logoutUser = async (req, res) => {
    try {
      res.status(200).json({
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Logout failed' });
    }
  };

export const getMe = async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential || !process.env.GOOGLE_CLIENT_ID) {
      return res.status(400).json({ message: 'Google sign-in is not configured' });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      return res.status(400).json({ message: 'Invalid Google token' });
    }

    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ $or: [{ email }, { googleId }] });
    if (!user) {
      user = await User.create({ email, name: name || email.split('@')[0], googleId });
    } else {
      if (!user.googleId) user.googleId = googleId;
      if (name && !user.name) user.name = name;
      await user.save();
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Google login failed' });
  }
};