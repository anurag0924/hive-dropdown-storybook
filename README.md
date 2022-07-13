# hive-dropdown-storybook

### Steps to run
1. clone the repo
2. run ```npm install``
3. run ```npm run storybook``` run the project in storybook

### Storybook
I am using storybook to render the component. Different stories with different props for the component are used to show the component behavior.

### Notes

1. using the isMultiSelect flag drop down can switch between multi select and single select
2. Incase of huge lists for options I have set the limit 20 for display and added a search functionality in options drop down
3. other way to handle large sets would be to use ```optionsSearchOnchange``` prop to pass a function that can fetch new options based on search string
4. Also in multi select though i am displaying all the selected values, I feel it is to better use pills/buttons to display selected tags which can also be used unselect selections.


Note: Ideal way to handle handle large lists could be to use libraries like react-window or infinite scroll. there is a css property content-visibility but to my knowledge its support is not available all browsers.
