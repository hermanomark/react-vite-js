import { Square } from 'ldrs/react'
import 'ldrs/react/Square.css'

const Spinner = () =>
  <div className='mt-6 mx-auto'><Square
    size="35"
    stroke="5"
    strokeLength="0.25"
    bgOpacity="0.1"
    speed="1.2"
    color="#1BE0EE"
  /></div>;

export default Spinner;