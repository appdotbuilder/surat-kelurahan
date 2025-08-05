<?php

namespace Database\Seeders;

use App\Models\LetterTemplate;
use Illuminate\Database\Seeder;

class LetterTemplateSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Surat Keterangan Tidak Mampu',
                'slug' => 'surat-keterangan-tidak-mampu',
                'description' => 'Template surat keterangan tidak mampu untuk keperluan bantuan sosial',
                'content' => "SURAT KETERANGAN TIDAK MAMPU\n\nNomor: {{nomor_surat}}\n\nYang bertanda tangan di bawah ini, Kepala Kelurahan {{nama_kelurahan}}, Kecamatan {{nama_kecamatan}}, dengan ini menerangkan bahwa:\n\nNama: {{nama}}\nNIK: {{nik}}\nTempat/Tanggal Lahir: {{tempat_lahir}}, {{tanggal_lahir}}\nJenis Kelamin: {{jenis_kelamin}}\nAgama: {{agama}}\nPekerjaan: {{pekerjaan}}\nAlamat: {{alamat}}\n\nBahwa yang bersangkutan adalah benar-benar warga yang tidak mampu dan memerlukan bantuan sosial.\n\nDemikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.\n\n{{tempat}}, {{tanggal}}\nKepala Kelurahan {{nama_kelurahan}}\n\n\n{{nama_kepala_kelurahan}}\nNIP. {{nip_kepala_kelurahan}}",
                'required_fields' => [
                    'nomor_surat',
                    'nama_kelurahan',
                    'nama_kecamatan',
                    'nama',
                    'nik',
                    'tempat_lahir',
                    'tanggal_lahir',
                    'jenis_kelamin',
                    'agama',
                    'pekerjaan',
                    'alamat',
                    'tempat',
                    'tanggal',
                    'nama_kepala_kelurahan',
                    'nip_kepala_kelurahan'
                ],
            ],
            [
                'name' => 'Surat Keterangan Belum Menikah',
                'slug' => 'surat-keterangan-belum-menikah',
                'description' => 'Template surat keterangan belum menikah untuk keperluan administrasi',
                'content' => "SURAT KETERANGAN BELUM MENIKAH\n\nNomor: {{nomor_surat}}\n\nYang bertanda tangan di bawah ini, Kepala Kelurahan {{nama_kelurahan}}, Kecamatan {{nama_kecamatan}}, dengan ini menerangkan bahwa:\n\nNama: {{nama}}\nNIK: {{nik}}\nTempat/Tanggal Lahir: {{tempat_lahir}}, {{tanggal_lahir}}\nJenis Kelamin: {{jenis_kelamin}}\nAgama: {{agama}}\nPekerjaan: {{pekerjaan}}\nAlamat: {{alamat}}\n\nBahwa yang bersangkutan sampai dengan dikeluarkannya surat keterangan ini belum pernah menikah.\n\nDemikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.\n\n{{tempat}}, {{tanggal}}\nKepala Kelurahan {{nama_kelurahan}}\n\n\n{{nama_kepala_kelurahan}}\nNIP. {{nip_kepala_kelurahan}}",
                'required_fields' => [
                    'nomor_surat',
                    'nama_kelurahan',
                    'nama_kecamatan',
                    'nama',
                    'nik',
                    'tempat_lahir',
                    'tanggal_lahir',
                    'jenis_kelamin',
                    'agama',
                    'pekerjaan',
                    'alamat',
                    'tempat',
                    'tanggal',
                    'nama_kepala_kelurahan',
                    'nip_kepala_kelurahan'
                ],
            ],
            [
                'name' => 'Surat Keterangan Belum Memiliki Rumah',
                'slug' => 'surat-keterangan-belum-memiliki-rumah',
                'description' => 'Template surat keterangan belum memiliki rumah untuk program perumahan',
                'content' => "SURAT KETERANGAN BELUM MEMILIKI RUMAH\n\nNomor: {{nomor_surat}}\n\nYang bertanda tangan di bawah ini, Kepala Kelurahan {{nama_kelurahan}}, Kecamatan {{nama_kecamatan}}, dengan ini menerangkan bahwa:\n\nNama: {{nama}}\nNIK: {{nik}}\nTempat/Tanggal Lahir: {{tempat_lahir}}, {{tanggal_lahir}}\nJenis Kelamin: {{jenis_kelamin}}\nAgama: {{agama}}\nPekerjaan: {{pekerjaan}}\nAlamat: {{alamat}}\nStatus Perkawinan: {{status_perkawinan}}\n\nBahwa yang bersangkutan belum memiliki rumah sendiri dan masih tinggal {{status_tinggal}}.\n\nDemikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.\n\n{{tempat}}, {{tanggal}}\nKepala Kelurahan {{nama_kelurahan}}\n\n\n{{nama_kepala_kelurahan}}\nNIP. {{nip_kepala_kelurahan}}",
                'required_fields' => [
                    'nomor_surat',
                    'nama_kelurahan',
                    'nama_kecamatan',
                    'nama',
                    'nik',
                    'tempat_lahir',
                    'tanggal_lahir',
                    'jenis_kelamin',
                    'agama',
                    'pekerjaan',
                    'alamat',
                    'status_perkawinan',
                    'status_tinggal',
                    'tempat',
                    'tanggal',
                    'nama_kepala_kelurahan',
                    'nip_kepala_kelurahan'
                ],
            ],
            [
                'name' => 'Surat Pengantar Nikah',
                'slug' => 'surat-pengantar-nikah',
                'description' => 'Template surat pengantar nikah untuk keperluan KUA',
                'content' => "SURAT PENGANTAR NIKAH\n\nNomor: {{nomor_surat}}\n\nYang bertanda tangan di bawah ini, Kepala Kelurahan {{nama_kelurahan}}, Kecamatan {{nama_kecamatan}}, dengan ini menerangkan bahwa:\n\nNama: {{nama}}\nNIK: {{nik}}\nTempat/Tanggal Lahir: {{tempat_lahir}}, {{tanggal_lahir}}\nJenis Kelamin: {{jenis_kelamin}}\nAgama: {{agama}}\nPekerjaan: {{pekerjaan}}\nAlamat: {{alamat}}\nNama Ayah: {{nama_ayah}}\nNama Ibu: {{nama_ibu}}\n\nBahwa yang bersangkutan akan melangsungkan pernikahan dengan:\n\nNama Calon Pasangan: {{nama_pasangan}}\nTempat/Tanggal Lahir: {{tempat_lahir_pasangan}}, {{tanggal_lahir_pasangan}}\nAlamat: {{alamat_pasangan}}\n\nRencana pelaksanaan nikah pada:\nHari/Tanggal: {{hari_nikah}}, {{tanggal_nikah}}\nTempat: {{tempat_nikah}}\n\nDemikian surat pengantar ini dibuat untuk dapat dipergunakan sebagaimana mestinya.\n\n{{tempat}}, {{tanggal}}\nKepala Kelurahan {{nama_kelurahan}}\n\n\n{{nama_kepala_kelurahan}}\nNIP. {{nip_kepala_kelurahan}}",
                'required_fields' => [
                    'nomor_surat',
                    'nama_kelurahan',
                    'nama_kecamatan',
                    'nama',
                    'nik',
                    'tempat_lahir',
                    'tanggal_lahir',
                    'jenis_kelamin',
                    'agama',
                    'pekerjaan',
                    'alamat',
                    'nama_ayah',
                    'nama_ibu',
                    'nama_pasangan',
                    'tempat_lahir_pasangan',
                    'tanggal_lahir_pasangan',
                    'alamat_pasangan',
                    'hari_nikah',
                    'tanggal_nikah',
                    'tempat_nikah',
                    'tempat',
                    'tanggal',
                    'nama_kepala_kelurahan',
                    'nip_kepala_kelurahan'
                ],
            ],
        ];

        foreach ($templates as $template) {
            LetterTemplate::create($template);
        }
    }
}