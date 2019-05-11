import React from 'react'

import './Header.css'

type HeaderProps = {
  title: string;
}

const Header: React.FC<HeaderProps> = props => <h1 className="header">{props.title}</h1>

export default Header
