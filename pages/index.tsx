import { useRouter } from "next/router";
import { useEffect } from "react";

export default () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/svg-to-jsx");
  }, []);

  return null;
};
