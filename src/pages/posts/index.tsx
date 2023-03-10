import ArticleList from "@/modules/posts/list";
import { getPosts } from "@/services";
import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

const LIMIT_PER_PAGE = 5;

export default function Posts() {
  const [page, setPage] = useState(0);

  const { data } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts({ _start: page }),
  });
  console.log("🚀 ~ file: index.tsx:15 ~ Posts ~ data:", data);

  const onNext = useCallback(() => {}, []);
  const onPrevious = useCallback(() => {}, []);

  return (
    <>
      <Heading>this is posts</Heading>
      {data?.map((d) => (
        <ArticleList key={d.id} {...d} />
      ))}
    </>
  );
}
