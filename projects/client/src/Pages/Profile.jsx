import React from 'react'
import NavBar from '../Components/NavBar'
import NavBot from '../Components/NavBot'
import ProfileSetting from '../Components/Profile'

const Profile = () => {
    return (
        <div>
            <NavBar/>
            <ProfileSetting/>
            <NavBot/>
        </div>
    )
}

export default Profile