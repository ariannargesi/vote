"use client";
import { Input } from "@/components/form";
import Button from "@/components/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { Loading } from "@/app/cmp/shared/loading/dots";

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
      <Button color="primary" full extendClass="mt-2" disabled={!allowSubmit}>
        {isLoading ? <Loading/> : 'بزن بریم'}
      </Button>
    </>
  );
}
