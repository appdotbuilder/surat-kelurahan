import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Template {
    id: number;
    name: string;
    description: string;
    slug: string;
    is_active: boolean;
}

interface RecentLetter {
    id: number;
    letter_number: string;
    created_at: string;
    letter_template: {
        name: string;
    };
}

interface Stats {
    total_templates: number;
    total_letters: number;
    letters_this_month: number;
}

interface Props {
    templates?: Template[];
    recentLetters?: RecentLetter[];
    stats?: Stats;
    auth?: {
        user: {
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ templates = [], recentLetters = [], stats, auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 text-white p-2 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">📄 Surat Kelurahan</h1>
                                <p className="text-sm text-gray-600">Sistem Manajemen Surat Keterangan</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-700">Halo, {auth.user.name}</span>
                                    <Link href="/dashboard">
                                        <Button>Dashboard</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/login">
                                        <Button variant="outline">Masuk</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Daftar</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        🏢 Kelola Surat Keterangan dengan Mudah
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Aplikasi modern untuk mengelola berbagai template surat keterangan kelurahan. 
                        Buat, kelola, dan cetak surat dengan cepat dan efisien.
                    </p>
                    
                    {/* Statistics */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total_templates}</div>
                                    <div className="text-sm text-gray-600">Template Tersedia</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">{stats.total_letters}</div>
                                    <div className="text-sm text-gray-600">Total Surat</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">{stats.letters_this_month}</div>
                                    <div className="text-sm text-gray-600">Bulan Ini</div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {auth?.user ? (
                            <>
                                <Link href="/generated-letters/create">
                                    <Button size="lg" className="px-8">
                                        ✍️ Buat Surat Baru
                                    </Button>
                                </Link>
                                <Link href="/letter-templates">
                                    <Button variant="outline" size="lg" className="px-8">
                                        📝 Kelola Template
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link href="/register">
                                <Button size="lg" className="px-8">
                                    🚀 Mulai Sekarang
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">✨ Fitur Unggulan</h3>
                        <p className="text-lg text-gray-600">Semua yang Anda butuhkan untuk mengelola surat keterangan</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">📋</div>
                                <h4 className="text-lg font-semibold mb-2">Template Lengkap</h4>
                                <p className="text-gray-600 text-sm">Berbagai template surat keterangan yang sudah siap pakai</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">⚡</div>
                                <h4 className="text-lg font-semibold mb-2">Pembuatan Cepat</h4>
                                <p className="text-gray-600 text-sm">Isi form dan surat langsung jadi dalam hitungan detik</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">🖨️</div>
                                <h4 className="text-lg font-semibold mb-2">Cetak & Unduh</h4>
                                <p className="text-gray-600 text-sm">Cetak langsung atau unduh dalam format PDF</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">🔧</div>
                                <h4 className="text-lg font-semibold mb-2">Mudah Kelola</h4>
                                <p className="text-gray-600 text-sm">Interface yang intuitif dan mudah digunakan</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            {templates.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">📝 Template Tersedia</h3>
                            <p className="text-lg text-gray-600">Pilih template sesuai kebutuhan Anda</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {templates.map((template) => (
                                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">{template.name}</CardTitle>
                                            {template.is_active && (
                                                <Badge variant="default" className="bg-green-100 text-green-800">
                                                    Aktif
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription>{template.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {auth?.user ? (
                                            <Link href={`/generated-letters/create?template=${template.id}`}>
                                                <Button className="w-full">Gunakan Template</Button>
                                            </Link>
                                        ) : (
                                            <Link href="/login">
                                                <Button variant="outline" className="w-full">Login untuk Menggunakan</Button>
                                            </Link>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            {auth?.user && (
                                <Link href="/letter-templates">
                                    <Button variant="outline">Lihat Semua Template</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Recent Letters */}
            {recentLetters.length > 0 && auth?.user && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">📄 Surat Terbaru</h3>
                            <p className="text-lg text-gray-600">Surat yang baru saja dibuat</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentLetters.map((letter) => (
                                <Card key={letter.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-base">{letter.letter_template.name}</CardTitle>
                                        <CardDescription>
                                            No: {letter.letter_number}<br />
                                            {new Date(letter.created_at).toLocaleDateString('id-ID')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href={`/generated-letters/${letter.id}`}>
                                            <Button variant="outline" className="w-full">Lihat Detail</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/generated-letters">
                                <Button variant="outline">Lihat Semua Surat</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold mb-4">📄 Surat Kelurahan</h4>
                        <p className="text-gray-400">Sistem manajemen surat keterangan yang mudah dan efisien</p>
                    </div>
                    <div className="border-t border-gray-800 pt-8">
                        <p className="text-gray-400">&copy; 2024 Surat Kelurahan. Semua hak dilindungi.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}