import { useContext, useState } from "react"
import { CartContext, type CartProps } from "../../componentes/contexts/CartContext"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export function Carrinho() {
    const {cart, total, addItemCart, removeItemCart} = useContext(CartContext);
  
    function finalizarPedido() {
  toast(
    <div>
      <h2>Compra confirmada!</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <img src={item.cover} alt={item.title} className="w-12 rounded" />
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p>Preço: {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <p>Qtd: {item.cartAmout}</p>
          </div>
        </div>
      ))}
      <strong>Total: 
        {total}</strong>
    </div>,
    {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    }
  );
}


 return(
  <div className="p-4 flex flex-col justify-around gap-4  bg-zinc-200">
  <h1>Meu carrinho</h1>
  {cart.length === 0 && (
    <div>
        <h3>Nada no carrinho, volte para pagina inicial e faça suas compras</h3>
        <Link to='/'>Acessar produtos</Link>
    </div>
    
  )}
   {cart.map((index)=>(
    <div key={index.id} className="flex flex-col justify-between gap-4">
        <div className="flex justify-between gap-4">
            <div >
            <img src={index.cover}  alt={index.title} className="w-20 rounded" />
        <h2 className="font-medium">{index.title}</h2>
        <span className="text-zinc-700">{index.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })}</span>
        </div>
        <div>
            <p>Quantidade</p>

            <button 
            onClick={()=> removeItemCart(index)}
            className="p-2 cursor-pointer bg-zinc-300 font-medium shadow">-</button>
            {index.cartAmout}
            <button 
             onClick={()=> addItemCart(index)}
            className="p-2 cursor-pointer bg-zinc-300 font-medium shadow">+</button>
        </div>

        </div>


    </div>
  ))} 

   {cart.length !== 0 && (
    <strong>Total: {total}</strong>
   )}
 

  {
    cart.length > 0 && (
        <button 
        onClick={() => finalizarPedido()}
        className="bg-green-600 text-white font-medium cursor-pointer">Finalizar compra</button>
    )
  }

 </div>
 )
}

