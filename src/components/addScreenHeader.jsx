import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { PATH } from '../utils/path';
import {
  getCurrentUser,
  getUserRole,
  logoutCurrentUser,
} from '../utils/currentUser';

function AddsScreenHeader() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const role = getUserRole();

  const handleSignOut = () => {
    logoutCurrentUser();
    navigate(PATH.HOME);
  };

  return (
    <>
      <Navbar fluid rounded className='shadow-lg'>
        <Link to={PATH.HOME} className='flex'>
          <img src={Logo} className='mr-3 h-6 sm:h-9' alt='Loadify Logo' />
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            Loadify
          </span>
        </Link>
        {user && <div className='flex md:order-2 gap-4 items-center'>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='User settings'
                //   img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm mb-2'>
                {user?.firstName} {user?.lastName}{' '}
              </span>
              <span className='block truncate text-sm font-medium'>
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <span className='text-sm font-medium ml-4'>Role: {role}</span>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut} className='text-red-900'>
              Sign out
            </Dropdown.Item>
          </Dropdown>

          <Navbar.Toggle />
        </div>}
        <Navbar.Collapse>
          <Link to={PATH.HOME}>Home</Link>
          <Link to='#'>About</Link>
          <Link to='#'>Contact</Link>
          <Link to={PATH.USERSHOME}>Post Add</Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default AddsScreenHeader;
