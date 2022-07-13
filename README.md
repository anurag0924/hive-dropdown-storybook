# hive-dropdown-storybook

I would recommend testing in story book as we test different props easity. rather than in webapp where we need to update the code to inlcude larger datasets.
### Steps to run Storybook
1. clone the repo
2. run ```npm install```
3. run ```npm run storybook``` run the project in storybook

### Steps to run webapp
1. clone the repo
2. run ```npm install```
3. run ```npm start``` run the project in storybook

### Storybook
I am using storybook to render the component. Different stories different experiences for the drop down.

### Handling Large Lists
 For handling large lists of data in drop down, the bestway is to render only the list items that are in view or have infinite scroll to fetch more data. for both of this there libraries avaialbe like react-window and react infinite scroll. For now I went through a simple approach of rendering the whole component only when its in view port or else it will just render ```loading``` .
 
 For this excercise  I went with 2 extra approaches and consumer of the component can decide which one suits there use case better.
 1. display only 20 options in the drop down and give the user a capability of search to filter through the entire options
 2. other method on user search ```optionsSearchOnchange``` callback can be used update the options list based on search.

 ### Display selected options should be visible
 Selected options are visible on the dropdown when list is closed. In my opinion though its better so this list of tags outside the dropdown like pill/button so user can cancel his selections through pills. So gave a prop that will let pills be displayed as a demo.


 ### libraries used
 Only library used was syled components which lets me style components through css.

### Assumptions
1. consumer will be responsible for providing a list of distinct options.
