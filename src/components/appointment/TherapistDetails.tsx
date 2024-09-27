import Image from "next/image";

export const TherapistDetails: React.FC = () => {
  return (
    <div className="flex-1 p-8 bg-[#FFF3E5] rounded-lg shadow-lg">
      <div className="flex gap-4">
        <Image
          src="/path-to-your-image.jpg" // Replace with a valid image path
          alt="Profile Photo"
          width={150}
          height={150}
          className="rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">Dr. Abraham</h2>
          <p>Lokasi: Bandung</p>
          <p>Biaya: Rp 50k/jam</p>
          <p>Asuransi: Bisa</p>
          <div>
            <p className="font-semibold">Sertifikasi:</p>
            <ul className="list-disc list-inside">
              <li>Spesialis BCT</li>
              <li>Spesialis ABC</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Spesialisasi</h3>
        <div className="bg-white rounded p-2 mt-1">
          <p>
            Pendekatan Terapi Kognitif (CBT), Terapi Perilaku Dialektik (DBT)
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Pendekatan Terapi</h3>
        <div className="bg-white rounded p-2 mt-1">
          <p>
            Saya menggunakan pendekatan holistik, dengan fokus pada kesehatan
            mental dan emosional pasien. Teknik yang digunakan termasuk
            meditasi, terapi bicara, dan metode mindfulness.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Pengalaman</h3>
        <div className="bg-white rounded p-2 mt-1">
          <p>
            Saya memiliki pengalaman 10 tahun bekerja dengan pasien yang
            memiliki masalah kecemasan, depresi, dan gangguan stres pasca-trauma
            (PTSD). Saya juga bekerja dengan anak-anak dan remaja dalam konteks
            terapi keluarga.
          </p>
        </div>
      </div>
    </div>
  );
};
