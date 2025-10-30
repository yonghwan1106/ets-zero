'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  userName?: string
  userOrganization?: string
}

export function Navigation({ userName, userOrganization }: NavigationProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: '대시보드', icon: '🏠' },
    { href: '/vessels', label: '선박 관리', icon: '🚢' },
    { href: '/voyages', label: '항해 관리', icon: '⚓' },
    { href: '/plan', label: '운항 계획', icon: '🤖' },
    { href: '/about', label: '프로젝트 소개', icon: '💡' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">ETS-Zero</h1>
            <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-semibold rounded-full">
              Demo
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* User Info */}
          {userName && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userOrganization}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {userName.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
