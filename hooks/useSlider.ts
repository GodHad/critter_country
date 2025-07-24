import { useState } from "react";

export const useSlider = (total: number) => {
    const [index, setIndex] = useState(0);

    return {
        index,
        goNext: () => setIndex((prev) => (prev + 1 < total ? prev + 1 : prev)),
        goPrev: () => setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
    }
}