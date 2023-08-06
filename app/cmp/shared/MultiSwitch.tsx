'use client'

import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";


function calculateBgPosition(list, index) {
  return (100 / list.length) * index;
}

interface Props {
    options: string[],
    selectedItem: string,
    onChange: (value:string) => void,
    itemWidth?: number
}

const Switch = ({options, selectedItem: _selectedItem, onChange, itemWidth = 100}: Props) => {

  const [selectedItem, setSelectedItem] = useState<string>(_selectedItem);
  const [bgPosition, setBgPosition] = useState<string>();

  useLayoutEffect(() => {
    const index = options.indexOf(selectedItem);
    let position: string | number = calculateBgPosition(options, index) + '%';
    setBgPosition(position)
    onChange(selectedItem)
  }, [selectedItem]);

  return (
    <div className="bg-primary inline-block px-1 rounded-lg">
      <div
        className='relative w-[120] py-2 flex items-center'
        style={{
          width: options.length * itemWidth
        }}
      >
        <span
          className="h-8 z-0 absolute duration-100 bg-secondary rounded-md"
          style={{
            width: itemWidth ,
            right: bgPosition
          }}
        ></span>
        {options.map((currentItem) => {
          return (
            <button
                className="relative z-10 text-sm"
              key={currentItem}
              style={{ width: itemWidth }}
              onClick={() => {setSelectedItem(currentItem)}}
            >
              {currentItem}
            </button>
          );
        })}
      </div>
      </div>
  );
};

export default Switch;
