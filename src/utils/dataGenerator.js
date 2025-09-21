// Data generator for creating large datasets
const cities = [
    "New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia",
    "San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville",
    "Fort Worth","Columbus","Charlotte","San Francisco","Indianapolis",
    "Seattle","Denver","Washington","Boston","El Paso","Nashville","Detroit",
    "Oklahoma City","Portland","Las Vegas","Memphis","Louisville",
  ];
  
  const industries = [
    "Technology","Healthcare","Finance","Manufacturing","Retail","Education",
    "Real Estate","Transportation","Energy","Media","Consulting","Legal",
    "Food & Beverage","Automotive","Telecommunications","Construction",
  ];
  
  const productCategories = [
    "Software","Hardware","Cloud Services","Support","Analytics","Security",
    "Mobile Apps","Web Development","Data Science","AI/ML","DevOps","Testing",
  ];
  
  const orderStatuses = ["pending","processing","shipped","completed","cancelled"];
  const userStatuses = ["active","inactive","suspended"];
  const customerStatuses = ["standard","premium","enterprise"];
  
  // Helpers
  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomPrice = (min, max) => Math.round((Math.random() * (max - min) + min) * 100) / 100;
  const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split("T")[0];
  
  // Product base names by category
  const productBaseNames = {
    "Software": ["CRM","ERP","Analytics Suite","CMS"],
    "Hardware": ["Laptop","Monitor","Router","Keyboard"],
    "Cloud Services": ["Hosting","Storage","CDN","Backup"],
    "Support": ["Consulting","Maintenance","Setup"],
    "Analytics": ["BI Tool","Data Pipeline","Dashboard"],
    "Security": ["Firewall","Antivirus","Encryption Tool"],
    "Mobile Apps": ["App","Game","Utility"],
    "Web Development": ["Website","Landing Page","Portal"],
    "Data Science": ["Model","Dataset","Notebook"],
    "AI/ML": ["Predictor","Classifier","Recommender"],
    "DevOps": ["CI/CD Tool","Pipeline","Monitoring Tool"],
    "Testing": ["QA Suite","Test Automation","Bug Tracker"]
  };
  
  // Generate users
  export const generateUsers = (count = 1000) => {
    const users = [];
    for (let i = 1; i <= count; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@${getRandomItem(["gmail.com","yahoo.com","outlook.com"])}`,
        age: getRandomNumber(18, 65),
        city: getRandomItem(cities),
        created_at: randomDate(new Date(2022,0,1), new Date(2024,11,31)),
        status: getRandomItem(userStatuses),
        customer_id: getRandomNumber(1, 500) // linking user to a customer
      });
    }
    return users;
  };
  
  // Generate customers
  export const generateCustomers = (count = 500) => {
    const customers = [];
    for (let i = 1; i <= count; i++) {
      customers.push({
        id: i,
        company_name: `Company ${i}`,
        contact_person: `Contact ${i}`,
        email: `company${i}@${getRandomItem(["example.com","biz.com","corp.com"])}`,
        phone: `+1-555-${String(Math.floor(Math.random()*10000)).padStart(4,"0")}`,
        customer_since: randomDate(new Date(2020,0,1), new Date(2024,11,31)),
        status: getRandomItem(customerStatuses)
      });
    }
    return customers;
  };
  
  // Generate products
  export const generateProducts = (count = 200) => {
    const products = [];
    for (let i = 1; i <= count; i++) {
      const category = getRandomItem(productCategories);
      products.push({
        id: i,
        name: `${getRandomItem(productBaseNames[category])} ${i}`,
        category: category,
        price: getRandomPrice(10, 2000),
        description: `Description for Product ${i}`,
        stock_quantity: getRandomNumber(0, 1000),
        created_at: randomDate(new Date(2022,0,1), new Date(2024,11,31)),
        status: "active"
      });
    }
    return products;
  };
  
  // Generate orders
  export const generateOrders = (count = 2000) => {
    const orders = [];
    for (let i = 1; i <= count; i++) {
      const quantity = getRandomNumber(1, 10);
      const unitPrice = getRandomPrice(10, 500);
      const productId = getRandomNumber(1, 200);
      const customerId = getRandomNumber(1, 500);
      orders.push({
        id: i,
        customer_id: customerId,
        product_id: productId,
        product_name: `Product ${productId}`,
        quantity: quantity,
        unit_price: unitPrice,
        total_amount: Math.round(quantity * unitPrice * 100) / 100,
        shipping_address: `${getRandomNumber(100,9999)} Street, ${getRandomItem(cities)}`
      });
    }
    return orders;
  };
  
  // Export all datasets together
  export const generateAllData = () => ({
    users: generateUsers(),
    customers: generateCustomers(),
    products: generateProducts(),
    orders: generateOrders(),
  });
  