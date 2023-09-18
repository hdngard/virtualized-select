import {useCallback, useLayoutEffect, useRef, useState,} from "react";
import {useFixedSizeList} from '../hooks/useFixedSizeList';
import styled from "@emotion/styled";
import {SelectOption} from "./SelectOption";

interface StyledSelectOptionsProps {
    containerHeight: number;
}

const StyledSelectOptions = styled.div<StyledSelectOptionsProps>`
  background-color: white;
  height: ${props => props.containerHeight + 'px'};
  overflow: auto;
  position: absolute;
  top: 32px;
  width: 360px;
  border-radius: 4px;
  box-shadow: 0px 10px 30px 0px rgba(46, 62, 154, 0.10);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 4px #3F4254;
    border-radius: 2px;
    border-right: 1px solid white;
    border-left: 1px solid white;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
  }
`

const itemHeight = 32;
const containerHeight = 168;

interface IListItem {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    job?: string | undefined;
}

interface SelectOptionsProps {
    setValue: (value: (((prevState: string) => string) | string)) => void;
}

export function SelectOptions(props: SelectOptionsProps) {
    const {setValue} = props;

    const [listItems, setListItems] = useState<IListItem[]>([]);
    const scrollElementRef = useRef<HTMLDivElement | null>(null);
    const [pageCount, setPageCount] = useState(1);


    useLayoutEffect(() => {
        const dataFetch = async () => {
            const data = await (await fetch(`/api/users?page=${pageCount}&limit=50`)).json();
            setListItems([...listItems, ...data.data]);
        };

        dataFetch();
    }, [pageCount]);

    useLayoutEffect(() => {
        const scrollElement = scrollElementRef.current;

        if (!scrollElement) {
            return;
        }

        //при прокрутке до конца списка сетим след страницу
        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop;
            if (scrollTop === itemHeight * 50 * pageCount - containerHeight) {
                setPageCount(pageCount => pageCount + 1)
            }
        };

        handleScroll();

        scrollElement.addEventListener("scroll", handleScroll);

        return () => scrollElement.removeEventListener("scroll", handleScroll);
    }, [pageCount]);

    //создаем виртуализацию скролла, рендерим только кол-во элементов которое входит в высоту блока
    //+ оверскан чтобы не было пробелов во время прокрутки
    const {virtualItems, totalHeight} = useFixedSizeList({
        itemHeight: itemHeight,
        itemsCount: listItems.length,
        listHeight: containerHeight,
        getScrollElement: useCallback(() => scrollElementRef.current, []),
    });

    return (
        <StyledSelectOptions
            ref={scrollElementRef}
            containerHeight={containerHeight}
        >
            <div style={{height: totalHeight}}>
                {virtualItems.map((virtualItem, ind) => {
                    const item = listItems[virtualItem.index]!;

                    return (
                        <SelectOption
                            key={item.id + ind}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            job={item.job}
                            itemHeight={itemHeight}
                            offsetTop={virtualItem.offsetTop}
                            setValue={setValue}
                        />
                    );
                })}
            </div>
        </StyledSelectOptions>
    );
}