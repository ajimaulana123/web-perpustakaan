import { Users, BookOpen, Activity, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Admin() {
  const recentActivities = [
    {
      user: "Sarah Johnson",
      action: "meminjam",
      book: "The Psychology of Money",
      time: "2 menit yang lalu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40&h=40&auto=format&fit=crop",
    },
    {
      user: "John Doe",
      action: "mengembalikan",
      book: "Atomic Habits",
      time: "5 menit yang lalu",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=40&h=40&auto=format&fit=crop",
    },
    {
      user: "Alex Kim",
      action: "memperpanjang",
      book: "Think and Grow Rich",
      time: "10 menit yang lalu",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=40&h=40&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              icon: <Users className="w-6 h-6" />, 
              label: "Total Anggota", 
              value: "2,543", 
              trend: "+12%",
              color: "from-blue-600 to-blue-700",
              lightColor: "bg-blue-50"
            },
            { 
              icon: <BookOpen className="w-6 h-6" />, 
              label: "Buku Dipinjam", 
              value: "847", 
              trend: "+5%",
              color: "from-orange-500 to-orange-600",
              lightColor: "bg-orange-50"
            },
            { 
              icon: <Activity className="w-6 h-6" />, 
              label: "Pengunjung Hari Ini", 
              value: "128", 
              trend: "-3%",
              color: "from-blue-500 to-blue-600",
              lightColor: "bg-blue-50"
            },
            { 
              icon: <AlertCircle className="w-6 h-6" />, 
              label: "Keterlambatan", 
              value: "23", 
              trend: "-2%",
              color: "from-orange-600 to-orange-700",
              lightColor: "bg-orange-50"
            },
          ].map((stat) => (
            <div key={stat.label} className="group bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl text-white bg-gradient-to-r ${stat.color} transform group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
                  stat.trend.startsWith('+') 
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-orange-700 bg-orange-100'
                }`}>
                  {stat.trend.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <section className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-600 mb-8 flex items-center gap-2">
            <Activity className="w-6 h-6 text-orange-500" />
            Aktivitas Terbaru
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} 
                className="flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200">
                <div className="relative">
                  <Image
                    src={activity.avatar}
                    alt={activity.user}
                    width={48}
                    height={48}
                    className="rounded-full object-cover ring-2 ring-white shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    <span className="text-blue-600">{activity.user}</span>{" "}
                    <span className="text-gray-600">{activity.action}</span>{" "}
                    <span className="text-orange-600 font-semibold">{activity.book}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 