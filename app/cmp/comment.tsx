import React, { ReactNode } from "react";
import Image from "next/image";
import {
  Plus,
  Dash,
  Fingerprint,
  ChatRightText,
  Trash,
} from "react-bootstrap-icons";
import Badge from "./shared/badge";
import Button from "../../components/Button";
export default function Comment() {
  return (
    <div className="bg-secondary p-3">
      <div className="flex gap-x-2">
        <span className="text-sm">alireza.jalili</span>
        <span className="text-gray-400 text-xs">دیروز</span>
        <Trash className="text-danger text-xl" />
      </div>
      <div className="flex gap-x-1 mt-1">
        <div className="w-2/12">
          <Image
            src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
            alt="user profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
       
        <p className="leading-4 w-10/12">
          وقتی با امور کوچک آغاز میکنید، این کوچولوها پیوسته زایش میکنند و چند
          برابر میشوند، . درست مثل خرگوش در فصل بهار
        </p>
        
      </div>
      <div className="flex items-center gap-x-3 mt-2">
        <Button color="primary" size="sm" extendClass="border border-gray-500">
          <Plus className="text-green-400 text-xl" />
        </Button>
        <Button color="primary" size="sm" extendClass="border border-gray-500">
          <Dash className="text-xl" />
        </Button>
        <span className="text-green-400 font-bold">۳۴+</span>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="bg-secondary p-3 flex gap-x-3 animate-pulse">
      <div>
        <div className="bg-slate-500 w-10 h-10 rounded-full"></div>
      </div>
      <div className="w-full space-y-2">
        <div className="flex gap-x-2 items-center">
          <span className="w-14 h-4 bg-slate-500 rounded-lg" />
          <span className="w-10 h-4 bg-slate-500 rounded-lg" />
        </div>
        <div className="h-6 bg-slate-500 rounded-lg" />
        <div className="flex gap-x-3 mt-1">
          <div className="w-14 h-4 bg-slate-500 rounded-lg" />
          <div className="w-14 h-4 bg-slate-500 rounded-lg" />
          <div className="w-14 h-4 bg-slate-500 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
