import prisma from "../lib/prisma";
import Link from "next/link";

export default function Home({ feeds }) {
  return (
    <ul className="list-disc flex flex-col gap-2">
      {feeds?.map((el) => {
        return (
          <li key={el.id}>
            <Link href={`/p/${el.id}`}>
              <button className="underline underline-offset-4">
                {el.title} &#62;&#62;
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export const getStaticProps = async () => {
  const feeds = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      id: "asc",
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  // const feeds = [];
  return {
    props: { feeds },
    revalidate: 10,
  };
};
