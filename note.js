const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 1000;

// Sample data (in-memory database)
let users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: 2,
    username: "jane_doe",
    email: "jane@example.com",
    password: "password456",
  },
];

app.use(bodyParser.json());

// Get all users
app.get("/users", async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single user by ID
app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  //   const createdUser = req.body;
  const { username, email, password } = req.body;
  try {
    // Check if user with the same email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Create new user
    // const newUser = { id: users.length + 1, ...createdUser };
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);

    res.status(201).json({ newUser: newUser, message: "Add user success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing user
app.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email, password } = req.body;
  try {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        if (!users[i]) {
          res.status(404).json({ message: "User not found" });
        } else {
          users[i] = {
            id: userId,
            username: username,
            email: email,
            password: password,
          };
          console.log(users);
          res.json({ message: "User updated successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an existing user
// app.put('/users/:id', async (req, res) => {
//     const userId = parseInt(req.params.id);
//     const { username, email, password } = req.body;
//     try {
//       let user = users.find(user => user.id === userId);
//       if (!user) {
//         res.status(404).json({ message: 'User not found' });
//       } else {
//         user = { ...user, username, email, password };
//         res.json({ message: 'User updated successfully' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

// Delete a user
app.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    users = users.filter((user) => user.id !== userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user with the same email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Create new user
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if password matches
    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
