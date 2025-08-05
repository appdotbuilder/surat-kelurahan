import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Letter {
    id: number;
    letter_number: string;
    generated_at: string;
    letter_template: {
        id: number;
        name: string;
    };
    user: {
        name: string;
    };
}

interface PaginationData {
    data: Letter[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    letters: PaginationData;
    [key: string]: unknown;
}

export default function GeneratedLettersIndex({ letters }: Props) {
    const handleDelete = (letter: Letter) => {
        if (confirm(`Apakah Anda yakin ingin menghapus surat nomor "${letter.letter_number}"?`)) {
            router.delete(route('generated-letters.destroy', letter.id));
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">📄 Daftar Surat</h1>
                        <p className="text-gray-600 mt-2">Surat keterangan yang telah dibuat</p>
                    </div>
                    <Link href="/generated-letters/create">
                        <Button>
                            ✍️ Buat Surat Baru
                        </Button>
                    </Link>
                </div>

                {letters.data.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-6xl mb-4">📄</div>
                            <h3 className="text-xl font-semibold mb-2">Belum ada surat</h3>
                            <p className="text-gray-600 mb-6">Mulai dengan membuat surat keterangan pertama Anda</p>
                            <Link href="/generated-letters/create">
                                <Button>Buat Surat Pertama</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {letters.data.map((letter) => (
                            <Card key={letter.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-1">
                                                {letter.letter_template.name}
                                            </CardTitle>
                                            <CardDescription>
                                                Nomor: {letter.letter_number}<br />
                                                Dibuat: {new Date(letter.generated_at).toLocaleDateString('id-ID')} oleh {letter.user.name}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="default" className="bg-green-100 text-green-800">
                                            Selesai
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2">
                                        <Link href={`/generated-letters/${letter.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                👁️ Lihat Detail
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => window.open(`/generated-letters/${letter.id}`, '_blank')}
                                        >
                                            🖨️ Cetak
                                        </Button>
                                        <Link href={`/generated-letters/create?template=${letter.letter_template.id}`}>
                                            <Button variant="outline" size="sm">
                                                📝 Buat Serupa
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="destructive" 
                                            size="sm" 
                                            onClick={() => handleDelete(letter)}
                                            className="px-3"
                                        >
                                            🗑️
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {letters.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: letters.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/generated-letters?page=${page}`}
                                className={`px-3 py-2 rounded-md ${
                                    page === letters.current_page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}