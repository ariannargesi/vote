"use client";
import React from 'react'
import { shallow } from "zustand/shallow";
import cn from "classnames";
import { create } from "zustand";
import Overlay from "./overlay";
import { ReactNode } from "react";

interface ModalState {
  open: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>()((set, get) => ({
  open: false,
  toggleModal() {
    set((state) => ({ open: !state.open}));
  },
}));

export default function Modal({children}: {children: ReactNode}) {

  const [open, toggleModal] = useModalStore(
    (state) => [
      state.open,
      state.toggleModal,
    ],
    shallow
  );

  let modalBox =
    "w-11/12 max-h-[90%] h-full bg-secondary p-4 z-10 absolute rounded-2xl delay-150 duration-150 top-1/2 -translate-y-1/2 left-0 right-0 mx-auto overflow-hidden";

  if (open === false) 
    modalBox = cn(modalBox, "translate-y-1/2");

  return (
    <Overlay onClick={toggleModal} active={open}>
      <div className={modalBox} onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </Overlay>
  );
}
