import Link from 'next/link'
import { FiPieChart, FiGrid, FiShoppingCart, FiBarChart } from 'react-icons/fi'

export default function Sidebar() {
  return (
    <>
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiPieChart className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiGrid className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiShoppingCart className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Products</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FiBarChart className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Analytics</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
