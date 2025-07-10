'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Icons (you can replace these with your preferred icon library)
const Icons = {
  Orders: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Products: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Promotions: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  Advertise: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Shop: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  ChevronUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  )
};

interface NavigationItem {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  href?: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  subItems?: NavigationItem[];
}

const VerticalNavigation: React.FC = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Navigation items configuration
  const navigationItems: NavigationItem[] = [
    {
      id: 'orders',
      label: 'Orders',
      icon: 'Orders',
      href: '/orders'
    },
    {
      id: 'products',
      label: 'Products',
      icon: 'Products',
      hasDropdown: true,
      isActive: true,
      subItems: [
        { id: 'all-products', label: 'All Products', icon: 'Products', href: '/products' },
        { id: 'add-product', label: 'Add Product', icon: 'Products', href: '/products/add' },
        { id: 'categories', label: 'Categories', icon: 'Products', href: '/products/categories' }
      ]
    },
    {
      id: 'promotions',
      label: 'Promotions',
      icon: 'Promotions',
      href: '/promotions'
    },
    {
      id: 'advertise',
      label: 'Advertise your Products',
      icon: 'Advertise',
      href: '/advertise'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'Analytics',
      href: '/analytics'
    }
  ];

  // Toggle expanded state for dropdown items
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Check if current route matches the item
  const isActiveRoute = (href: string) => {
    return router.pathname === href;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center">
                {/* Logo */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-sm flex items-center justify-center">
                    <span className="text-white font-bold text-lg">V</span>
                  </div>
                  <div className="ml-2">
                    <span className="text-orange-500 font-bold text-lg">VENDOR</span>
                    <span className="text-gray-600 font-normal text-lg ml-1">CENTER</span>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icons.Menu />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <div key={item.id}>
              {/* Main Navigation Item */}
              <div
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  item.isActive || isActiveRoute(item.href || '')
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleExpanded(item.id);
                  } else if (item.href) {
                    router.push(item.href);
                  }
                }}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {React.createElement(Icons[item.icon])}
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
                
                {!isCollapsed && item.hasDropdown && (
                  <div className="ml-auto">
                    {expandedItems.includes(item.id) ? (
                      <Icons.ChevronUp />
                    ) : (
                      <Icons.ChevronDown />
                    )}
                  </div>
                )}
              </div>

              {/* Dropdown Items */}
              {!isCollapsed && item.hasDropdown && expandedItems.includes(item.id) && item.subItems && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link key={subItem.id} href={subItem.href || '#'}>
                      <div className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        isActiveRoute(subItem.href || '')
                          ? 'bg-teal-50 text-teal-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}>
                        {subItem.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          {/* Store Info */}
          <div className="mb-4">
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                <Icons.Shop />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 truncate">Blessing BookShop</p>
                      <p className="text-sm text-gray-500 truncate">palomakut@gmail.com</p>
                    </div>
                    <Icons.ChevronUp />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Links */}
          {!isCollapsed && (
            <div className="space-y-2 text-sm">
              <Link href="/feedback" className="block text-gray-600 hover:text-gray-900 py-1">
                Give us your feedback!
              </Link>
              <Link href="/settings" className="block text-gray-600 hover:text-gray-900 py-1">
                Settings
              </Link>
              <Link href="/profile" className="block text-gray-600 hover:text-gray-900 py-1">
                Profile
              </Link>
              <button className="block text-gray-600 hover:text-gray-900 py-1 w-full text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalNavigation;