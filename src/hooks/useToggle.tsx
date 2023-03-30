import { useEffect, useState } from "react"

export default function useToggle (defaultValue = false) {
    const [state, setState] = useState(defaultValue)

    function toggler () {
        setState(!state)
    }

    return [state, toggler]
}