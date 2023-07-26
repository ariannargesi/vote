"use client";
import { Header, Footer, Content, Page } from "@/pages/cmp";
import Navigation from "@/app/cmp/navigation";
import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/form";

export default function Index() {
  return (
    <Page>
      <Header title="خانه" end={<Button>سلام</Button>} />
      <Content>
        <Input/>
      </Content>
      <Navigation />
    </Page>
  );
}
