import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import graphqlClient from "@/app/lib/graphql";

interface SignupResponse {
  insert_user_one: {
    id: string;
    username: string;
  };
}

const SIGN_UP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    insert_user_one(object: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  try {
    console.log("Received signup request:", { username, password });
    const data = await graphqlClient.request<SignupResponse>(SIGN_UP_MUTATION, {
      username,
      password,
    });
    console.log("Signup successful. Response:", data);
    res.status(200).json(data.insert_user_one);
  } catch (error) {
    console.error("Signup Failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
