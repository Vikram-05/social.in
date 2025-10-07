import React from 'react'

function Loader() {
    return (
        <div class="flex items-center justify-center h-screen">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export default Loader