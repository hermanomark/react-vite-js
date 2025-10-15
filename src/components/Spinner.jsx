import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

const Spinner = () =>
  <div className='mt-6 mx-auto'><Ring size={50} speed={1.5} bgOpacity={0.25} /></div>;

export default Spinner;