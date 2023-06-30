import React from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useImmer } from "use-immer";
import PageWrapper from "@/components/PageWrapper";

const wrapPromise = (promise: Promise<any>) => {
  let status = "pending";
  let result: any;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    },
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

const fetchUser = () => {
  console.log("fetchUser");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fetchUser resolveed");
      resolve({
        name: "king",
      });
    }, 1e3);
  });
};

const fetchDatas = () => {
  let userPromise = fetchUser();

  return {
    user: wrapPromise(userPromise),
  };
};

const resource = fetchDatas();

interface IProps {}

const Suspender: React.FC<IProps> = (props) => {
  const [pageData, updatePageData] = useImmer<{}>({});
  const [pageStatus, updatePageStatus] = useImmer<{}>({});
  const [pageTempData, updatePageTempData] = useImmer<{}>({});

  const user = resource.user.read();

  return (
    <PageWrapper>
      <div>{user.name}</div>
    </PageWrapper>
  );
};

export default Suspender;
