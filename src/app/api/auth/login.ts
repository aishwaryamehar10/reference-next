import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-request";
import graphqlClient from "@/app/lib/graphql";

//defining inteface
interface LoginResponse {
  Login: {
    token: string;
    user: {
      id: string;
      username: string;
    };
  };
}

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  try {
    //using the loginresponse interface to specify the expected structure of the response
    const data = await graphqlClient.request<LoginResponse>(LOGIN_MUTATION, {
      username,
      password,
    });

    res.status(200).json(data.Login);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
