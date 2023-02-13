import React from 'react'

import "./styles.scss";

type Props = {
    children: React.ReactNode;
}

const CardsWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className='previews-wrapper'>{children}</div>
  )
}

export default CardsWrapper