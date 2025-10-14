import { useRouter } from 'next/navigation';
import { ButtonStyle8 } from '@/Components/ButtonStyles';

const MedicineCON: React.FC = () =>{
    const router = useRouter();
  // Sample medicine data
  const medicines = [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      price: "$12.50",
      stock: "In Stock",
      description: "Broad-spectrum antibiotic for bacterial infections",
      image: "💊"
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      price: "$8.75",
      stock: "In Stock",
      description: "Anti-inflammatory medication for pain and fever",
      image: "💊"
    },
    {
      id: 3,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: "$6.25",
      stock: "Low Stock",
      description: "Fever reducer and pain reliever",
      image: "💊"
    }
  ];

  const handleMedicineClick = (medicineId: number) => {
    router.push(`/medicine/${medicineId}`);
  };

return(
    <>
         {/* Medicine Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              onClick={() => handleMedicineClick(medicine.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer group"
            >
              {/* Medicine Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl text-blue-600 font-bold">{medicine.image}</div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    medicine.stock === "In Stock" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {medicine.stock}
                  </span>
                </div>
              </div>

              {/* Medicine Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {medicine.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {medicine.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {medicine.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {medicine.price}
                  </span>
                  <ButtonStyle8 ButtonText="View Details" />
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
)
}

export default MedicineCON