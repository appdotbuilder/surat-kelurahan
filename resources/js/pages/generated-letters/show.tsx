import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Letter {
    id: number;
    letter_number: string;
    form_data: Record<string, string>;
    generated_content: string;
    generated_at: string;
    letter_template: {
        id: number;
        name: string;
        description: string;
    };
    user: {
        name: string;
        email: string;
    };
}

interface Props {
    letter: Letter;
    [key: string]: unknown;
}

export default function ShowGeneratedLetter({ letter }: Props) {
    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Create a simple HTML document for PDF generation
        const printContent = `
            <html>
                <head>
                    <title>Surat ${letter.letter_number}</title>
                    <style>
                        body { font-family: 'Times New Roman', serif; line-height: 1.6; margin: 40px; }
                        .letter-content { white-space: pre-line; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                    <div class="letter-content">${letter.generated_content}</div>
                </body>
            </html>
        `;
        
        const blob = new Blob([printContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Surat_${letter.letter_number.replace(/\//g, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
            router.delete(route('generated-letters.destroy', letter.id));
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">📄 {letter.letter_template.name}</h1>
                        <p className="text-gray-600 mt-2">
                            Nomor: {letter.letter_number} • 
                            Dibuat: {new Date(letter.generated_at).toLocaleDateString('id-ID')}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrint}>
                            🖨️ Cetak
                        </Button>
                        <Button variant="outline" onClick={handleDownload}>
                            💾 Unduh
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            🗑️ Hapus
                        </Button>
                    </div>
                </div>

                {/* Letter Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Template</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">{letter.letter_template.name}</p>
                            <p className="text-sm text-gray-600 mt-1">{letter.letter_template.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Dibuat Oleh</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">{letter.user.name}</p>
                            <p className="text-sm text-gray-600 mt-1">{letter.user.email}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                                Selesai
                            </Badge>
                            <p className="text-sm text-gray-600 mt-2">
                                Surat siap untuk dicetak atau diunduh
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Letter Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>Isi Surat</CardTitle>
                        <CardDescription>Pratinjau surat yang telah dibuat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-8 min-h-[600px] print:border-0 print:shadow-none">
                            <div className="max-w-4xl mx-auto">
                                <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">
                                    {letter.generated_content}
                                </pre>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Data */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data yang Digunakan</CardTitle>
                        <CardDescription>Data yang diisi untuk membuat surat ini</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(letter.form_data).map(([key, value]) => (
                                <div key={key} className="border-b pb-2">
                                    <dt className="text-sm font-medium text-gray-700 capitalize">
                                        {key.replace(/_/g, ' ')}
                                    </dt>
                                    <dd className="text-sm text-gray-900 mt-1">{value || '-'}</dd>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-between">
                    <Link href="/generated-letters">
                        <Button variant="outline">
                            ← Kembali ke Daftar Surat
                        </Button>
                    </Link>
                    
                    <div className="flex gap-2">
                        <Link href={`/generated-letters/create?template=${letter.letter_template.id}`}>
                            <Button variant="outline">
                                📝 Buat Surat Serupa
                            </Button>
                        </Link>
                        <Button onClick={handlePrint}>
                            🖨️ Cetak Surat
                        </Button>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { font-family: 'Times New Roman', serif; }
                    .letter-content { page-break-inside: avoid; }
                }
            `}</style>
        </AppShell>
    );
}