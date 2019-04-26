import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/associates">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Associates
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/skills">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Skills
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
