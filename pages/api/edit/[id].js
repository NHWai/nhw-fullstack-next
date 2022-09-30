import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const postId = req.query.id;
  const { title, content } = req.body;

  const updatedPost = await prisma.post.update({
    where: {
      id: +postId,
    },
    data: {
      title,
      content,
    },
  });

  res.json(updatedPost);
};

export default handler;
