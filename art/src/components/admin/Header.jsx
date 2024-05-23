import React, { Fragment } from 'react';
import { Popover, Menu, Transition } from '@headlessui/react';
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';  

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#97644E] h-16 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <HiOutlineSearch fontSize={20} className="text-white mr-3" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm text-white focus:outline-none active:outline-none border border-gray-300 w-full sm:w-[24rem] h-10 pl-11 pr-4 rounded-sm bg-transparent"
        />
      </div>
      <div className="flex items-center gap-3">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  open ? 'text-opacity-100' : 'text-gray-400 hover:text-white'
                } p-2 rounded-full focus:outline-none`}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 w-80 px-4 py-2 mt-2.5 transform bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5">
                  <strong className="text-gray-700 font-medium">Messages</strong>
                  <p className="mt-2 text-sm text-gray-600">This is messages panel.</p>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  open ? 'text-opacity-100' : 'text-gray-400 hover:text-white'
                } p-2 rounded-full focus:outline-none`}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 w-80 px-4 py-2 mt-2.5 transform bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5">
                  <strong className="text-gray-700 font-medium">Notifications</strong>
                  <p className="mt-2 text-sm text-gray-600">This is notification panel.</p>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none">
            <span className="sr-only">Open user menu</span>
            <div
              className="h-10 w-10 rounded-full bg-cover bg-center border-4 border-white"
              style={{ backgroundImage: 'url("https://example.com/profile-pic.jpg")' }}
            >
              <span className="sr-only">User name</span>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex rounded-md items-center w-full p-2 text-sm text-gray-900`}
                      onClick={() => navigate('/profile')}
                    >
                      Your Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex rounded-md items-center w-full p-2 text-sm text-gray-900`}
                      onClick={() => navigate('/settings')}
                    >
                      Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex rounded-md items-center w-full p-2 text-sm text-gray-900`}
                      onClick={() => {
                        // Assuming logout function handles the redirect
                        logout();
                      }}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
