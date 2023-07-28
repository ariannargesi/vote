"use client";
import { shallow } from "zustand/shallow";
import { MouseEvent } from "react";
import Button from "@/components/Button";
import cn from "classnames";
import { create } from "zustand";

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

  let container =
    "bg-black/40 backdrop-blur-sm h-full max-w-3xl w-full duration-150 fixed top-0 left-0 right-0 mx-auto";
  let confirmBox =
    "w-11/12 bg-secondary pt-6 px-1 z-10 absolute bottom-0 rounded-t-2xl delay-150 duration-150 left-0 right-0 mx-auto";

  if (open === false) {
    container = cn(container, "opacity-0");
    confirmBox = cn(confirmBox, "translate-y-full");
  }



  return (
    <div className={container} onClick={closeBox}>
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
    </div>
  );
}
