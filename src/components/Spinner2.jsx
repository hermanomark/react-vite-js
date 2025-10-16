import { bouncy } from 'ldrs'
bouncy.register()

const Spinner2 = () => <div className='mt-6 mx-auto'>
  <l-bouncy
    size="45"
    speed="1.75"
    color="#1BE0EE"
  ></l-bouncy>
</div>;

export default Spinner2;