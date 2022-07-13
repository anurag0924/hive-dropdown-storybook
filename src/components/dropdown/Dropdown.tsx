import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Color } from '../../utils/enums';
import { DropdownHeader } from './components/DropdownHeader';
import { DropdownOptions } from './components/DropdownOptions';

const DropDownContainer = styled.div`
width: 100%;
  margin: 0 auto;
`;

const SelectedDsiplay = styled.div`
display: flex;
flex-wrap: wrap;
grid-column-gap: 1em;
grid-row-gap: 1em;
padding-top: 1em;
`;



export interface DropdownProps {
    // Used to display the legend text for dropdown
    label: string;
    
    helperText?: string;
    value?: string[];
    isMultiSelect: boolean;
    options: string[];
    optionsSearchOnchange?: (searchString : string) => void;
    onSelectedValueChange?: (value: string[]) => void;
}

export const Dropdown = ({ value, label, isMultiSelect = false, options, helperText= '',optionsSearchOnchange,onSelectedValueChange }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
     const [selectedValue, setSelectedValue] = useState<string[]>();

     useEffect(() => {
         if(selectedValue && onSelectedValueChange)
         onSelectedValueChange(selectedValue)
     }, [selectedValue])
     

    const handleSelect = (value?: string[]) => {
        setSelectedValue(value)
    }

    useEffect(() => {
      value && setSelectedValue(value)
    }, [value])

    const pills = () =>  selectedValue?.map((value) => <div style={{ width: 'fit-content', padding: '0 1em', background: Color.grey}}>{value}</div>)
    
    return (
        <>
        <DropDownContainer>
            <DropdownHeader isOpen={isOpen} isMultiselect={isMultiSelect} label={label} selectedValue={selectedValue}  onClick={() => toggleDropdown()} helperText={helperText}/>
            {isOpen && <DropdownOptions options={options} isMultiSelect={isMultiSelect} selectedValue={selectedValue}  onValueChange={handleSelect} optionsSearchOnchange={optionsSearchOnchange}/>}
            {isMultiSelect && <SelectedDsiplay>{pills()}</SelectedDsiplay>}
        </DropDownContainer>
        </>
    )
}
