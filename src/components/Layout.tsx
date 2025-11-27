import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ClipboardCheck,
    BarChart3,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    School
} from 'lucide-react';
import { cn } from '../lib/utils';

const Layout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Inicio', icon: LayoutDashboard, roles: ['DIRECTOR', 'PROFESSOR'] },
        { path: '/attendance', label: 'Asistencia', icon: ClipboardCheck, roles: ['DIRECTOR', 'PROFESSOR'] },
        { path: '/reports', label: 'Reportes', icon: BarChart3, roles: ['DIRECTOR', 'PROFESSOR'] },
        { path: '/classes', label: 'Gestión Aulas', icon: Users, roles: ['DIRECTOR', 'PROFESSOR'] },
        { path: '/admin', label: 'Administración', icon: Settings, roles: ['DIRECTOR'] },
    ];

    const filteredNavItems = navItems.filter(item => user && item.roles.includes(user.role));

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
                    <School className="w-6 h-6" />
                    <span>AsistenciaPro</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen sticky top-0",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="p-6 hidden md:flex items-center gap-2 text-primary-600 font-bold text-2xl">
                        <School className="w-8 h-8" />
                        <span>AsistenciaPro</span>
                    </div>

                    <div className="p-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                                alt="Profile"
                                className="w-10 h-10 rounded-full bg-slate-100"
                            />
                            <div className="overflow-hidden">
                                <p className="font-medium text-slate-900 truncate">{user?.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{user?.role.toLowerCase()}</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {filteredNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                                    isActive
                                        ? "bg-primary-50 text-primary-700 shadow-sm"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                        >
                            <LogOut className="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen bg-slate-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-0 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
