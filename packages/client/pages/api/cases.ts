import { getLoginSession } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function cases(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req);
    let cases = null;

    if (session) {
      const login = await fetch("http://localhost:3000/case/unreviewed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      cases = await login.json();
    }

    res.status(200).json({ cases });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
