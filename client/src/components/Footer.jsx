import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="text-center py-8 border-t border-gray-700 mt-10">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} IdeaHub. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Footer