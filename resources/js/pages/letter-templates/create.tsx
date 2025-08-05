import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';



export default function CreateLetterTemplate() {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        content: '',
        required_fields: [] as string[],
        is_active: true,
    });
    
    const [newField, setNewField] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Auto-generate slug from name
        if (field === 'name' && typeof value === 'string') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const addField = () => {
        if (newField.trim() && !formData.required_fields.includes(newField.trim())) {
            setFormData(prev => ({
                ...prev,
                required_fields: [...prev.required_fields, newField.trim()]
            }));
            setNewField('');
        }
    };

    const removeField = (field: string) => {
        setFormData(prev => ({
            ...prev,
            required_fields: prev.required_fields.filter(f => f !== field)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post('/letter-templates', formData, {
            onSuccess: () => {
                // Success handled by redirect
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">➕ Buat Template Baru</h1>
                    <p className="text-gray-600 mt-2">Buat template surat keterangan yang dapat digunakan berulang</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                            <CardDescription>Informasi dasar tentang template surat</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Template</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Contoh: Surat Keterangan Tidak Mampu"
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => handleInputChange('slug', e.target.value)}
                                        placeholder="surat-keterangan-tidak-mampu"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Deskripsi template surat..."
                                    rows={3}
                                />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked: boolean) => handleInputChange('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Template aktif</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Required Fields */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Field yang Diperlukan</CardTitle>
                            <CardDescription>
                                Tentukan field yang harus diisi saat menggunakan template ini.
                                Gunakan format dalam konten untuk placeholder.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={newField}
                                    onChange={(e) => setNewField(e.target.value)}
                                    placeholder="nama_field"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addField())}
                                />
                                <Button type="button" onClick={addField}>
                                    Tambah
                                </Button>
                            </div>
                            
                            {formData.required_fields.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Field yang akan digunakan:</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.required_fields.map((field) => (
                                            <div
                                                key={field}
                                                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                <span>{"{{" + field + "}}"}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeField(field)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Konten Template</CardTitle>
                            <CardDescription>
                                Tulis konten surat dengan menggunakan placeholder dengan kurung kurawal ganda
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={formData.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                                placeholder={`SURAT KETERANGAN

Nomor: {{nomor_surat}}

Yang bertanda tangan di bawah ini...

{{nama}}
{{alamat}}`}
                                rows={15}
                                className="font-mono"
                                required
                            />
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline">
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Menyimpan...' : '💾 Simpan Template'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}