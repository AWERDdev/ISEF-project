export interface Medicine {
    _id: string;
    medicineId: string;
    name: string;
    category: string;
    price: number;
    stock: string;
    description: string;
    image: string;
    manufacturer: string;
    dosage: string;
    expiryDate: string;
    sideEffects: string[];
    contraindications: string[];
    minimumOrder: number;
    maxOrder: number;
    deliveryTime: string;
    certifications: string[];
    rating: number;
    reviewCount: number;
    inStock: boolean;
  }