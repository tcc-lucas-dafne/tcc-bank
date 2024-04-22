import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context';

const Navigation = () => {
  const { user } = useAppContext();

  return (
    <div className='flex bg-stone-400 py-4 px-4 items-center justify-between'>
      <div className='flex items-center gap-2'>
        <FontAwesomeIcon icon={faBuildingColumns} size='2x' />
        <h1 className='text-xl font-bold'>MyBank</h1>
      </div>
      {user && (
        <div>
          <FontAwesomeIcon icon={faUser} size="xl" />
          <span className='ml-2 text-md font-bold'>
            {user.name}
          </span>

        </div>
      )}
    </div>
  )
};

export default Navigation;