import { getLoginSession } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function diagnose(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getLoginSession(req);

    if (session) {
      await fetch("http://localhost:3000/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(req.body),
      });
    }

    res.status(200).json({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
