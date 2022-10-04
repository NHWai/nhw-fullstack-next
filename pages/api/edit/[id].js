import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const postId = req.query.id;
  const { title, content, updatedAt } = req.body;

  const updatedPost = await prisma.post.update({
    where: {
      id: +postId,
    },
    data: {
      title,
      content,
      updatedAt,
    },
  });

  res.json(updatedPost);
};

export default handler;
