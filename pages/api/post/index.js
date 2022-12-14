// pages/api/post/index.ts

import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, content, createdAt, updatedAt, published } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      createdAt: createdAt,
      updatedAt: updatedAt,
      published: published,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
