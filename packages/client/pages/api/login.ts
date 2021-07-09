import { NextApiRequest, NextApiResponse } from "next";
import { setLoginSession } from "../../lib/auth";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const login = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const { access_token } = await login.json();

    await setLoginSession(res, { access_token });

    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
}
