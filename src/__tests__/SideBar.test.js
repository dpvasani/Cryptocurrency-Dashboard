import React from "react";
import {render , screen} from '@testing-library/react';
import SideBar from "../components/SideBar";
import '@testing-library/jest-dom/extend-expect';



it('renders without crashing', () => {
    render(<SideBar/>)
})


//Default Selection
it('should correctly set default option', () => {
    render(<SideBar/>)
    expect(screen.getByRole('option', { name: 'sortby' }).selected).toBe(true)
  })

//correct number of options
it('should display the correct number of options', () => {
    render(<SideBar/>)
    expect(screen.getAllByRole('option').length).toBe(9);
})

it('should render SideBar Component', () => {
    render(<SideBar />);
    const SideBarElement = screen.getByTestId('Sidebar-1');
    expect(SideBarElement).toBeInTheDocument();
    expect(SideBarElement).toHaveTextContent('Cryptocurrency By Market Cap');

    const SortingOptionsElement = screen.getByRole("combobox");
    expect(SortingOptionsElement).toBeInTheDocument(); 
})

