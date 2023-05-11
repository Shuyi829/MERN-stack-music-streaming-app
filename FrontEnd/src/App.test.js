import {queryAllByTestId, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Eharts from './Eharts';
import axios from "axios";

afterEach(() => {
  // jest.restoreAlMocks();
})

test('test charts', async() => {
  const spy=jest.spyOn(window,"fetch");
  const {asFragment, getByText,getByRole} = render(<Eharts />)
  //测试当前标题是否存在Male and female statistics
  expect(getByText('Male and female statistics')).toBeInTheDocument();
  //测试图表是否存在
  expect(getByRole("generic",{name:"charts"})).toBeInTheDocument();
});
