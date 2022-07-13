import React from 'react'
import styled from 'styled-components';
import { Color } from '../../../utils/enums';
import downArrow from '../../../assets/downArrow.svg'
import upArrow from '../../../assets/upArrow.svg'

const DropDownHeader = styled.fieldset`
  margin-bottom: 0em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  background: ${Color.white};
  border-radius: 10px;
  border: 1px solid blue;
  &:first-child {
      align-items: flex-start;
  }
`;

const DropdownValueContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const LegendStyled = styled.legend`
color: ${Color.textBlue};
font-size: small;
`

export interface DropdownHeaderpProps {
    isMultiselect: boolean;
    label: string;
    helperText?: string;
    selectedValue?: string[];
    onClick: () => void;
    isOpen: boolean;
}
export const DropdownHeader = ({ selectedValue, isMultiselect, label, onClick, helperText = '', isOpen = false  }: DropdownHeaderpProps) => {

    return <DropDownHeader onClick={() =>
        onClick()}>
        <LegendStyled>{label}</LegendStyled>
        <DropdownValueContainer >
            <div style={{ width: 'fit-content'}}>{selectedValue?.toString() ?? helperText}</div>
            <img style={{width: '1em', height: '1em'}} sizes='small' src={isOpen? upArrow : downArrow}/>
        </DropdownValueContainer>
    </DropDownHeader>
}