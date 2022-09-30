import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const postId = req.query.id;
  const post = await prisma.post.delete({
    where: { id: +postId },
  });
  res.json(post);
};

export default handler;
