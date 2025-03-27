export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">AI Flow</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            {/* Ikon notifikasi akan ditambahkan nanti */}
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700">
            {/* Avatar pengguna akan ditambahkan nanti */}
          </div>
        </div>
      </div>
    </header>
  );
} 