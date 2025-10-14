const express = require('express');
const router = express.Router();
const Medicine = require('../Models/MedicineModel');


// Function to generate fake medicine data locally
const generateLocalFakeMedicines = (count = 20) => {
  console.log(`Generating ${count} local fake medicines...`);
  const medicineNames = [
    "Amoxicillin", "Ibuprofen", "Paracetamol", "Omeprazole", "Metformin",
    "Lisinopril", "Atorvastatin", "Amlodipine", "Losartan", "Metoprolol",
    "Hydrochlorothiazide", "Sertraline", "Escitalopram", "Bupropion", "Venlafaxine",
    "Tramadol", "Codeine", "Morphine", "Oxycodone", "Fentanyl", "Insulin",
    "Warfarin", "Aspirin", "Acetaminophen", "Naproxen", "Diclofenac"
  ];

  const categories = [
    "Antibiotics", "Pain Relief", "Cardiovascular", "Diabetes", "Mental Health",
    "Gastrointestinal", "Respiratory", "Dermatology", "Oncology", "Emergency",
    "Hormonal", "Immunosuppressants", "Anticoagulants", "Antihistamines"
  ];

  const manufacturers = [
    "Pfizer Inc.", "Johnson & Johnson", "Novartis AG", "Roche Holding AG",
    "Merck & Co.", "GlaxoSmithKline", "Sanofi SA", "AstraZeneca PLC",
    "Bayer AG", "Eli Lilly and Company", "Bristol-Myers Squibb", "Abbott Laboratories"
  ];

  const sideEffects = [
    "Nausea", "Dizziness", "Headache", "Fatigue", "Diarrhea",
    "Constipation", "Rash", "Insomnia", "Anxiety", "Dry mouth",
    "Loss of appetite", "Weight gain", "Increased heart rate", "Drowsiness"
  ];

  const contraindications = [
    "Pregnancy", "Liver disease", "Kidney disease", "Heart condition",
    "Allergy to ingredients", "Alcohol use", "Other medications",
    "Breastfeeding", "Children under 12", "Elderly patients"
  ];

  const certifications = [
    "FDA Approved", "GMP Certified", "ISO 9001", "WHO Prequalified",
    "CE Marked", "Health Canada Approved", "TGA Approved"
  ];

  return Array.from({ length: count }, (_, index) => {
    const name = medicineNames[Math.floor(Math.random() * medicineNames.length)];
    const strength = Math.random() > 0.5 ? 
      `${Math.floor(Math.random() * 1000) + 50}mg` : 
      `${Math.floor(Math.random() * 50) + 1}mg`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.random() * 50 + 5;
    const stock = Math.random() > 0.7 ? "Low Stock" : "In Stock";
    
    return {
      // medicineId: `MED${String(index + 1).padStart(3, '0')}`,
      name: `${name} ${strength}`,
      category,
      price: parseFloat(price.toFixed(2)),
      stock,
      description: `${name} is a medication used to treat various conditions. It works by targeting specific receptors in the body to provide therapeutic effects.`,
      longDescription: `${name} is a widely used medication that belongs to the ${category.toLowerCase()} category. It works by interfering with specific biological processes in the body to provide therapeutic effects. This medication is commonly prescribed for various conditions and has been extensively studied for safety and efficacy.`,
      image: "💊",
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      dosage: `${Math.floor(Math.random() * 3) + 1} tablet${Math.floor(Math.random() * 3) + 1 > 1 ? 's' : ''} daily`,
      expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
      sideEffects: sideEffects.slice(0, Math.floor(Math.random() * 4) + 2),
      contraindications: contraindications.slice(0, Math.floor(Math.random() * 3) + 1),
      minimumOrder: Math.floor(Math.random() * 50) + 10,
      maxOrder: Math.floor(Math.random() * 10000) + 1000,
      deliveryTime: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 5) + 3} business days`,
      certifications: certifications.slice(0, Math.floor(Math.random() * 3) + 2),
      rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 500) + 10
    };
  });
};

// Route to fetch and store medicine data from external API
router.post('/fetch-and-store', async (req, res) => {
  try {
    console.log('fetch and store route has been called')
    const { source ,count  } = req.body;
    console.log(`Fetching ${count} medicines from source: ${source}`);
    let medicines = [];

    switch (source) {
      case 'openfda':
        try {
          const response = await fetch(`https://api.fda.gov/drug/label.json?limit=${count}`);
          medicines = response.data.results.map((drug, index) => ({
            //* medicineId: `MED${String(index + 1).padStart(3, '0')}`,
            name: drug.openfda?.generic_name?.[0] || `Medicine ${index + 1}`,
            category: drug.openfda?.pharm_class_cs?.[0] || "General",
            price: parseFloat((Math.random() * 50 + 5).toFixed(2)),
            stock: Math.random() > 0.7 ? "Low Stock" : "In Stock",
            description: drug.description?.[0]?.substring(0, 200) + "..." || "No description available",
            longDescription: drug.description?.[0] || "Detailed description not available",
            image: "💊",
            manufacturer: drug.openfda?.manufacturer_name?.[0] || "Unknown Manufacturer",
            dosage: drug.dosage_and_administration?.[0]?.substring(0, 100) + "..." || "Consult physician",
            expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
            sideEffects: drug.adverse_reactions?.[0]?.split(' ').slice(0, 5) || ["Unknown"],
            contraindications: drug.contraindications?.[0]?.split(' ').slice(0, 3) || ["Consult physician"],
            minimumOrder: Math.floor(Math.random() * 50) + 10,
            maxOrder: Math.floor(Math.random() * 10000) + 1000,
            deliveryTime: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 5) + 3} business days`,
            certifications: ["FDA Approved", "GMP Certified"],
            rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
            reviewCount: Math.floor(Math.random() * 500) + 10
          }));
        } catch (error) {
          console.error('OpenFDA API failed:', error.message);
          medicines = generateLocalFakeMedicines(count);
        }
        break;

      case 'jsonplaceholder':
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${count}`);
          medicines = response.data.map((post, index) => ({
            medicineId: `MED${String(index + 1).padStart(3, '0')}`,
            name: `Medicine ${post.id}`,
            category: ['Antibiotics', 'Pain Relief', 'Cardiovascular'][index % 3],
            price: parseFloat((Math.random() * 50 + 5).toFixed(2)),
            stock: index % 4 === 0 ? "Low Stock" : "In Stock",
            description: post.body.substring(0, 150) + "...",
            longDescription: post.body,
            image: "💊",
            manufacturer: "Generic Pharmaceuticals Inc.",
            dosage: "1-2 tablets daily",
            expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
            sideEffects: ["Nausea", "Dizziness", "Headache"],
            contraindications: ["Pregnancy", "Liver disease"],
            minimumOrder: Math.floor(Math.random() * 50) + 10,
            maxOrder: Math.floor(Math.random() * 10000) + 1000,
            deliveryTime: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 5) + 3} business days`,
            certifications: ["FDA Approved", "GMP Certified"],
            rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
            reviewCount: Math.floor(Math.random() * 500) + 10
          }));
        } catch (error) {
          console.error('JSONPlaceholder API failed:', error.message);
          medicines = generateLocalFakeMedicines(count);
        }
        break;

      case 'local':
      default:
        medicines = generateLocalFakeMedicines(count);
        break;
    }
    console.log('deleting existing Medicine')
    // Clear existing medicines (optional - remove this if you want to keep existing data)
    await Medicine.deleteMany({});
    console.log('Saving medicine')
    // Store medicines in database
    const savedMedicines = await Medicine.insertMany(medicines);
    console.log('sending data')
    res.status(200).json({
      success: true,
      message: `Successfully fetched and stored ${savedMedicines.length} medicines from ${source}`,
      count: savedMedicines.length,
      medicines: savedMedicines
    });

  } catch (error) {
    console.error('Error fetching and storing medicine data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch and store medicine data',
      error: error.message
    });
  }
});

// Route to get all medicines from database
router.post('/all', async (req, res) => {
  try {
    console.log('getting medicine from the get all route');
    let { page, limit } = req.query;
    let medicines, total;
    if (!page && !limit) {
      // No pagination, return all
      medicines = await Medicine.find({}).sort({ createdAt: -1 });
      total = medicines.length;
      res.status(200).json({
        success: true,
        medicines,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: total,
          itemsPerPage: total
        }
      });
    } else {
      // Paginated
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 12;
      const skip = (page - 1) * limit;
      medicines = await Medicine.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      total = await Medicine.countDocuments({});
      res.status(200).json({
        success: true,
        medicines,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    }
  } catch (error) {
    console.error('Error in /all route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch medicines',
      error: error.message
    });
  }
});

// Route to get categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Medicine.distinct('category');
    
    res.status(200).json({
      success: true,
      categories
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// Route to get medicine by ID
router.get('/:medicineId', async (req, res) => {
  try {
    console.log('getting medicine by ID')
    const { medicineId } = req.params;
    console.log('finding medicine')
    const medicine = await Medicine.findOne({ 
      $or: [
        // { medicineId: medicineId },
        { _id: medicineId }
      ],
      isActive: true 
    });
    
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }
    
    res.status(200).json({
      success: true,
      medicine
    });
    
  } catch (error) {
    console.error('Error fetching medicine:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch medicine',
      error: error.message
    });
  }
});

// Route to update medicine stock status
router.patch('/:medicineId/stock', async (req, res) => {
  try {
    const { medicineId } = req.params;
    const { inStock } = req.body;
    
    console.log(medicineId || inStock)

    const medicine = await Medicine.findByIdAndUpdate(
      medicineId,
      { inStock },
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Stock status updated successfully',
      medicine
    });

  } catch (error) {
    console.error('Error updating stock status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update stock status',
      error: error.message
    });
  }
});

module.exports = router;
