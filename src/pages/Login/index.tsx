import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { pick, pipe } from "ramda";
import { useImmer } from "use-immer";
import queryString from "query-string";
import { allAPI } from "@/api";
import { useGlobalStore } from "@/store";
import PageWrapper from "@/components/PageWrapper";
import Loading from "@/components/Loading";

const mapStateToProps = pick(["update"]);

const Login: React.FC = () => {
  const global = useGlobalStore(mapStateToProps);

  const navigate = useNavigate();
  const jump = pipe(queryString.stringifyUrl as any, navigate);

  const [pageData, updatePageData] = useImmer<{ userInfo?: T.User }>({});
  const [pageStatus, updatePageStatus] = useImmer<{ id: number }>({ id: 1 });

  const { isLoading } = useSWR(
    ["getUsersId", pageStatus.id],
    ([, id]) => allAPI.getUsersId({ id }),
    {
      onSuccess(user) {
        updatePageData((draft) => {
          draft.userInfo = user;
        });
      },
    }
  );

  const handleQuery = (count: number) => {
    const _id = pageStatus.id + count;
    updatePageStatus((draft) => {
      draft.id = _id > 10 ? 10 : _id < 1 ? 1 : _id;
    });
  };

  const handleJump = () => {
    global.update({ currentUser: pageData.userInfo });
    jump({
      url: "/home",
      query: { from: "/login", id: pageStatus.id },
    });
  };

  return (
    <PageWrapper
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "20rem" }}>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div>id: {pageData.userInfo?.id}</div>
              <div>name: {pageData.userInfo?.name}</div>
              <div>username: {pageData.userInfo?.username}</div>
              <div>email: {pageData.userInfo?.email}</div>
              <div>phone: {pageData.userInfo?.phone}</div>
              <div>website: {pageData.userInfo?.website}</div>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem",
          }}
        >
          <button disabled={isLoading} onClick={() => handleQuery(-1)}>
            ??????????????????
          </button>
          <button disabled={isLoading} onClick={() => handleQuery(1)}>
            ??????????????????
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <button disabled={isLoading} onClick={handleJump}>
            ??????
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
