import { getLoginSession } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req);
    let user = null;

    if (session) {
      const login = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      user = await login.json();
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
