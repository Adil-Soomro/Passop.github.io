import React, { useEffect, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { useRef } from 'react';
import { CgPassword } from 'react-icons/cg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const inputref = useRef();
    const [form, setform] = useState({ siteName: '', username: '', password: '' })
    const [passwordArray, setpasswordArray] = useState([])

    const getPassword = async ()=>{
        let req = await fetch('http://localhost:3000/')
        let passwords = await req.json()
        setpasswordArray(passwords)
        console.log(passwords)

    }

    useEffect(() => {
        getPassword()
    }, [])

    const copyText = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }



    const showPassword = () => {
        //   alert('show the password')
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            inputref.current.type = 'password'
        }
        else (
            ref.current.src = "icons/eyecross.png",
            inputref.current.type = 'text'
        )
    }
    const savePassword = async () => {
        if (form.siteName === '' || form.password === '' || form.username === '') {
            toast.error('Fil all the Fields', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            // If any such id exists in the DataBase, Delete it
            await fetch('http://localhost:3000/',{ method:"DELETE", headers:{ "Content-Type": "application/json"}, body: JSON.stringify({ id: form.id })})

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch('http://localhost:3000/',{ method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })})

            console.log([...passwordArray, form])
            toast.success('Password saved Successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setform({ siteName: '', username: '', password: '' })
        }
    }
    const deletePassword = async (id) => {
        console.log('Deleting Password with ' + id)
        let c = confirm("Do you really want to delete this passowrd?")
        if (c) {
            toast.success('Deleted Successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch('http://localhost:3000/',{ method:"DELETE", headers:{ "Content-Type": "application/json"}, body: JSON.stringify({ id}) })
            // setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }
    const editPassword = (id) => {
        console.log('Editing Password with ' + id)
        setform({...passwordArray.filter(item => item.id === id)[0], id: id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full"></div>
            <div className='p-2 md:px-0 md:mycontainer min-h-[89.2vh]'>
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className='flex flex-col p-4 gap-8 text-black items-center'>
                    <input value={form.siteName} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' name='siteName' type="text" />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' name='username' type="text" />
                        <div className="relative">
                            <input value={form.password} onChange={handleChange} ref={inputref} placeholder='Enter Password' className='pr-8 rounded-full border border-green-500 w-full p-4 py-1' name='password' type="password" />
                            <span className='absolute right-[4px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src='icons/eye.png' className='p-1' width={28} ></img>
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex w-fit justify-center gap-2 items-center bg-green-500 rounded-full px-6 py-2 hover:bg-green-400 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-start text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="mb-10 table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Passwords</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span><a href={item.siteName} target='_blank' >{item.siteName}</a></span>
                                                <div className='size-7 cursor-pointer' onClick={() => { copyText(item.siteName) }}>
                                                    <lord-icon className={'cursor-pointer'}
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='size-7 cursor-pointer' onClick={() => (copyText(item.username))}>
                                                    <lord-icon className={'cursor-pointer'}
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.password}</span>
                                                <div className='size-7 cursor-pointer' onClick={() => (copyText(item.password))}>
                                                    <lord-icon className={'cursor-pointer'}
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon className={'cursor-pointer'}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon className={'cursor-pointer'}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )

}

export default Manager
