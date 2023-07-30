"use client";

import React, { useState } from "react";
import Modal, { useModalStore } from "./shared/modal";
import { Header, Footer, Page, Content } from "./shared/layouts";
import Button from "@/components/Button";
import LocationsList from "./locations-list";
import Navigation from "./navigation";
import Comment, { Skeleton as CommentSkeleton } from "./comment";

export default function Playground() {
  const [input, setInput] = useState("");

  const toggleModal = useModalStore((state) => state.toggleModal);

  function confirmCallback() {
    alert("confirmCallback");
  }

  function onClickHandler() {
    toggleModal();
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
        <div className="space-y-0.5">
          <Comment />
          <Comment />
          <Comment/>
          <Comment />
          {/* <CommentSkeleton/> */}
        </div>
      </Content>
      <Footer>{/* <Navigation/>                 */}</Footer>
    </Page>
  );
}
