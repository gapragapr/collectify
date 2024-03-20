import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";

import {ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, FolderOpenIcon} from '@heroicons/react/24/outline'

import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlice";

import { useNavigate } from "react-router-dom";

const UserCard = ({user}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const clickLogOutButton = () => {
    dispatch(logout())
    navigate('./')
  }

  const clickCollectionsIconHandler = () => {
    navigate(`./${user.username}`)
  }

  return (
    <Dropdown placement="bottom">
        <DropdownTrigger>
          <User as={'button'} className='flex-row-reverse hover:scale-[1.05] cursor-pointer font-bold ml-6' name={user.username} avatarProps={{ size: 'sm', src: `${user.avatar}.svg`}}/>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem onClick={clickCollectionsIconHandler} endContent={<FolderOpenIcon className="w-6" />} key="collections">My Collections</DropdownItem>
          <DropdownItem endContent={<Cog6ToothIcon className="w-6" />} key="settings">My Settings</DropdownItem>
          <DropdownItem onClick={clickLogOutButton} endContent={<ArrowLeftStartOnRectangleIcon className="w-6" />} key="logout" color="danger">Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}

export default UserCard