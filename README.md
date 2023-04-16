# React Auto-Complete

This repository contains a simple React-based application that features an auto-complete component. The auto-complete component provides a user-friendly search interface that displays suggestions based on the user's input and stores recent searches.

## Table of Contents

1. [Features](#features)
2. [Technical Overview](#technical-overview)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Component Structure](#component-structure)

## Features

- Auto-complete suggestions based on user input.
- Stores recent searches in local storage.
- Displays top matches for the user's search query.
- Easy integration with other React applications.

## Technical Overview
- **React**: The project uses React, a popular JavaScript library for building user interfaces, as its primary technology. React allows for the creation of reusable components and a more maintainable codebase.
- **State Management**: The component utilizes the **`useState`** and **`useEffect`** hooks for managing the internal state and side effects, such as local storage updates and handling clicks outside the component.
- **CSS Modules**: The project uses CSS modules to create isolated styles for each component, preventing any unwanted side effects on other components or global styles.
- **Local Storage**: The component stores recent searches in the browser's local storage, providing persistence across sessions and allowing users to view their recent searches even after closing and reopening the application.

## Installation

Clone the repository using the following command:

```
    git clone https://github.com/anand-bhagat/auto-complete.git
```


Navigate to the project directory and install the required dependencies:

```
    cd auto-complete
    npm install
```

## Usage

To start the development server, run:
```
    npm start
```


The auto-complete component can be easily integrated into other React applications by importing and using it in your desired component.

```javascript
import AutoComplete from './AutoComplete';

function App() {
  // ...

  return (
    <div>
      {/* Other components */}
      <AutoComplete data={data} setFilteredData={setFilteredData} setSearchValue={setSearchValue} />
    </div>
  );
}
```

## Component Structure
The `AutoComplete` component consists of the following:

- An input field for the user to type their search query.
- A drop-down list that displays recent searches or top matches based on the user's input.
- A search button that filters the data based on the user's input.
- A clear button that resets the search input and displays the original data.
The component maintains the state of the user's input, recent searches, and the visibility of the drop-down list. It also handles user interactions, such as clicking outside the drop-down list, pressing the enter key, and selecting a recent search or top match from the list.

