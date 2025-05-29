'use client'
import React, { useState } from 'react'
import '@/components/Register/register.css'
import useStore, { ProductStore, } from '@/store'
import Image from 'next/image'

const Register = () => {
    const [name, setName] = useState("")
    const [value, setValue] = useState<any>("")
    const [type, setType] = useState("")
    const [origin, setOrigin] = useState("")
    const addProduct = useStore((state: ProductStore) => state.addProduct)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: any = {
            product_name: name,
            product_value: value,
            product_type: type,
            product_origin: origin,
        }

        addProduct(newProduct)
        setName("")
        setValue("")
        setType("")
        setOrigin("")
    }
    return (
        <>
            <header className='header-title'>
                <h1>Gestão Pioneiro</h1>
                <Image
                    src='/logoeta.png'
                    alt='logo3eta'
                    width={100}
                    height={95}
                    className='logo' />
            </header>
            <form className='form-content' onSubmit={handleSubmit}>
                <label htmlFor="nome">
                    Nome
                </label>
                <input type="text" name="nome" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder='nome da transação'
                    onFocus={() => setName(" ")}
                    onBlur={(e) => {
                        if (e.target.value.trim() === "") {
                            setName("");
                        }
                    }} />
                <label htmlFor="valor">
                    Valor
                </label>
                <input type="text" name="valor" value={value}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        // Se estiver vazio, permite apagar
                        if (inputValue === " ") {
                            setValue(" ");
                            return;
                        }
                        // Se for número válido, atualiza
                        const numeric = Number(inputValue);
                        if (!isNaN(numeric)) {
                            setValue(numeric);
                        }
                    }} placeholder='valor da transação'
                    onFocus={() => setValue(" ")}
                    onBlur={(e) => {
                        if (e.target.value.trim() === "") {
                            setValue("");
                        }
                    }} />
                <label htmlFor="tipo">
                    Tipo
                </label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="" disabled>tipo da transação</option>
                    <option value="compra">Compra</option>
                    <option value="venda">Venda</option>
                </select>
                <label htmlFor="origem">
                    Origem
                </label>
                <input type="text" name="origem" value={origin}
                    onChange={(e) => setOrigin(e.target.value)} placeholder='origem da transação'
                    onFocus={() => setOrigin(" ")}
                    onBlur={(e) => {
                        if (e.target.value.trim() === "") {
                            setOrigin("");
                        }
                    }} />
                <button type='submit'>Cadastrar</button>
            </form>
        </>
    )
}

export default Register