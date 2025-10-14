import React from 'react'

function Notification() {
  return (
    <body class="bg-[--bg-color] text-[--text-color]">

      <div class="max-w-md mx-auto p-6 md:p-8">

        <header class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-[--text-color]">Notifications</h1>
            <p class="text-[--semi-text-color] mt-1">You have <span class="font-semibold">3 Notifications</span> today.</p>
          </div>
          <button class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-gray-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18M3 12h18m-9 8h9" />
              <circle cx="8" cy="4" r="2" fill="currentColor" stroke="none" transform="translate(-1,0)" />
              <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" transform="translate(-1,0)" />
            </svg>
          </button>
        </header>

        <div class="space-y-2">
          <div class="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-gray-800">
            <div class="w-2 h-2 bg-red-500 rounded-full shrink-0"></div>
            <div class="relative shrink-0">
              <img class="w-14 h-14 rounded-full object-cover" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Elayamani avatar"/>
                <div class="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </div>
            </div>
            <div class="flex-grow">
              <p class="text-base text-[--text-color]">
                <span class="font-bold">Elayamani</span> Liked your DailyUI <span class="text-[--semi-text-color]">045-Favourites</span>
              </p>
              <p class="text-sm text-[--semi-text-color]">2 h ago</p>
            </div>
            <div class="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center font-bold text-red-400 shrink-0 text-3xl">.</div>
          </div>

          <div class="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-gray-800">
            <div class="w-2 h-2 bg-red-500 rounded-full shrink-0"></div>
            <div class="relative shrink-0">
              <img class="w-14 h-14 rounded-full object-cover" src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Rahul Raj avatar"/>
                <div class="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </div>
            </div>
            <div class="flex-grow">
              <p class="text-base text-[--text-color]">
                <span class="font-bold">Rahul Raj</span> Liked your DailyUI <span class="text-[--semi-text-color]">042-Food menu</span>
              </p>
              <p class="text-sm text-[--semi-text-color]">6 h ago</p>
            </div>
            <img class="w-14 h-14 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300" alt="Food menu"/>
          </div>

          <div class="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-gray-800">
            <div class="w-2 h-2 bg-red-500 rounded-full shrink-0"></div>
            <div class="relative shrink-0">
              <img class="w-14 h-14 rounded-full object-cover" src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Rahul Raj avatar"/>
                <div class="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.837 8.837 0 01-4.43-1.252A1 1 0 015 14.938V12a1 1 0 011-1h2a1 1 0 011 1v.062a6.98 6.98 0 002.34-1.745 1 1 0 011.414.072A5.993 5.993 0 0118 10zm-8-3a1 1 0 100-2 1 1 0 000 2zM5 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                </div>
            </div>
            <div class="flex-grow">
              <p class="text-base text-[--text-color]">
                <span class="font-bold">Rahul Raj</span> Liked your DailyUI <span class="text-[--semi-text-color]">042-Food menu</span>
              </p>
              <p class="text-sm text-[--semi-text-color]">6 h ago</p>
            </div>
            <img class="w-14 h-14 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1581287053822-fd7bf4f4bf3f?q=80&w=300" alt="Food menu UI"/>
          </div>
        </div>


        <h2 class="text-xl font-bold text-[--text-color] mt-8 mb-4">This Week</h2>

        <div class="space-y-2">
          <div class="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-gray-800">
            <div class="w-2 h-2 bg-transparent rounded-full shrink-0"></div>
            <div class="relative shrink-0">
              <img class="w-14 h-14 rounded-full object-cover" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Aarti Singh avatar"/>
                <div class="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </div>
            </div>
            <div class="flex-grow">
              <p class="text-base text-[--text-color]">
                <span class="font-bold">Aarti Singh</span> Liked your DailyUI <span class="text-[--semi-text-color]">UI 044-Food menu</span>
              </p>
              <p class="text-sm text-[--semi-text-color]">30 October</p>
            </div>
            <img class="w-14 h-14 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300" alt="Food menu"/>
          </div>

          <div class="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-gray-800">
            <div class="w-2 h-2 bg-transparent rounded-full shrink-0"></div>
            <div class="relative shrink-0">
              <img class="w-14 h-14 rounded-full object-cover" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Best UI Design avatar"/>
                <div class="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" />
                  </svg>
                </div>
            </div>
            <div class="flex-grow">
              <p class="text-base text-[--text-color]">
                <span class="font-bold">Best UI Design</span> Started follwing
              </p>
              <p class="text-sm text-[--semi-text-color]">Your work - 30 August</p>
            </div>
            <img class="w-14 h-14 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=300" alt="Work design"/>
          </div>

          <div class="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-gray-800">
            <div class="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
            <div class="relative shrink-0">
              <img class="w-14 h-14 rounded-full object-cover" src="https://images.unsplash.com/photo-1629579934212-cb851b329334?q=80&w=300" alt="Justi Bolt avatar"/>
                <div class="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.837 8.837 0 01-4.43-1.252A1 1 0 015 14.938V12a1 1 0 011-1h2a1 1 0 011 1v.062a6.98 6.98 0 002.34-1.745 1 1 0 011.414.072A5.993 5.993 0 0118 10zm-8-3a1 1 0 100-2 1 1 0 000 2zM5 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                </div>
            </div>
            <div class="flex-grow">
              <p class="text-base text-[--text-color]">
                <span class="font-bold">Justi Bolt</span> Mentioned you in
              </p>
              <p class="text-sm text-[--semi-text-color]">Your Post - 05 November</p>
            </div>
          </div>

          <div class="flex items-center space-x-4 py-4">
            <div class="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
            <div class="relative shrink-0">
              <img class="w-14 h-14 rounded-full object-cover" src="https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Justi Bolt avatar"/>
                <div class="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a2 2 0 00-.8 1.4z" />
                  </svg>
                </div>
            </div>
            <div class="flex-grow">
              <p class="text-base text-[--text-color]">
                <span class="font-bold">Justi Bolt</span> Mentioned you in
              </p>
              <p class="text-sm text-[--semi-text-color]">Your Post - 05 November</p>
            </div>
            <div class="w-14 h-14 bg-blue-500 rounded-full shrink-0"></div>
          </div>

        </div>

      </div>

    </body>
  )
}

export default Notification