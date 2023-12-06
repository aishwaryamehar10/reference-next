"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { TextField, Typography, Container, Button } from "@mui/material";

export default function Login() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful", data);
        router.push("/home");
      } else {
        console.error("Signup Failed");
      }
    } catch (error) {
      console.error("Signup Failed:", error);
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
        <Typography variant="h5">SignUp</Typography>
        <form onSubmit={handleSignup}>
          <TextField
            variant="outlined" //adds outline to the input field
            margin="normal" //sets the margin for the inputs
            fullWidth //makes the input takes the full width of the container
            required
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
            SignUp
          </Button>
        </form>
      </div>
    </Container>
  );
}
