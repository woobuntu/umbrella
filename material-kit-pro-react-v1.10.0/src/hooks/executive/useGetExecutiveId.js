import { useParams } from "react-router";

export default function useGetExecutiveId() {
  const { id } = useParams();

  return id ? Number(id) : 1;
  // id없으면 대표자 페이지로 리다이렉트시키기 위함
}
