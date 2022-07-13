import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Color } from '../../utils/enums';
import { DropdownAllOptions } from './components/DropdownAllOptions';
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
    // selected values
    value?: string[];
    // toggle to handle multi select or single select
    isMultiSelect: boolean;
    // This used to determine rendering mode for dropdown options. if set true drop down 
    // options will all be rendered in scrollable view where items will be lazy loaded when in view port
    // if set to false will render top 20 and we will give search functioanlity for the user which can be customized based on use case.
    displayAllOptions?: boolean;
    // available options for drop down
    options: string[];
    // callback function to update options when on search change
    optionsSearchOnchange?: (searchString: string) => void;
    // callback function to handle on change for selceted value
    onSelectedValueChange?: (value: string[]) => void;
    //toggle to display selected tags for multi select
    displayPills?: boolean;
}

export const Dropdown = ({ value, label, isMultiSelect = false, options, helperText = '', optionsSearchOnchange, onSelectedValueChange, displayPills = false, displayAllOptions = false }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [selectedValue, setSelectedValue] = useState<string[]>();

    useEffect(() => {
        if (selectedValue && onSelectedValueChange)
            onSelectedValueChange(selectedValue)
    }, [selectedValue])


    const handleSelect = (value?: string[]) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        value && setSelectedValue(value)
    }, [value])

    const pills = () => selectedValue?.map((value, idx) => <div onClick={() => handleSelect([...selectedValue.slice(0, idx), ...selectedValue.slice(idx + 1)])} style={{ width: 'fit-content', padding: '0 1em', background: Color.grey }}>{value}</div>)

    return (
        <>
            <DropDownContainer>
                {/* pills to display selected values */}
                {isMultiSelect && displayPills && <SelectedDsiplay>{pills()}</SelectedDsiplay>}
                <DropdownHeader displayPills={displayPills} isOpen={isOpen} isMultiselect={isMultiSelect} label={label} selectedValue={selectedValue} onClick={() => toggleDropdown()} helperText={helperText} />
                {isOpen && (!displayAllOptions ? <DropdownOptions options={options} isMultiSelect={isMultiSelect} selectedValue={selectedValue} onValueChange={handleSelect} optionsSearchOnchange={optionsSearchOnchange} /> :
                    <DropdownAllOptions options={options} isMultiSelect={isMultiSelect} selectedValue={selectedValue} onValueChange={handleSelect} />)}
            </DropDownContainer>
        </>
    )
}
