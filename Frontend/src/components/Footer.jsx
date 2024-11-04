import React from 'react'
import { IoIosHeart } from "react-icons/io";

const Footer = () => {
    return (
        <div className='w-full bg-slate-800 text-white flex flex-col justify-center items-center'>
            <div className='mycontainer flex items-center px-4 justify-center py-1 h-14'>
                <div className="font-bold text-white text-xl">
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
            </div>
            <div className='flex items-center justify-center mb-2'>
                Created with <IoIosHeart className='mx-1 text-2xl text-red-600' /> by Adil Soomro
            </div>
        </div>
    )
}

export default Footer