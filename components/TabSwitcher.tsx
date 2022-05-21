import React from 'react'
import Link from 'next/link'

interface Props {
  view?: string;
}

const TabSwitcher = (props: Props) => {
  const { view } = props;
  return (
    <div className="text-white flex gap-8 justify-center mb-4">
        <Link href={`/${view}/requests`}>
            <a>Requests</a>
        </Link>
        <Link href={`/${view}/profile`}>
            <a>Profile</a>
        </Link>
    </div>
  )
}

export default TabSwitcher