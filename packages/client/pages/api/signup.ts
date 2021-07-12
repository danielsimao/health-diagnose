import { NextApiRequest, NextApiResponse } from "next";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const signup = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await signup.json();

    if (!data.email) {
      return res.status(409).send("Email already in use");
    }

    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
