import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Apartments',
    path: '/apartments',
    icon: <MdIcons.MdApartment />,
    cName: 'nav-text',
  },
  {
    title: 'Users',
    path: '/users',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
  },
];
