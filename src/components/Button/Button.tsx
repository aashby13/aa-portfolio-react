import type { HTMLAttributes } from 'react';
import './Button.scss';

interface IProps {
  attr?: HTMLAttributes<HTMLButtonElement>
  children?: React.ReactNode
  onClick?: () => void
}

export default function Button({ attr, children, onClick }: IProps) {
  return (
    <button className='btn' { ...attr } onClick={onClick}>
      { children }
    </button>
  )
}