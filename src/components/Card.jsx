import React from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({ card: { id, name, image, logo }, type }) => {
    const navigate = useNavigate();

    if (type === 'cards') return (<div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col'>
        {image && (<img className='w-full h-auto' src={`${image}/low.png`} />)}
    </div>)

    if (['series', 'sets'].includes(type)) return (
    <div onClick={() => {
        navigate(`/sets/${id}`)
    }} 
    className="cursor-pointer bg-white p-6 flex flex-col items-center justify-center w-full h-48">
        {logo && (<img
            className="w-auto h-48 object-contain mb-3"
            src={`${logo}.png`}
            alt={name}
        />)}
        <h2 className="text-lg font-semibold text-gray-800 text-center">{name}</h2>
    </div>
    );

}

export default Card