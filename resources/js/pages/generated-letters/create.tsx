import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Template {
    id: number;
    name: string;
    description: string;
    content: string;
    required_fields: string[];
}

interface Props {
    templates: Template[];
    [key: string]: unknown;
}

export default function CreateGeneratedLetter({ templates }: Props) {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check for template from URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const templateId = urlParams.get('template');
        if (templateId) {
            const template = templates.find(t => t.id === parseInt(templateId));
            if (template) {
                setSelectedTemplate(template);
                const initialData: Record<string, string> = {};
                template.required_fields.forEach(field => {
                    initialData[field] = '';
                });
                
                // Set default values
                initialData['nomor_surat'] = generateLetterNumber();
                initialData['tanggal'] = new Date().toLocaleDateString('id-ID');
                initialData['tempat'] = 'Jakarta';
                
                setFormData(initialData);
            }
        }
    }, [templates]);

    const initializeFormData = (template: Template) => {
        const initialData: Record<string, string> = {};
        template.required_fields.forEach(field => {
            initialData[field] = '';
        });
        
        // Set default values
        initialData['nomor_surat'] = generateLetterNumber();
        initialData['tanggal'] = new Date().toLocaleDateString('id-ID');
        initialData['tempat'] = 'Jakarta';
        
        setFormData(initialData);
    };

    const generateLetterNumber = () => {
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const count = Math.floor(Math.random() * 999) + 1;
        return `${String(count).padStart(3, '0')}/KEL/${month}/${year}`;
    };

    const handleTemplateChange = (templateId: string) => {
        const template = templates.find(t => t.id === parseInt(templateId));
        if (template) {
            setSelectedTemplate(template);
            initializeFormData(template);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTemplate) return;

        setIsSubmitting(true);
        
        router.post('/generated-letters', {
            template_id: selectedTemplate.id,
            form_data: formData
        }, {
            onSuccess: () => {
                // Success handled by redirect
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const getFieldLabel = (field: string) => {
        const labels: Record<string, string> = {
            nomor_surat: 'Nomor Surat',
            nama_kelurahan: 'Nama Kelurahan',
            nama_kecamatan: 'Nama Kecamatan',
            nama: 'Nama Lengkap',
            nik: 'NIK',
            tempat_lahir: 'Tempat Lahir',
            tanggal_lahir: 'Tanggal Lahir',
            jenis_kelamin: 'Jenis Kelamin',
            agama: 'Agama',
            pekerjaan: 'Pekerjaan',
            alamat: 'Alamat',
            tempat: 'Tempat',
            tanggal: 'Tanggal',
            nama_kepala_kelurahan: 'Nama Kepala Kelurahan',
            nip_kepala_kelurahan: 'NIP Kepala Kelurahan',
            status_perkawinan: 'Status Perkawinan',
            status_tinggal: 'Status Tinggal',
            nama_ayah: 'Nama Ayah',
            nama_ibu: 'Nama Ibu',
            nama_pasangan: 'Nama Calon Pasangan',
            tempat_lahir_pasangan: 'Tempat Lahir Pasangan',
            tanggal_lahir_pasangan: 'Tanggal Lahir Pasangan',
            alamat_pasangan: 'Alamat Pasangan',
            hari_nikah: 'Hari Nikah',
            tanggal_nikah: 'Tanggal Nikah',
            tempat_nikah: 'Tempat Nikah',
        };
        return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const renderInputField = (field: string) => {
        const label = getFieldLabel(field);
        const value = formData[field] || '';

        if (field === 'jenis_kelamin') {
            return (
                <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{label}</Label>
                    <Select value={value} onValueChange={(val) => handleInputChange(field, val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            );
        }

        if (field === 'agama') {
            return (
                <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{label}</Label>
                    <Select value={value} onValueChange={(val) => handleInputChange(field, val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih agama" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Islam">Islam</SelectItem>
                            <SelectItem value="Kristen">Kristen</SelectItem>
                            <SelectItem value="Katolik">Katolik</SelectItem>
                            <SelectItem value="Hindu">Hindu</SelectItem>
                            <SelectItem value="Buddha">Buddha</SelectItem>
                            <SelectItem value="Konghucu">Konghucu</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            );
        }

        if (field === 'alamat' || field === 'alamat_pasangan') {
            return (
                <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{label}</Label>
                    <Textarea
                        id={field}
                        value={value}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        placeholder={`Masukkan ${label.toLowerCase()}`}
                        rows={3}
                    />
                </div>
            );
        }

        return (
            <div key={field} className="space-y-2">
                <Label htmlFor={field}>{label}</Label>
                <Input
                    id={field}
                    type={field.includes('tanggal') ? 'date' : 'text'}
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={`Masukkan ${label.toLowerCase()}`}
                />
            </div>
        );
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">✍️ Buat Surat Baru</h1>
                    <p className="text-gray-600 mt-2">Pilih template dan isi data untuk membuat surat keterangan</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Pilih Template Surat</CardTitle>
                        <CardDescription>Pilih jenis surat yang ingin Anda buat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Label htmlFor="template">Template Surat</Label>
                            <Select value={selectedTemplate?.id.toString() || ''} onValueChange={handleTemplateChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih template surat" />
                                </SelectTrigger>
                                <SelectContent>
                                    {templates.map((template) => (
                                        <SelectItem key={template.id} value={template.id.toString()}>
                                            {template.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            {selectedTemplate && (
                                <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {selectedTemplate && (
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Surat</CardTitle>
                                <CardDescription>Lengkapi data yang diperlukan untuk surat</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {selectedTemplate.required_fields.map(field => renderInputField(field))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end space-x-4 mt-6">
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Membuat...' : '📄 Buat Surat'}
                            </Button>
                        </div>
                    </form>
                )}

                {!selectedTemplate && templates.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold mb-2">Belum ada template</h3>
                            <p className="text-gray-600 mb-6">Buat template surat terlebih dahulu sebelum membuat surat</p>
                            <Button>Buat Template</Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}