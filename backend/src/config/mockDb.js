// Mock database - stores data in memory (for testing without PostgreSQL)
const users = new Map();
const companies = new Map();
let userIdCounter = 1;
let companyIdCounter = 1;

const mockDb = {
  query: async (queryText, values) => {
    // SELECT user by email
    if (queryText.includes('SELECT * FROM users WHERE email')) {
      const email = values[0];
      const user = Array.from(users.values()).find(u => u.email === email);
      return { rows: user ? [user] : [] };
    }
    
    // SELECT user by id
    if (queryText.includes('SELECT * FROM users WHERE id')) {
      const id = values[0];
      return { rows: users.has(id) ? [users.get(id)] : [] };
    }
    
    // SELECT user by mobile
    if (queryText.includes('SELECT * FROM users WHERE mobile_no')) {
      const mobile = values[0];
      const user = Array.from(users.values()).find(u => u.mobile_no === mobile);
      return { rows: user ? [user] : [] };
    }
    
    // INSERT user
    if (queryText.includes('INSERT INTO users')) {
      const [email, password, full_name, signup_type, gender, mobile_no] = values;
      const user = {
        id: userIdCounter++,
        email,
        password,
        full_name,
        signup_type,
        gender,
        mobile_no,
        is_email_verified: false,
        is_mobile_verified: false,
        created_at: new Date(),
        updated_at: new Date()
      };
      users.set(user.id, user);
      return { rows: [user] };
    }
    
    // UPDATE user
    if (queryText.includes('UPDATE users SET')) {
      const id = values[values.length - 1];
      const user = users.get(id);
      if (user) {
        // Extract field updates from query
        const updates = {};
        if (queryText.includes('is_mobile_verified')) updates.is_mobile_verified = values[0];
        if (queryText.includes('is_email_verified')) updates.is_email_verified = values[0];
        
        const updated = { ...user, ...updates, updated_at: new Date() };
        users.set(id, updated);
        return { rows: [updated] };
      }
      return { rows: [] };
    }
    
    // SELECT company by owner
    if (queryText.includes('SELECT * FROM company_profile WHERE owner_id')) {
      const owner_id = values[0];
      const company = Array.from(companies.values()).find(c => c.owner_id === owner_id);
      return { rows: company ? [company] : [] };
    }
    
    // INSERT company
    if (queryText.includes('INSERT INTO company_profile')) {
      const company = {
        id: companyIdCounter++,
        owner_id: values[0],
        company_name: values[1],
        address: values[2],
        city: values[3],
        state: values[4],
        country: values[5],
        postal_code: values[6],
        website: values[7],
        logo_url: values[8],
        banner_url: values[9],
        industry: values[10],
        founded_date: values[11],
        description: values[12],
        social_links: values[13],
        created_at: new Date(),
        updated_at: new Date()
      };
      companies.set(company.id, company);
      return { rows: [company] };
    }
    
    // UPDATE company
    if (queryText.includes('UPDATE company_profile SET')) {
      const id = values[values.length - 1];
      const company = companies.get(id);
      if (company) {
        // Parse updates from values
        const fieldCount = values.length - 1;
        const updates = {};
        for (let i = 0; i < fieldCount; i++) {
          updates[`field${i}`] = values[i];
        }
        const updated = { ...company, ...updates, updated_at: new Date() };
        companies.set(id, updated);
        return { rows: [updated] };
      }
      return { rows: [] };
    }
    
    return { rows: [] };
  }
};

export default mockDb;
