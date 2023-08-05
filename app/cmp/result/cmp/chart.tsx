import React from 'react'
import cn from 'classnames'

export function SqureChart({
    values,
  }: {
    values: { title: string; value: number; bgColor: string }[];
  }) {
    function isOdd(num: number): boolean {
      return num % 2 === 0;
    }
  
    return (
      <div className="flex">
        {values.map((currentItem, index) => {
  
          let cn_box = "h-12";
          if (index === 0) cn_box = cn(cn_box, "rounded-r-md");
          else if (index === values.length - 1)
            cn_box = cn(cn_box, "rounded-l-md");
  
          let cn_title = "flex flex-col items-center";
          let en_title_extra = "";
          if (isOdd(index))
            en_title_extra = "flex-col-reverse translate-y-12";
          else en_title_extra = "-translate-y-full";
          cn_title = cn(cn_title, en_title_extra);
  
          return (
            <div
              key={currentItem.title}
              className={cn_box}
              style={{
                backgroundColor: currentItem.bgColor,
                width: `${currentItem.value}%`,
              }}
            >
              <div className={cn_title}>
                <span className="text-center min-w-[200px]">
                  {currentItem.title}
                </span>
                <div className="w-0.5 h-16 bg-white" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  