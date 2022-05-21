import React from 'react'
import Link from 'next/link'

type Props = {}

const TabSwitcher = (props: Props) => {
  return (
    <div className="text-white flex gap-8 justify-center mb-4">
        <Link href="/requests/patient">
            <a>Requests</a>
        </Link>
        <Link href="/profile">
            <a>Profile</a>
        </Link>
    </div>
  )
}

export default TabSwitcher