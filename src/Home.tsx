import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div className='text-xl mb-4'>Home</div>
            <div className='text-lg'>
                <Link className='bg-blue-400 m-4 p-2 rounded-lg' to={'0'}>Player 1</Link>
                <Link className='bg-blue-400 m-4 p-2 rounded-lg' to={'1'}>Player 2</Link>
            </div>
        </>
    )
}
