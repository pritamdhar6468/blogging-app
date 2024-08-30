import React from 'react'

const Profile = () => {
  return (
    <div className='profile-container'>
        <div className='profile-image-upload'>
            <div ></div>
            <input type="file" />
        </div>
        <h3>user name</h3>
        <p>user email</p>
        <div>
            <button>follow</button>
            <button>message</button>

        </div>
    </div>
  )
}

export default Profile