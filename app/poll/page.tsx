"use client";
import React, { useState } from "react";
import { Page, Header, Footer, Content } from "../cmp/shared/layouts";
import ScoreAction from "../cmp/shared/ScoreAction";
import CopyBox from "../cmp/shared/copy-box";
import Button from "../../components/Button";
import Badge from "../cmp/shared/badge";
import { Compass, Incognito } from "react-bootstrap-icons";
import ProfileData from "../cmp/shared/profile-data";
import WriteComment from "../cmp/comment/write-comment";
import Navigation from "../cmp/navigation";
import Comment from "../cmp/comment/card";
import { spawn } from "child_process";
export default function Poll() {
  const [showComments, setShowComments] = useState<boolean>(false);

  return (
    <Page>
      <Header />
      <Content extendClass="px-2 pt-6 space-y-3">
        <h1 className="font-bold text-xl">
          نظر شما در مورد عملکرد شهردار رشت چیست؟
        </h1>
        <div className="flex gap-x-3 pr-2">
          <ScoreAction />
          <p onClick={() => alert("fsdfsadf")}>
            حرف های نگفته‌مان جایی در حافظه سلول های بدن ذخیره می‌شود. روان،
            آنچه توان بروزش را ندارد به جسم امانت میسپارد. و تنش و اضطراب
            اینگونه در اعضای بدن می‌نشیند و منتظر فرصتی برای بروز می‌ماند.و تنش
            و اضطراب اینگونه در اعضای بدن می‌نشیند و منتظر فرصتی برای بروز
            می‌ماند.و تنش و اضطراب اینگونه در اعضای بدن می‌نشیند و منتظر فرصتی
            برای بروز می‌ماند.و تنش و اضطراب اینگونه در اعضای بدن می‌نشیند و
            منتظر فرصتی برای بروز می‌ماند.
          </p>
        </div>
        <div className="bg-secondary rounded-md h-48"></div>
        <div className="flex justify-between">
          <Badge
            color="success"
            extraClassName="inline-flex items-center gap-x-3"
          >
            <Compass />
            <span>رشت</span>
          </Badge>
          <span>
            <span className="text-sm text-gray-400">تاریخ ایجاد: </span>
            ۱۴۰۲/۴/۲
          </span>
        </div>
        <ProfileData />
        <div className="text-end">
          <CopyBox text="https://pollmax.com/xyz324" />
        </div>
        <div>
          <button onClick={() => setShowComments(true)}>
            {<span>مشاهده ۴۴ کامنت</span>}
          </button>
          {showComments && (
            <>
              <div className="rounded-t-lg py-2 border-b border-b-white">
                <div className="w-16 bg-slate-400 rounded-lg h-1 mx-auto"></div>
              </div>
              <div className="h-[700px] overflow-scroll bg-secondary">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
              </div>
            </>
          )}
        </div>
      </Content>
      <Footer>{showComments ? <WriteComment /> : <Navigation />}</Footer>
    </Page>
  );
}
