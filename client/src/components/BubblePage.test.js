import React from "react";
import {axiosWithAuth} from '../utils/useApi'
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";


const testApiGet = () => {
  axiosWithAuth()
    .get("/colors")
    .then(res => {
      setColorList(res.data)
    })
    .catch(err => {
      console.log(err.response.data)
    })
};

test("Fetches data and renders the bubbles", () => {
  // Finish this test

 
  
  const {rerender} = render(<Bubblepage />)

  rerender(<BubblePage />)

  expect(await screen.findByText(/bubbles/i)).toBeInTheDocument();
  expect(await screen.findByText(/colors/i)).toBeInTheDocument();
});
