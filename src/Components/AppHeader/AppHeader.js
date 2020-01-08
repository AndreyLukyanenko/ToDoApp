import React from 'react';
import './AppHeader.css';

const AppHeader = ({todos, done}) => {
    return (
      <div className="app-header d-flex">
        <h1 className='headerH1'>Todo List</h1>
        <h2 className='headerH2'>{todos} more to do, {done} done</h2>
      </div>
    );
  };

export default AppHeader;