import React, { useEffect, useMemo, useState } from "react";
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

export interface DropdownOptionsProps {
    options: string[];
    selectedValue?: string[];
    isMultiSelect: boolean;
    onValueChange: (selectedValues?: string[]) => void;
    optionsSearchOnchange?: (searchString: string) => void;
}

export const DropdownOptions = ({
    options,
    isMultiSelect,
    selectedValue,
    onValueChange,
    optionsSearchOnchange
}: DropdownOptionsProps) => {

    const [displayOptions, setDisplayOptions] = useState<string[]>([])

    useEffect(() => {
        setDisplayOptions(options)
    }, [options])




    const dropdwondOptions = useMemo(() => {
        if (!isMultiSelect) {
            return displayOptions.slice(0, 20).map((option, idx) => (
                <ListItem style={{ backgroundColor: (selectedValue?.indexOf(option) ?? -1) >= 0 ? "lightblue" : 'none'}} key={idx} onClick={() => onValueChange([option])}>{option}</ListItem>
            ));
        } else {
            return displayOptions.slice(0, 20).map((option, idx) => (
                <ListItem key={idx} style={{ backgroundColor: (selectedValue?.indexOf(option) ?? -1) >= 0 ? "lightblue" : 'none'}}>
                    <input type={"checkbox"} id={option} name={option} checked={(selectedValue?.indexOf(option) ?? -1) >= 0} onChange={(e) => {
                        if (e.target.checked) {
                            onValueChange([...(selectedValue ?? []), option]);
                        } else {
                            onValueChange(selectedValue?.filter((value) => value != option))
                        }
                    }} />
                    <label htmlFor={option}>{option}</label>
                </ListItem>
            ));
        }
    }, [displayOptions, selectedValue]);

    return (
        <DropDownListContainer>
            {(options.length > 20 || optionsSearchOnchange) && <textarea style={{ minHeight: '2em', margin: '0 1em 1em 1em' }} defaultValue='' onChange={(e) => {
                if (optionsSearchOnchange) {
                    optionsSearchOnchange(e.target.value)
                } else {
                    setDisplayOptions(options.filter((option) => option.startsWith(e.target.value)))
                }
            }} />}
            <DropDownList>
                {/* Display option to unselect/select all when custom search is not being passed. not allowing allselect in case of custom search since only partial options will be displayed */}
                {!optionsSearchOnchange && isMultiSelect &&
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
