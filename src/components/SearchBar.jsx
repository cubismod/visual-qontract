import React, { useState } from 'react';
import { Menu, MenuItem, MenuToggle, Grid, GridItem } from '@patternfly/react-core';

function SearchBar({ filterText, handleFilterTextChange, handleSelect, options, selected }) {
  const [isOpen, toggle] = useState(false);
  let optionsMenu;
  function handleChange(e) {
    handleFilterTextChange(e.target.value);
  }
  function onToggle() {
    toggle(!isOpen);
  }

  function onSelect(e) {
    const { id } = e.target;
    handleSelect(id);
    onToggle();
  }

  if (options !== undefined) {
    const menuItems = options.map(i => (
      <MenuItem onSelect={onSelect} isSelected={selected === i} itemId={i} key={i} className="optionsMenuItem">
        {i}
      </MenuItem>
    ));
    const menuToggle = <MenuToggle onClick={onToggle}>{selected}</MenuToggle>;
    optionsMenu = (
      <Menu
        id="options-menu"
        isOpen={isOpen}
        onSelect={onSelect}
        className="optionsMenu"
        toggle={menuToggle}
      >
        {menuItems}
      </Menu>
    );
  } else {
    optionsMenu = '';
  }
  return (
    <Grid className="searchBar">
      <GridItem span={2}>
        <form>
          <input className="search" type="text" placeholder="Search..." value={filterText} onChange={handleChange} />
        </form>
      </GridItem>
      <GridItem span={3}> {optionsMenu} </GridItem>
    </Grid>
  );
}

export default SearchBar;
