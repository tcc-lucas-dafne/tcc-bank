import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const redirectToUserConfigPage = () => {
    navigate("/user");
  };

  return (
    <div className='flex bg-stone-300 py-4 px-4 items-center justify-between h-16'>
      <div className='flex items-center gap-2 p-10'>
        <FontAwesomeIcon icon={faBuildingColumns} size='2x' />
        <h1 className='text-xs md:text-xl font-bold'>MyBank</h1>
      </div>
      {user && (
        <div className='cursor-pointer p-10' onClick={redirectToUserConfigPage}>
          <FontAwesomeIcon icon={faUser} size="xl" />
          <span className='text-xs ml-2 md:text-md font-bold'>
            {user.name}
          </span>

        </div>
      )}
    </div>
  )
};

export default Navigation;