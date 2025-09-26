import { motion } from "framer-motion";
import { MdNavigateNext } from "react-icons/md";

const categories = [
  { name: "Vehicles", ads: "112,516", href: "#vehicles" },
  { name: "Property", ads: "46,128", href: "#property" },
  { name: "Mobile Phones & Tablets", ads: "60,438", href: "#mobile" },
  { name: "Electronics", ads: "266,124", href: "#electronics" },
  { name: "Home, Furniture & Appliances", ads: "365,637", href: "#home" },
  { name: "Fashion", ads: "56,901", href: "#fashion" },
  { name: "Beauty & Personal Care", ads: "41,135", href: "#beauty" },
  { name: "Services", ads: "25,476", href: "#services" },
  { name: "Babies & Kids", ads: "14,890", href: "#kids" },
  { name: "Animals & Pets", ads: "6,726", href: "#pets" },
];

export default function CategorySidebar() {
  return (
    <div className="relative w-80 h-[500px] overflow-hidden rounded-lg z-0">
      {/* Top Blur Overlay */}
      <div className="pointer-events-none absolute top-0 left-0 h-6 w-full bg-gradient-to-b from-white to-transparent z-10"></div>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto scrollbar-hide">
        {categories.map((cat, idx) => (
          <motion.a
            key={idx}
            href={cat.href}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between rounded-xl border border-gray-300 p-3 bg-gray-50 hover:bg-gray-100 transition"
          >
            {/* Placeholder Image and Text */}
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">Img</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.ads} ads</p>
              </div>
            </div>
            <MdNavigateNext className="text-gray-400 text-2xl" />
          </motion.a>
        ))}
      </div>

      {/* Bottom Blur Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white to-transparent z-10"></div>
    </div>
  );
}