export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-64px)]">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/models" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Model AI
            </a>
          </li>
          {/* <li>
            <a href="/datasets" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Dataset
            </a>
          </li>
          <li>
            <a href="/monitoring" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Monitoring
            </a>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
} 