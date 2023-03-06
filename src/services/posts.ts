import { useQuery } from "react-query";
import { IParams } from "./types";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = async ({
  _start = 0,
  _limit = 5,
}: IParams): Promise<IPost[]> => {
  const url = new URL(`https://jsonplaceholder.typicode.com/posts`);
  url.searchParams.set("_start", _start.toString());
  url.searchParams.set("_limit", _limit.toString());

  const res = await fetch(url.href);
  const posts = await res.json();
  return posts;
};

export const usePosts = ({ page = 0 }) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts({ _start: page * 5, _limit: 5 }),
  });
};
