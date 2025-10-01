import React from 'react'

const Card = ({ card: { name, image } }) => {
    return (
        <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col'>
            <img className='w-full h-auto' src={`${image}/low.png`} />
            <div className="p-4 flex-1 flex flex-col justify-between hidden">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
            </div>
        </div>
    )
}

export default Card