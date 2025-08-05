import { useState } from "react"

export const useCounter = ( initialValue = 10, min, max ) => {

    const [counter, setCounter] = useState(initialValue);

    const increment = (value = 1) => {
        if (max !== undefined && counter >= max) return;
        setCounter(counter + value);
    }

    const decrement = (value = 1) => {
        if (min !== undefined && counter <= min) return;
        setCounter(counter - value);
    }

    return {
        counter,
        increment,
        decrement,
        reset: () => setCounter(initialValue)
    }

}
