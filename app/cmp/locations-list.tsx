import React, { ChangeEvent, useEffect, useState } from "react";
import List from "./shared/List";
import Modal from "./shared/modal";
import { Input } from "./shared/input";
import { locations } from "../../shared";

export default function LocationsList(props) {

  const [input, setInput] = useState('')
  const [list, setList] = useState<string[]>([])

    useEffect(() => {
        if(input)
            setList(list => list.filter(currentItem => currentItem.indexOf(input) > -1))
        else setList(locations)
    }, [input])

  return (
    <Modal>
      <Input placeholder="اسم شهر" dark value={input} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}/>
      <List>
        {list.map((currentItem) => (
          <List.ListItem key={currentItem}>{currentItem}</List.ListItem>
        ))}
        {list.length === 0 && <span>محل مورد نظر پیدا نشد</span>}
      </List>
    </Modal>
  );
}
