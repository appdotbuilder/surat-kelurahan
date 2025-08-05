import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Template {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    created_at: string;
    generated_letters_count?: number;
}

interface PaginationData {
    data: Template[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    templates: PaginationData;
    [key: string]: unknown;
}

export default function LetterTemplatesIndex({ templates }: Props) {
    const handleDelete = (template: Template) => {
        if (confirm(`Apakah Anda yakin ingin menghapus template "${template.name}"?`)) {
            router.delete(route('letter-templates.destroy', template.id));
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">📝 Template Surat</h1>
                        <p className="text-gray-600 mt-2">Kelola template surat keterangan kelurahan</p>
                    </div>
                    <Link href="/letter-templates/create">
                        <Button>
                            ➕ Tambah Template
                        </Button>
                    </Link>
                </div>

                {templates.data.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-6xl mb-4">📄</div>
                            <h3 className="text-xl font-semibold mb-2">Belum ada template</h3>
                            <p className="text-gray-600 mb-6">Mulai dengan membuat template surat pertama Anda</p>
                            <Link href="/letter-templates/create">
                                <Button>Buat Template Pertama</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.data.map((template) => (
                            <Card key={template.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                                            <CardDescription>{template.description}</CardDescription>
                                        </div>
                                        <Badge variant={template.is_active ? "default" : "secondary"}>
                                            {template.is_active ? 'Aktif' : 'Non-aktif'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="text-sm text-gray-600">
                                            Dibuat: {new Date(template.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Link href={`/letter-templates/${template.id}`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    👁️ Lihat
                                                </Button>
                                            </Link>
                                            <Link href={`/letter-templates/${template.id}/edit`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Link href={`/generated-letters/create?template=${template.id}`} className="flex-1">
                                                <Button size="sm" className="w-full">
                                                    ✍️ Gunakan
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="destructive" 
                                                size="sm" 
                                                onClick={() => handleDelete(template)}
                                                className="px-3"
                                            >
                                                🗑️
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {templates.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: templates.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/letter-templates?page=${page}`}
                                className={`px-3 py-2 rounded-md ${
                                    page === templates.current_page
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