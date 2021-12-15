import { useEffect } from "react";

export default function useScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  // 화면이 재렌더링 될 때마다 화면을 위로 올린다?
  // 인자로 dependency를 받을 수도 있겠다
}
