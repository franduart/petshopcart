import { useState, useEffect } from "react"
import { api } from "../../services/api"
import {FaShoppingCart } from 'react-icons/fa'
import Banner from '../../assets/Banner para site ong de animais pet doação colorido.png'
import { CartContext } from "../../componentes/contexts/CartContext"
import { useContext } from "react"
import type { CartProps } from "../../componentes/contexts/CartContext"
import { toast } from "react-toastify"
export interface DataProps{
  cover: string;
  description: string;
  id: number;
  price: number;
  title: string;
}

export function Home() {
  const {addItemCart} = useContext(CartContext)

    const [produtos, setProdutos] = useState<CartProps[]>([])
    useEffect(()=> {
     async  function dados(){
        const data = await api.get('/products')
        console.log(data.data)
        setProdutos(data.data)
     }
        dados()

        
    }, [])

    function comprar(item: CartProps){
     addItemCart(item)
     toast(
      <h3>Item adicionado no carrinho! </h3>
     )
    }
 return(
  <main className="w-full h-full mx-auto  flex flex-col items-center justify-around gap-4" >
    <div className="p-4 ">
      <h1 className="font-medium text-center text-2xl text-zinc-600 ">Nossos produtos</h1>
    </div>
    <div className="h-1/4" >
        <img className="w-full h-1/4" src={Banner} alt="" />

    </div>
    <section className=" grid md:grid-cols-4  grid-cols-2 px-8  gap-1.5 items-center mb-4 justify-around">
        {
            produtos.map((item)=>(
              <div key={item.id} className="p-6 w-2xs flex flex-col items-center justify-between gap-4  rounded bg-zinc-200 text-center h-full">
                <img src={item.cover} alt={item.title} />
              <p className="text-sm text-zinc-800 font-medium">{item.title}</p>
              <strong>{item.price.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
              })}</strong>
              <button 
              onClick={()=> comprar(item)}
                type="submit"
               className="flex items-center justify-between w-full bg-amber-500 text-white font-medium cursor-pointer">
               comprar <FaShoppingCart/>
              </button>
              </div>

            ))
        }
    </section>
  
 </main>
 )
}
