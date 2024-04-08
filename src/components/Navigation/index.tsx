import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <div className='flex bg-stone-400 py-4 px-4'>
      <div className='flex items-center gap-2'>
        <FontAwesomeIcon icon={faBuildingColumns} size='2x' />
        <h1 className='text-xl font-bold'>MyBank</h1>
      </div>
    </div>
  )
};

export default Navigation;