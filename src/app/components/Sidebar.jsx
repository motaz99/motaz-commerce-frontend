import Link from 'next/link';
import { AiOutlineHome, AiOutlineTeam, AiOutlineFolderOpen, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import Logout from './Logout';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: AiOutlineHome },
    { href: '/employees', label: 'Employees', icon: AiOutlineTeam },
    { href: '/employees/archived-employees', label: 'Archived Employees', icon: AiOutlineFolderOpen },
    { href: '/employees/users', label: 'Users', icon: AiOutlineUser },
  ];

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 flex flex-col justify-between"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 hover:text-blue-500 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-6 h-6 mr-3" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Logout />
      </div>
    </aside>
  );
}

