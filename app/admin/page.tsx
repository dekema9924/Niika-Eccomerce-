'use client'
import React from 'react'
import Link from 'next/link'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, AlertCircle, Eye, Edit } from 'lucide-react'

export default function AdminDashboard() {
    // Mock data - replace with actual API calls
    const stats = {
        totalRevenue: 45231.89,
        totalOrders: 152,
        totalProducts: 48,
        totalUsers: 1243,
        revenueChange: 12.5,
        ordersChange: 8.2,
        productsChange: 4,
        usersChange: 15.3
    }

    const recentOrders = [
        { id: 'ORD-001', customer: 'John Doe', total: 129.99, status: 'completed', date: '2 hours ago' },
        { id: 'ORD-002', customer: 'Jane Smith', total: 89.50, status: 'processing', date: '4 hours ago' },
        { id: 'ORD-003', customer: 'Mike Johnson', total: 259.00, status: 'pending', date: '6 hours ago' },
        { id: 'ORD-004', customer: 'Sarah Williams', total: 45.99, status: 'completed', date: '8 hours ago' },
        { id: 'ORD-005', customer: 'David Brown', total: 175.50, status: 'processing', date: '10 hours ago' },
    ]

    const lowStockProducts = [
        { id: '1', name: 'Summer Dress - Red', stock: 3, sku: 'SD-RED-M' },
        { id: '2', name: 'Denim Jacket', stock: 5, sku: 'DJ-BLUE-L' },
        { id: '3', name: 'Leather Boots', stock: 2, sku: 'LB-BLK-40' },
    ]

    const topProducts = [
        { id: '1', name: 'Classic White Tee', sales: 145, revenue: 2175.00 },
        { id: '2', name: 'Blue Jeans', sales: 98, revenue: 4900.00 },
        { id: '3', name: 'Summer Dress', sales: 87, revenue: 3480.00 },
        { id: '4', name: 'Sneakers', sales: 76, revenue: 6080.00 },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800'
            case 'processing':
                return 'bg-blue-100 text-blue-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
                    <p className='text-gray-600 mt-1'>Welcome back! Here's what's happening with your store.</p>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {/* Total Revenue */}
                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Total Revenue</p>
                                <p className='text-2xl font-bold text-gray-900 mt-2'>
                                    ${stats.totalRevenue.toLocaleString()}
                                </p>
                            </div>
                            <div className='bg-green-100 p-3 rounded-full'>
                                <DollarSign className='text-green-600' size={24} />
                            </div>
                        </div>
                        <div className='flex items-center mt-4 text-sm'>
                            <TrendingUp className='text-green-600' size={16} />
                            <span className='text-green-600 ml-1 font-medium'>+{stats.revenueChange}%</span>
                            <span className='text-gray-600 ml-2'>from last month</span>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Total Orders</p>
                                <p className='text-2xl font-bold text-gray-900 mt-2'>
                                    {stats.totalOrders}
                                </p>
                            </div>
                            <div className='bg-blue-100 p-3 rounded-full'>
                                <ShoppingBag className='text-blue-600' size={24} />
                            </div>
                        </div>
                        <div className='flex items-center mt-4 text-sm'>
                            <TrendingUp className='text-green-600' size={16} />
                            <span className='text-green-600 ml-1 font-medium'>+{stats.ordersChange}%</span>
                            <span className='text-gray-600 ml-2'>from last month</span>
                        </div>
                    </div>

                    {/* Total Products */}
                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Total Products</p>
                                <p className='text-2xl font-bold text-gray-900 mt-2'>
                                    {stats.totalProducts}
                                </p>
                            </div>
                            <div className='bg-purple-100 p-3 rounded-full'>
                                <Package className='text-purple-600' size={24} />
                            </div>
                        </div>
                        <div className='flex items-center mt-4 text-sm'>
                            <TrendingUp className='text-green-600' size={16} />
                            <span className='text-green-600 ml-1 font-medium'>+{stats.productsChange}</span>
                            <span className='text-gray-600 ml-2'>new this month</span>
                        </div>
                    </div>

                    {/* Total Users */}
                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>Total Users</p>
                                <p className='text-2xl font-bold text-gray-900 mt-2'>
                                    {stats.totalUsers.toLocaleString()}
                                </p>
                            </div>
                            <div className='bg-orange-100 p-3 rounded-full'>
                                <Users className='text-orange-600' size={24} />
                            </div>
                        </div>
                        <div className='flex items-center mt-4 text-sm'>
                            <TrendingUp className='text-green-600' size={16} />
                            <span className='text-green-600 ml-1 font-medium'>+{stats.usersChange}%</span>
                            <span className='text-gray-600 ml-2'>from last month</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Recent Orders - Takes 2 columns */}
                    <div className='lg:col-span-2 bg-white rounded-lg shadow'>
                        <div className='p-6 border-b border-gray-200'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-lg font-semibold text-gray-900'>Recent Orders</h2>
                                <Link href='/admin/orders' className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Order ID
                                        </th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Customer
                                        </th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Total
                                        </th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Status
                                        </th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className='hover:bg-gray-50'>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                                {order.id}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                                                {order.customer}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
                                                ${order.total}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                                                {order.date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Low Stock Alerts */}
                    <div className='bg-white rounded-lg shadow'>
                        <div className='p-6 border-b border-gray-200'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                                    <AlertCircle className='text-red-500' size={20} />
                                    Low Stock Alerts
                                </h2>
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='space-y-4'>
                                {lowStockProducts.map((product) => (
                                    <div key={product.id} className='flex items-center justify-between pb-4 border-b border-gray-100 last:border-0'>
                                        <div>
                                            <p className='text-sm font-medium text-gray-900'>{product.name}</p>
                                            <p className='text-xs text-gray-500 mt-1'>SKU: {product.sku}</p>
                                        </div>
                                        <div className='text-right'>
                                            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                                                {product.stock} left
                                            </span>
                                            <Link href={`/admin/products/${product.id}`} className='block mt-2 text-xs text-blue-600 hover:text-blue-700'>
                                                Restock
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className='mt-6 bg-white rounded-lg shadow'>
                    <div className='p-6 border-b border-gray-200'>
                        <h2 className='text-lg font-semibold text-gray-900'>Top Selling Products</h2>
                    </div>
                    <div className='p-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                            {topProducts.map((product, index) => (
                                <div key={product.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                                    <div className='flex items-start justify-between mb-2'>
                                        <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-bold'>
                                            #{index + 1}
                                        </span>
                                        <Link href={`/admin/products/${product.id}`} className='text-gray-400 hover:text-gray-600'>
                                            <Eye size={18} />
                                        </Link>
                                    </div>
                                    <h3 className='font-medium text-gray-900 mb-2'>{product.name}</h3>
                                    <div className='space-y-1'>
                                        <div className='flex justify-between text-sm'>
                                            <span className='text-gray-600'>Sales:</span>
                                            <span className='font-medium text-gray-900'>{product.sales}</span>
                                        </div>
                                        <div className='flex justify-between text-sm'>
                                            <span className='text-gray-600'>Revenue:</span>
                                            <span className='font-medium text-green-600'>${product.revenue.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Link href='/admin/products/new' className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-blue-100 p-3 rounded-full'>
                                <Package className='text-blue-600' size={24} />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-900'>Add Product</h3>
                                <p className='text-sm text-gray-600'>Create new product</p>
                            </div>
                        </div>
                    </Link>

                    <Link href='/admin/orders' className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-green-100 p-3 rounded-full'>
                                <ShoppingBag className='text-green-600' size={24} />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-900'>View Orders</h3>
                                <p className='text-sm text-gray-600'>Manage all orders</p>
                            </div>
                        </div>
                    </Link>

                    <Link href='/admin/products' className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500'>
                        <div className='flex items-center gap-4'>
                            <div className='bg-purple-100 p-3 rounded-full'>
                                <Edit className='text-purple-600' size={24} />
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-900'>Manage Products</h3>
                                <p className='text-sm text-gray-600'>Edit existing products</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}