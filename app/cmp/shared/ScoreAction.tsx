import React from 'react'
import { Plus, Dash } from 'react-bootstrap-icons'


export default function ScoreAction () {
    return (
        <div className="flex flex-col items-center">
          <Plus className="text-green-400 text-3xl" />
          <span className="text-green-400 font-bold">۳۴+</span>
          <Dash className="text-3xl" />
        </div>
    )
}