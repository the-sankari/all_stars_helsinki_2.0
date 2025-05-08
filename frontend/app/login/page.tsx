import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register">Register</Link>
        </p>
      </form>
      <div className="flex justify-center items-center">
        <Image
          src="/img/pages/hero.png"
          alt="All Stars Helsinki"
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}

export default page
