"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { TextField, Typography, Container, Button } from "@mui/material";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      //Make a POST request to login api end point
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        router.push("/books");
      } else {
        console.error("Login failed");
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        margin: "auto",
        textAlign: "center",
        marginTop: "20vh",
        marginBottom: "20vh",
      }}>
      <div>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined" //adds outline to the input field
            margin="normal" //sets the margin for the inputs
            fullWidth //makes the input takes the full width of the container
            required
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}
