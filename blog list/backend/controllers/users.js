const bcrypt = require('bcrypt')
const User = require('../models/user')

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 12

const createUser = async (req, res) => {
  const { username, name, password } = req.body

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'username is required' })
  }
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'password is required' })
  }

  const cleanUsername = username.trim().toLowerCase()
  const cleanName = name ? name.trim() : ''

  if (cleanUsername.length < 3 || cleanUsername.length > 30) {
    return res.status(400).json({ error: 'username must be 3-30 characters' })
  }
  if (!/^[a-z0-9_]+$/.test(cleanUsername)) {
    return res.status(400).json({ error: 'username may only contain letters, numbers, and underscores' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' })
  }


  // --- Hash & persist ---
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  const user = new User({ username: cleanUsername, name: cleanName, passwordHash })
  const savedUser = await user.save()

  // --- Return only safe fields ---
  res.status(201).json({
    id: savedUser.id,
    username: savedUser.username,
    name: savedUser.name,
  })
}


const getAllUsers = async (request, response,next) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.status(200).json(users)
}

module.exports = { createUser,getAllUsers }