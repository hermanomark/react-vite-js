import React from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({ card: { id, name, image, logo }, type }) => {
    const navigate = useNavigate();

    if (type === 'cards') return (<div onClick={() => {
        navigate(`/cards/${id}`)
    }} className='cursor-pointer bg-white rounded-lg shadow-md overflow-hidden flex flex-col 
    transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1'>
        {image && (<img className='w-full h-auto' src={`${image}/low.png`} />)}
    </div>)

    if (['series', 'sets'].includes(type)) return (
    <div onClick={() => {
        type === 'sets' ? navigate(`/sets/${id}`) : navigate(`/series/${id}`);
    }} 
    className="cursor-pointer bg-white p-6 flex flex-col items-center justify-center w-full h-48 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
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