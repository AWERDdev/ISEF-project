const axios = require('axios');
const connectDB = require('./DB/DB');
const Medicine = require('./Models/MedicineModel');

// Function to generate fake medicine data locally
const generateLocalFakeMedicines = (count = 20) => {
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
      medicineId: `MED${String(index + 1).padStart(3, '0')}`,
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

const setupMEDPage = async (count = 20) => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    console.log(`Generating ${count} medicines for MEDPage...`);
    const medicines = generateLocalFakeMedicines(count);

    // Clear existing medicines
    console.log('Clearing existing medicines...');
    await Medicine.deleteMany({});

    // Store medicines in database
    console.log('Storing medicines in database...');
    const savedMedicines = await Medicine.insertMany(medicines);

    console.log(`✅ Successfully stored ${savedMedicines.length} medicines in database!`);
    console.log('Sample medicines:');
    savedMedicines.slice(0, 5).forEach(med => {
      console.log(`- ${med.medicineId}: ${med.name} (${med.category}) - $${med.price}`);
    });

    console.log('\n🎉 MEDPage Setup complete! You can now:');
    console.log('1. Start your API server: npm start');
    console.log('2. Start your client: npm run dev');
    console.log('3. Visit your MainPage to see the medicines');
    console.log('4. Click on any medicine to view its detail page');
    console.log('5. API endpoints are at /api/MEDPage/');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up MEDPage medicines:', error);
    process.exit(1);
  }
};

// Get count from command line argument
const count = parseInt(process.argv[2]) || 20;

console.log(`🚀 Setting up ${count} medicines for MEDPage...`);
setupMEDPage(count); 