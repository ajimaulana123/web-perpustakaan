import { Search, MessageCircle, Mail, Phone } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Help() {
  const faqs = [
    {
      question: "Bagaimana cara mendaftar sebagai anggota?",
      answer: "Anda dapat mendaftar secara online melalui website kami atau datang langsung ke perpustakaan dengan membawa KTP yang masih berlaku."
    },
    // ... tambahkan FAQ lainnya
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-center text-white mb-4">
            Pusat Bantuan
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari bantuan..."
              className="w-full px-6 py-4 rounded-full border-2 border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm pl-14"
            />
            <Search className="absolute left-5 top-4 w-6 h-6 text-orange-500" />
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
            Hubungi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <MessageCircle className="w-6 h-6" />, title: "Live Chat", desc: "Senin-Jumat, 08:00-17:00" },
              { icon: <Mail className="w-6 h-6" />, title: "Email", desc: "support@mylibrary.com" },
              { icon: <Phone className="w-6 h-6" />, title: "Telepon", desc: "(021) 1234-5678" },
            ].map((contact) => (
              <div key={contact.title} className="text-center group">
                <div className="flex justify-center text-orange-500 group-hover:text-blue-600 transition-colors">{contact.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{contact.title}</h3>
                <p className="text-gray-600">{contact.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 