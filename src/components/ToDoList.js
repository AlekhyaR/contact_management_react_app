import React, { useState } from 'react';
import './App.css';

const ToDoList = () => {
  const [count] = useState(1_000); // Total number of items
  const [scrollTop, setScrollTop] = useState(0); // Current scroll position
  const itemHeight = 30; // Height of each item
  const windowHeight = 500; // Height of the visible window
  const innerHeight = count * itemHeight; // Total height of the inner container

  // Calculate the start and end index of items to be displayed
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
  const endIndex = Math.min(
    Math.floor((scrollTop + windowHeight) / itemHeight) + 3,
    count
  );

  // Generate the list of items
  const items = Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    name: `Movie ${i + 1}`,
  }));

  // Function to display the visible items
  const displayMovieItems = () => {
    const displayedItems = items.slice(startIndex, endIndex);
    return displayedItems.map((item) => (
      <div
        key={item.index}
        style={{
          height: itemHeight,
          position: 'absolute',
          width: '100%',
          top: `${(item.index - 1) * itemHeight}px`, // Adjusted to start from 0
        }}
      >
        {item.name}
      </div>
    ));
  };

  // Handle scroll event
  const onScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div className="App">
      <h1>TODO</h1>
      <div
        className="outerbox"
        style={{
          border: '1px solid red',
          overflowY: 'scroll',
          height: windowHeight,
          width: 300,
          margin: '0 auto',
        }}
        onScroll={onScroll}
      >
        <div
          className="innerbox"
          style={{
            position: 'relative',
            height: innerHeight,
          }}
        >
          {displayMovieItems()}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;