"use client";
import { shallow } from "zustand/shallow";
import { MouseEvent } from "react";
import Button from "@/components/Button";
import cn from "classnames";
import { create } from "zustand";
import Overlay from "./overlay";

interface ConfirmBoxStatet {
  open: boolean;
  boxTitle?: string;
  buttonLabel?: string;
  callback?: () => void;
  askForConfirm: (
    boxTitle: string,
    buttonLabel: string,
    callback: () => void
  ) => void;
  closeBox: () => void;
}

export const useConfirmBoxStore = create<ConfirmBoxStatet>()((set, get) => ({
  open: false,
  askForConfirm(boxTitle, buttonLabel, callback) {
    set((state) => ({ open: true, boxTitle, buttonLabel, callback }));
  },
  closeBox() {
    set((state) => ({ open: false }));
  },
}));

export default function ConfirmBox() {

  const [open, closeBox, boxTitle, buttonLabel, callback] = useConfirmBoxStore(
    (state) => [
      state.open,
      state.closeBox,
      state.boxTitle,
      state.buttonLabel,
      state.callback,
    ],
    shallow
  );

  let confirmBox =
    "w-11/12 bg-secondary pt-6 px-1 z-10 absolute bottom-0 rounded-t-2xl delay-150 duration-150 left-0 right-0 mx-auto";

  if (open === false) {
  
    confirmBox = cn(confirmBox, "translate-y-full");
  }



  return (
    <Overlay onClick={closeBox} active={open}>
      <div className={confirmBox}>
        <h4 className="font-bold text-xl text-danger text-center">
          {boxTitle}
        </h4>
        <div className="flex gap-x-2 px-16 my-6">
          <Button color="danger" outline extendClass="w-3/4" onClick={callback}>
            {buttonLabel}
          </Button>
          <Button outline extendClass="w-1/4">
            بیخیال
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
