import logo from './logo.svg';
import {Dropdown} from './components'
import './App.css';

const options = ['test 1', 'test 2', 'test 3', 'test 4','test 5','test 6','test 7','test 8','test 9','test 10','test 11','test 12','test 13','test 14','test 15','test 16','test 17','test 18','test 19','test 20','test 21','test 22','test 23']

function App() {
  return (
    <div className="App">
      <header className="Dropdown component">
      <h3>Dropdown multiselect all options: replace the array wiht larger data set to test performace.</h3>
      <Dropdown value={['test 1']} label= 'tag' helperText= 'Select all that apply' isMultiSelect= {true} options={options} displayPills={true} displayAllOptions={true}/>
        <h3>Dropdown multiselect with search</h3>
      <Dropdown value={['test 1', 'test 2']} label= 'tag' helperText= 'Select all that apply' isMultiSelect= {true} options={options}/>
      <h3>Dropdown single select</h3>
      <Dropdown value={['test 1']} label= 'tag' helperText= 'Select all that apply' isMultiSelect= {false} options={options}/>
      <h3>Dropdown multi select with pills</h3>
      <Dropdown value={['test 1']} label= 'tag' helperText= 'Select all that apply' isMultiSelect= {true} options={options} displayPills={true}/>
      </header>
    </div>
  );
}

export default App;
