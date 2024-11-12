"use client"

import Register from "../backend/get"

const page = () => {
  return (
    <div onClick={()=>Register()}>page</div>
  )
}

export default page