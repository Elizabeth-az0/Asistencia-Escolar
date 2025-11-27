import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { School, User, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate network delay for effect
        setTimeout(() => {
            if (login(username, password)) {
                navigate('/');
            } else {
                setError('Credenciales inválidas');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-white/20 p-4 rounded-full mb-4 shadow-inner">
                        <School className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">AsistenciaPro</h1>
                    <p className="text-primary-100 mt-2">Gestión escolar inteligente</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-xl mb-6 text-sm text-center animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary-100 ml-1">Usuario</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-200" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-primary-300 transition-all"
                                placeholder="director o profesor"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary-100 ml-1">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-200" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-primary-300 transition-all"
                                placeholder="••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-primary-700 py-3.5 rounded-xl font-bold hover:bg-primary-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                Iniciar Sesión <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-primary-200">
                    <p>Credenciales Demo:</p>
                    <p className="mt-1">director / 123 • profesor / 123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
