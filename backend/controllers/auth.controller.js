const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key'; 

const decodePasswordToken = (passwordToken) => {
  try {
    const encodedSecretKey = Buffer.from(JWT_SECRET, "utf-8");

    const decoded = jwt.verify(passwordToken, encodedSecretKey);
    if (!decoded || !decoded.password) {
      throw new Error("Invalid token structure");
    }
    return decoded.password;
  } catch (error) {
    console.error("Error decoding password token:", error.message);
    throw new Error("Invalid or expired password token");
  }
};

  const generatePasswordToken = (req, res) => {
    try {
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const token = jwt.sign({ password }, JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

const register = async (req, res) => {
  try {
    const { email, username, password, name, surname, idNumber, phone, role } = req.body;

    console.log(email, username, password, name, surname, idNumber, phone, role);

    const passwordDec = decodePasswordToken(password);
    console.log("Decoded password: ", passwordDec)

    if (!username || !passwordDec || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (passwordDec.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(passwordDec, 10);

    const newUser = new User({ email, username, password: hashedPassword, name, surname, idNumber, phone, role });

    await newUser.save();
    res.status(201).json({ message: `User registered with username: ${username}` });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const passwordDec = decodePasswordToken(password);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: `User with username ${username} not found` });
    }

    const isMatch = await bcrypt.compare(passwordDec, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password mismatch" });
    }

    const token = jwt.sign(
      {
        sub: { username: user.username, email: user.email, role: user.role },
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
  generatePasswordToken
};