import prisma from "../lib/prisma";
import Link from "next/link";
import Box from "../components/Box";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function Home({ feeds }) {
  const toMark = (text) => marked.parse(text, { breaks: true });
  return (
    <div className="flex flex-col gap-8">
      {feeds?.map((el) => {
        return (
          <Link key={el.id} href={`/p/${el.id}`}>
            <div className="cursor-pointer">
              <Box>
                <button className="text-2xl italic">{el.title}</button>

                <div className="leading-6">
                  <div className="prose">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          toMark(el.content.slice(0, 30) + "...")
                        ),
                      }}
                    ></div>
                  </div>
                </div>
              </Box>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const feeds = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feeds },
    revalidate: 10,
  };
};
