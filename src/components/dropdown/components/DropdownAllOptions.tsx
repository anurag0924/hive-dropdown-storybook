import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Color } from "../../../utils/enums";

const DropDownListContainer = styled.div`
  max-height: 15em;
  overflow: auto;
  box-sizing: border-box;
  border: 2px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  border-top: 0px;
  padding: 1em 0 0 0;
  
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background: ${Color.white};
  font-size: 1.3rem;
  overflow: auto;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.li`
  list-style: none;
  padding: 0.5em 1em;
  &:hover {
      background: ${Color.grey};
  }
`;


/** Custom hook to check if the component is in view port or not. If the comonent is in view port we
 *  loading to true to render the item else we display loading message. Display laoding message instead of component or else the scroll will be disabled. */
const useIsInViewPort = (containerSelector: string, handleLoading = false): [boolean, React.RefObject<HTMLDivElement>] => {

    const [loaded, setLoaded] = useState(false);
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const { isIntersecting } = entry;
                    if (isIntersecting) {

                        setLoaded(true);

                        if (handleLoading === false) {
                            observer.disconnect();
                        }
                    } else if (handleLoading) {
                        setLoaded(false);
                    }
                });
            },
            {

                root: document.querySelector(containerSelector),
            },
        );
        if (elRef?.current)
            observer.observe(elRef.current);
    }, []);

    return [loaded, elRef];
};

export interface DropdownAllOptionsProps {
    options: string[];
    selectedValue?: string[];
    isMultiSelect: boolean;
    onValueChange: (selectedValues?: string[]) => void;
}

export const DropdownAllOptions = ({
    options,
    isMultiSelect,
    selectedValue,
    onValueChange,
}: DropdownAllOptionsProps) => {

    const [displayOptions, setDisplayOptions] = useState<string[]>([])

    useEffect(() => {
        setDisplayOptions(options)
    }, [options])

    /** Subload hook, which checks if the item is in viewPort */
    interface SubloadProps {
        containerSelector: string,
        item: string,
        idx: number,
    }

    /**  component, which render single select item if it is in viewPort */
    const SingleSelectItem = ({ containerSelector, item, idx }: SubloadProps) => {
        const [loaded, elRef] = useIsInViewPort(containerSelector, true);
        return (
            <div className={'sub-load'} ref={elRef} >
                {loaded ? <ListItem style={{ backgroundColor: (selectedValue?.indexOf(item) ?? -1) >= 0 ? "lightblue" : 'none' }} key={idx} onClick={() => onValueChange([item])}>{item}</ListItem> : <>loading</>}
            </div>
        );
    };
    /**  component, which render mutli select item if it is in viewPort */
    const MultiSelectItem = ({ containerSelector, item, idx }: SubloadProps) => {
        const [loaded, elRef] = useIsInViewPort(containerSelector, true);
        return (
            <div className={'sub-load'} ref={elRef} >
                {loaded ? <ListItem key={idx} style={{ backgroundColor: (selectedValue?.indexOf(item) ?? -1) >= 0 ? "lightblue" : 'none' }}>
                    <input type={"checkbox"} id={item} name={item} checked={(selectedValue?.indexOf(item) ?? -1) >= 0} onChange={(e) => {
                        if (e.target.checked) {
                            onValueChange([...(selectedValue ?? []), item]);
                        } else {
                            onValueChange(selectedValue?.filter((value) => value != item))
                        }
                    }} />
                    <label htmlFor={item}>{item}</label>
                </ListItem> : <>loading</>}
            </div>
        );
    };

    const dropdwondOptions = useMemo(() => {
        if (!isMultiSelect) {
            return displayOptions.map((option, idx) => (
                <SingleSelectItem containerSelector='.list' item={option} idx={idx} key={idx} />
            ));
        } else {
            return displayOptions.map((option, idx) => (
                <MultiSelectItem containerSelector='.list' item={option} idx={idx} key={idx} />
            ));
        }
    }, [displayOptions, selectedValue]);

    return (
        <DropDownListContainer>
            <DropDownList className="list">
                {/* Display option to unselect/select  when multi select is enabled*/}
                {isMultiSelect &&
                    <ListItem key={'multiselect'}>
                        <input type={"checkbox"} id={'multiselect'} name={'multiselect'} checked={selectedValue?.length === options.length} onChange={(e) => {
                            if (e.target.checked) {
                                onValueChange(options);
                            } else {
                                onValueChange([])
                            }
                        }} />
                        <label htmlFor={'multiselect'}>{'select/unselect all'}</label>
                    </ListItem>}
                {dropdwondOptions}</DropDownList>
        </DropDownListContainer>
    );
};
