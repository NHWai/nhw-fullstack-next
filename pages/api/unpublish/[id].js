import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: +postId }, // plus sign will change string type to integer
    data: { published: false },
  });

  res.json(post);
}
