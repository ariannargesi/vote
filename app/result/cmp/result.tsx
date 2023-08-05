'use client'
import React from "react";
import Badge from "../../cmp/shared/badge";
import MultiSwitch from '../../cmp/shared/MultiSwitch'
export default function Results(props) {
  return (
    <div className="bg-secondary rounded-md p-2 space-y-4">
      <MultiSwitch 
                itemWidth={90}
                options={['پیش‌فرض', 'صعودی', 'نزولی']} 
                selectedItem={'صعودی'} 
                onChange={function (value: string): void {
                    
                } }                
                />
      <Row/>
      <Row/>
      <Row/>
      <Row/>
    </div>
  );
}

export function Row(props) {
  return (
    <div className="flex">
      <div className="flex flex-col text-xs min-w-[4rem]">
        <span className="font-bold">۴۵٪</span>
        <span >۴۳۰ نظر</span>
      </div>
      <div className="bg-primary rounded-md gap-x-2 px-2 py-1 overflow-x-scroll">
        <div className="min-w-[350px] flex gap-x-3 items-center ">
          <span className="text-sm">
            فکر میکنم او در کار خود بسیار ماهر است
          </span>
          <Badge color="success">جزییات</Badge>
        </div>
      </div>
    </div>
  );
}
