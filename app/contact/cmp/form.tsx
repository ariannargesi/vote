'use client'
import React from "react";
import { Label, Textarea } from "../../cmp/shared/input";
import Button from "../../../components/Button";
import { gql } from "@apollo/client";
import { useSession } from "next-auth/react";

export default function Form(props: { onSubmit: () => void }) {
    const session = useSession()
    async function handleClick() {

        await props.onSubmit()
    }

  return (
    <>
    { JSON.stringify(session.data) }
      <Label htmlFor="message">ارسال پیام</Label>
      <Textarea id="message" />
      <Button 
        full 
        extendClass="mt-4" 
        color="info" 
        onClick={handleClick}
    >
        ارسال
      </Button>
    </>
  );
}
