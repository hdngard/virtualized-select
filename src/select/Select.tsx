import React, {useEffect, useRef, useState} from "react";
import {SelectInput} from "./SelectInput";
import {SelectOptions} from "./SelectOptions";


export const Select: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('')

    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [isOpen]);

    return (
        <div ref={rootRef} style={{position: 'relative'}}>
            <SelectInput isOpen={isOpen} setIsOpen={setIsOpen} value={value}/>
            {isOpen && <SelectOptions setValue={setValue}/>}
        </div>
    )
}