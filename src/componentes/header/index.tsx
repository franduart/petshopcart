import Logo from '../../assets/Logo_Petshop_marrom_ilustrado-removebg-preview.png'
import { Link } from 'react-router-dom'
import {FaShoppingCart } from 'react-icons/fa'
import { CartContext } from '../contexts/CartContext'
import { useContext } from 'react'

export function Header() {
  const {cartAmout} = useContext(CartContext)

 return(
  <header className='w-full shadow-2xl flex items-center justify-between pl-4 pr-4  bg-[#0077b6] text-white text-lg'>
    <Link to='/'>
    <img className='w-30 rounded-bl-xl' src={Logo} alt="logo" />
    </Link>
  <nav className='flex items-center justify-center gap-1'>
    <Link to='/'>Sobre </Link>
    <Link to='/'>Produtos </Link>
    <Link className='relative font-medium w-10' to='/carrinho' ><FaShoppingCart className='size-7 text-white'/>
    {
      cartAmout > 0 && (
        <span className='flex items-center justify-center  absolute bottom-5 left-5 bg-green-500 rounded-2xl w-4 h-4 text-center p-3 text-white '>{cartAmout} </span>
      )
    }
    </Link>
  </nav>
 </header>
 )
}
