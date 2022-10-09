import prisma from "../lib/prisma";
import Link from "next/link";
import Box from "../components/Box";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export default function Home({ feeds }) {
  const toMark = (text) => marked.parse(text, { breaks: true });
  const showTime = (duration) => {
    const sec = Math.floor((duration / 1000) % 60);
    const min = Math.floor(duration / (1000 * 60));
    const hrs = Math.floor(duration / (1000 * 60 * 60));
    const day = Math.floor(hrs / 24);
    const month = Math.floor(day / 30);
    const year = Math.floor(month / 12);

    if (year) {
      return ` ${year == 1 ? "a year ago" : year + " years ago"} `;
    }

    if (month) {
      return ` ${month === 1 ? "a month ago" : month + " months ago"} `;
    }

    if (day) {
      return ` ${day === 1 ? "a day ago" : day + " days ago"}`;
    }

    if (hrs) {
      return ` ${hrs === 1 ? "an hour ago" : hrs + " hours ago"} `;
    }

    if (min) {
      return `${min === 1 ? "a minute ago" : min + " mins ago"}`;
    }

    return "recently updated";
  };
  // console.log(showInHrs(+feeds[0].updatedAt));
  const currTime = new Date().getTime();
  return (
    <div className="flex flex-col gap-8">
      {feeds?.map((el) => {
        return (
          <Link key={el.id} href={`/p/${el.id}`}>
            <div className="cursor-pointer">
              <Box>
                <div className="text-2xl italic">{el.title}</div>
                <span className="text-slate-400 italic text-xs">
                  {showTime(currTime - el.updatedAt)}
                </span>
                <div className="leading-6">
                  <div className="prose">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          toMark(el.content.slice(0, 100) + "...")
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
