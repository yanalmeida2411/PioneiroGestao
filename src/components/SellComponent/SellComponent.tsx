'use client'
import React, { useEffect } from 'react'
import '@/components/SellComponent/sell-component.css'
import useStore from '@/store'

const SellComponent = () => {
    const sellProducts = useStore((state) => state.sellProducts);
    const fetchProducts = useStore((state) => state.fetchProducts);
    const removeProduct = useStore((state) => state.removeProduct);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div className='all-sell-content'>
                <header className='header-sell'>Vendas</header>
                <section className='sell-content-profile'>
                    <ul>
                        <li>Nome</li>
                        <li>Valor</li>
                        <li>Origem</li>
                        <li>Data</li>
                    </ul>
                </section>
                <div className='list-sell-content'>
                    {sellProducts.map((product) => (
                        <ul key={product.product_id}>
                            <li>{product.product_name}</li>
                            <li>R${product.product_value.toFixed(2).replace(".", ",")}</li>
                            <li>{product.product_origin}</li>
                            <li>{new Date(product.product_hour).toLocaleDateString("pt-BR")}</li>
                            <button onClick={() => removeProduct(product.product_id)}>X</button>
                        </ul>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SellComponent