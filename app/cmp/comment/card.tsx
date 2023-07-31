import React, { ReactNode } from "react";
import Image from "next/image";
import {
  Plus,
  Dash
} from "react-bootstrap-icons";
import ScoreAction from "../shared/ScoreAction";

export default function Comment() {
  return (
    <div className="bg-secondary p-3 space-y-1">
      <div className="flex gap-x-2 items-center">
        <Image
          src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
          alt="user profile"
          width={42}
          height={42}
          className="rounded-full"
        />
        <span className="text-sm">alireza.jalili</span>
        <span className="text-gray-400 text-xs">دیروز</span>
      </div>
      <div className="flex gap-x-3">
        <ScoreAction/>
        <p>
          حرف های نگفته‌مان جایی در حافظه سلول های بدن ذخیره می‌شود. روان، آنچه
          توان بروزش را ندارد به جسم امانت میسپارد. و تنش و اضطراب اینگونه در
          اعضای بدن می‌نشیند و منتظر فرصتی برای بروز می‌ماند.
        </p>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="bg-secondary p-3 animate-pulse space-y-2">
      <div className="flex gap-x-2 items-center">
        <div className="bg-slate-500 w-10 h-10 rounded-full"></div>
        <span className="w-14 h-4 bg-slate-500 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="h-6 bg-slate-500 rounded-lg" />
        <div className="h-6 w-3/4 bg-slate-500 rounded-lg" />
      </div>
    </div>
  );
}
