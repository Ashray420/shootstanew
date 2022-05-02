import { render, screen, fireEvent, hasInputValue,  } from '@testing-library/react';
import {waitFor} from "./waitFor"
import App from './App';

jest.setTimeout(15000)
describe('testing App component of postive and negative test cases', () => {

  test('Check if the blank textfeild throws error', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Search' });
    await fireEvent.click(button)
    screen.getByText('Please provide some input')
  });

  test('check if the error is thrown when the meaning is not found', async () => {
    render(<App />);
    const input = screen.getByLabelText('Search',{selector : 'input'})
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.change(input,{target : {value : 'asf'}})
    fireEvent.click(button)
    await waitFor(()=>{
      screen.getByText('Could not find meaning of asf')
    })
  })

  test('check if the modal pops up on the correct meaning', async () => {
    render(<App />);
    const input = screen.getByLabelText('Search',{selector : 'input'})
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.change(input,{target : {value : 'dog'}})
    fireEvent.click(button)
    await waitFor(()=>{
      screen.getByText('Meaning for word dog')
    })
  })
})

