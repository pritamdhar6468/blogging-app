import React, { useState } from 'react'

const ProfileSetting = () => {
const [fullNmae,setFullName]=useState("");
const [uploadImg,setUploadImg]=useState("");
const [decs,setDecs]=useState("");


  return (
    <div>
        <form action="submit">
            <label htmlFor="fullName">FullName:</label>
            <input type="text" value={fullNmae} onChange={()=>setFullName(e.target.value)} />

            <label htmlFor="image">image upload:</label>
            <input type="file" value={uploadImg} onChange={()=>setUploadImg(e.target.value)} />

            <label htmlFor="image">About</label>
            <input type="text" value={decs}  onChange={()=>setDecs(e.target.value)}/>

        </form>
    </div>
  )
}

export default ProfileSetting