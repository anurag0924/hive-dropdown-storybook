import React, { useState } from 'react';
import { Story, Meta} from '@storybook/react/types-6-0'
import { Dropdown, DropdownProps } from './Dropdown';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Dropdown',
  component: Dropdown,
};


const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;
const multiSelectOptions = ['test 1', 'test 2', 'test 3', 'test 4','test 5','test 6','test 7','test 8','test 9','test 10','test 11','test 12','test 13','test 14','test 15','test 16','test 17','test 18','test 19','test 20','test 21','test 22','test 23']
const singleSelectOptions = ['15','20','25','22','27']
export const singleSelect = Template.bind({});

singleSelect.args = {
  value: ['Dropdown 1'],
   label: 'age',
   isMultiSelect: false,
   options: singleSelectOptions,
};

export const multiSelectDropdown = Template.bind({});
multiSelectDropdown.args = {
    value: ['test 1', 'test 2'],
    label: 'tag',
    isMultiSelect: true,
    options:multiSelectOptions.slice(0,10),
}

export const multiSelectDropdownWithSearch = Template.bind({});
multiSelectDropdownWithSearch.args = {
    value: ['test 1', 'test 2'],
    label: 'tag',
    isMultiSelect: true,
    options:multiSelectOptions,
}

const DropdownWithSearchComponent = () => {
    const [options, setOptions] = useState(multiSelectOptions.slice(0,10))
    return <Dropdown value={['test 1', 'test 2']} label= 'tag' isMultiSelect= {true} options={options} optionsSearchOnchange={(search: string) => setOptions([...multiSelectOptions.slice(10, 25  )])}/>
}

const SearchTemplate: Story = (args) => <DropdownWithSearchComponent {...args} />;
export const dropdownWithCustomSearch = SearchTemplate.bind({});




