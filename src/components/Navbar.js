import './Navbar.css';

import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';

import { checkTokenAndUser, getUser, removeUserSession } from './../Utils/Common';
import { SidebarData } from './SidebarData';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [state, setState] = useState(null);

  const showSidebar = () => setSidebar(!sidebar);

  function hadleOnClick() {
    if (state != null) {
      window.open(
        'mailto:supportMonitoringAndControl@gmail.com?subject=Support'
      );
    } else {
      setState(true);
    }
  }

  const user = getUser();
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {user ? (
              <li>
                <li className='nav-text'>
                  <span className='nameSpan'>
                    Hello, {user.firstName} {user.lastName}
                  </span>
                </li>
              </li>
            ) : null}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className='nav-text'>
              <Link
                to='/support'
                onClick={() => {
                  alert(
                    'Gas is over the level! Please, make sure everything is safe or leave the apartment and call emergency'
                  );
                }}
              >
                <IoIcons.IoMdHelpCircle />
                <span>Support</span>
              </Link>
            </li>
            {checkTokenAndUser() ? (
              <li className='nav-text'>
                <Link to='/login' onClick={removeUserSession}>
                  <BsIcons.BsDoorOpenFill />
                  <span>Logout</span>
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
