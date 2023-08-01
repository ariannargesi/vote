"use client";

import React, { useState } from "react";
import Modal, { useModalStore } from "./shared/modal";
import { Header, Footer, Page, Content } from "./shared/layouts";
import Button from "@/components/Button";
import LocationsList from "./locations-list";
import Navigation from "./navigation";
import Comment, { Skeleton as CommentSkeleton } from "./comment/card";
import WriteComment from "./comment/write-comment";
import ConfirmBox, { useConfirmBoxStore } from "./shared/confirm-box";
import Paper from "@/components/Paper";
export default function Playground() {
  const [input, setInput] = useState("");

  const askForConfirm = useConfirmBoxStore((state) => state.askForConfirm);

  function confirmCallback() {
    alert("confirmCallback");
  }

  function onClickHandler() {
    askForConfirm("Are you sure?", "Yes", () => {
      alert("deleting...");
    });
  }

  return (
    <Page>
      <Header
        title="کامپوننت‌ها"
        end={
          <Button className="relative z-10" onClick={onClickHandler}>
            T
          </Button>
        }
      />
      <Content>
        <Paper
          options={['خرید طلا', 'خرید سکه', 'خرید ارز' ,'خرید مسکن']}
          pollId={"۴۳۴۳"}
          results={[{value: 25}, {value: 25}, {value: 25}, {value: 25}]}
          votesCount={150}
          userVote={undefined}
          userState={null}
          pollState={null}
        />
      </Content>
  
    </Page>
  );
}
