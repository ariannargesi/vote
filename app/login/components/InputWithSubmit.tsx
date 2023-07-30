"use client";
import { Input } from "@/components/form";
import Button from "@/components/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { Loading } from "@/app/cmp/shared/loading/dots";
import { signIn } from "next-auth/react";
import React from "react";

function emailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function InputWithSubmit() {
  const [inputValue, setInputValue] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (emailIsValid(inputValue)) setAllowSubmit(true);
    else setAllowSubmit(false);
  }, [inputValue]);

  function submit () {
    if(inputValue){
        signIn('email', {callbackUrl: '/cmp', email:inputValue}, {})
    }
}

  return (
    <>
      <Input
        name="email"
        placeholder="example@gmail.com"
        required
        type="email"
        value={inputValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => 
            setInputValue(event.target.value)}
      />
      <Button color="primary" full extendClass="mt-2" disabled={!allowSubmit} onClick={submit}>
        {isLoading ? <Loading/> : 'بزن بریم'}
      </Button>
    </>
  );
}
