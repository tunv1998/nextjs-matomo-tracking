import { getPost } from "@/services";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["post", params?.id], () =>
    getPost(params?.id as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: params?.id,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      "/posts/*",
      // Object variant:
      //   { params: { slug: "second-post" } },
    ],
    fallback: true,
  };
}

interface PostDetailProps {
  id: string;
}

export default function PostDetail({ id }: PostDetailProps) {
  if (!id) return <>Loading ...</>;
  return <>Detail: {id}</>;
}
