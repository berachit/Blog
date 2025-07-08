import React from 'react'

// helps you re-use a consistent layout across pages or sections of a site without duplicating styling logic

export default function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )
}
