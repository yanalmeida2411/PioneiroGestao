'use client'

import React, { useEffect } from 'react'
import '@/components/BuyComponent/buy-component.css'
import useStore from '@/store'

const BuyComponent = () => {

  const buyProducts = useStore((state) => state.buyProducts);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const removeProduct = useStore((state) => state.removeProduct);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className='all-buy-content'>
        <header className='header-buy'>Compras</header>
        <section className='buy-content-profile'>
          <ul>
            <li>Nome</li>
            <li>Valor</li>
            <li>Origem</li>
            <li>Data</li>
          </ul>
        </section>
        <div className='list-buy-content'>
          {buyProducts.map((product) => (
            <ul key={product.product_id} >
              <li>{product.product_name}</li>
              <li>R${product.product_value.toFixed(2).replace(".", ",")}</li>
              <li>{product.product_origin}</li>
              <li>{new Date(product.product_hour).toLocaleDateString("pt-BR")}</li>
              <button onClick={() => removeProduct(product.product_id)}>x</button>
            </ul>
          ))}

        </div>
      </div>
    </>
  )
}

export default BuyComponent