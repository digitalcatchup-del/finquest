/**
 * BUTTERFLY DYNAMIX ERP - CORE APPLICATION LOGIC
 * Modules: Procurement, Sales, Inventory, Finance, HR, AI, Collaboration
 */

// --- GLOBAL STATE & CONFIG ---
const APP_CONFIG = {
  currency: 'NGN',
  dateFormat: 'DD/MM/YYYY',
  version: '4.0.0-enterprise'
};

let currentUser = null;
let currentBusiness = null;
let activeModule = 'dashboard';

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🦋Butterfly Dynamix ERP Initializing...');

  // Mock Auth for Demo (Replace with real Supabase Auth in production)
  // In real app: const { { user} } = await supabase.auth.getUser();
  currentUser = {
    id: 'demo-user-1',
    name: 'Admin User',
    businessId: 'demo-biz-1',
    role: 'owner'
  };

  initNavigation();
  loadDashboard();
  setupEventListeners();
});

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const module = link.dataset.module;
      if(module) {
        activeModule = module;
        loadModule(module);
        updateActiveNav(link);
      }
   });
  });
}

function updateActiveNav(activeLink) {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}

  // --- MODULE LOADER ROUTER ---
  async function loadModule(moduleName) {
    const container = document.getElementById('app-content');
    if(!container) return;

  container.innerHTML = '<div class="loading-spinner">Loading Module...</div>';

  try {
    switch(moduleName) {
      case 'dashboard':
        loadDashboard();
        break;
        case 'procurement':
          renderProcurement(container);
          break;
          case 'sales':
            renderSales(container);
            break;
            case 'inventory':
              renderInventory(container);
              break;
              case 'finance':
                renderFinance(container);
                break;
                case 'hr':
                  renderHR(container);
                  break;
                  case 'intelligence':
                  renderIntelligence(container);
                  break;
                  default:
                    container.innerHTML = '<h2>Module Not Found</h2>';
    }
  } catch (error) {
    console.error(`Error loading ${moduleName}:`, error);
    container.innerHTML = `<div class="error-msg">Failed to load ${moduleName}. Please refresh.</div>`;
    }
  }
    
// --- DASHBOARD MODULE ---
function loadDashboard() {
  const container = document.getElementById('app-content');
  if(!container) return;

  const html = `
   <div class="erp-dashboard">
    <header class="dash-header">
      <h1>Welcome back, ${currentUser.name}</h1>
      <div class="dash-actions">
        <button class="btn btn-primary" onclick="alert('Syncing Data...')">🔄️ Sync</button>
        <button class="btn btn-secondary" onclick="alert('Exporting Report...')">📥 Export</button>
        </div>
        </header>

        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">Total Revenue (MTD)</span>
            <span class="kpi-value"> ₦ 4,250,000</span>
            <span class="kpi-trend up"> ↑ 12% vs last month</span>
            </div>
            <div class="kpi-card">
              <span class="kpi-label">Outstanding Invoices</span>
              <span class="kpi-value">₦ 850,000</span>
              <span class="kpi-trend down">↓ 5% vs last month</span>
              </div>
              <div class="kpi-card">
                <span class="kpi-label">Low Stock Items</span>
                <span class="kpi-value alert">12 Items</span>
                <span class="kpi-trend neutral">Action Required</span>
                </div>
                <div class="kpi-card">
                  <span class="kpi-label">Pending Approvals</span>
                  <span class="kpi-value">3 POs</span>
                  <span class="kpi-trend neutral">Review Needed</span>
                  </div>
                  </div>

                  <div class="dash-grid-2">
                    <div class="card">
                      <h3>📈 Cash Flow Trend</h3>
                      <div class="chart-placeholder" style="height:200px; background:#f5f5f5; display:flex; align-items:center; justify-content:center; color:#888;">
                        [Chart.js Visualization Here]
                        </div>
                        </div>
                        <div class="card">
                          <h3>🔔 Recent Activity</h3>
                          <ul class="activity-list">
                            <li><span class="dot green"></span> Invoice #INV-001 paid by Client A</li>
                            <li><span class="dot blue"></span> PO #PO-005 approved by Manager</li>
                            <li><span class="dot red"></span> Stock Alert: Laptop Dell XPS low (2 left) </li>
                            <li><span class="dot gray"></span> New employee added: John Doe</li>
                            </ul>
                            </div>
                            </div>
                            </div>
                            `;
                            container.innerHTML = html;
}

// --- PROCUREMENT MODULE (PO & GRN) ---
function renderProcurement(container) {
  container.innerHTML =
  `<div class="module-header">
    <h2>🛒Procurement</h2>
    <button class="btn btn-primary" onclick="openModal('po-modal')">+ New Purchase Order</button>
  </div>

  <div class="tabs">
    <button class="tab active" onclick="switchTab('po-list')">Purchase Orders</button>
    <button class="tab" onclick="switchTab('grn-list')">Goods Receipt (GRN) </button>
    <button class="tab" onclick="switchTab('suppliers')">Suppliers</button>
  </div>

  <div id="po-list" class="tab-content active">
    <table class="data-table">
      <thead>
        <tr> <th>PO Number</th><th>Supplier</th><th>Date</th><th>Status</th><th>Total</th><th>Actions</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PO-2024-001</td>
          <td>Tech Distributors Ltd</td>
          <td>Oct 24, 2024</td>
          <td><span class="badge badge-warning">Pending Approval</span></td>
          <td>₦1,200,000</td>
          <td><button class="btn-sm">View</button></td>
        </tr>
        <tr>
        <td>PO-2024-002</td>
        <td>Office Supplies Co</td>
        <td>Oct 22, 2024</td>
        <td><span class="badge badge-success">Received</span></td>
        <td>₦450,000</td>
        <td><button class="btn-sm">View</button></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="grn-list" class="tab-content">
    <p>Goods Receipt Notes will appear here linked to POs.</p>
    <button class="btn btn-secondary" onclick="alert('Open GRN Creator')"> Record Goods Receipt</button>
  </div>

  <div id="suppliers" class="tab-content">
    <p>Suppliers Management Interface</p>
  </div>
  `;
}

// --- SALES MODULE (SO & Invoice, Delivery) ---
function renderSales(container) {
  container.innerHTML =
  `<div class="module-header">
    <h2>💰Sales & Distribution</h2>
    <button class="btn btn-primary" onclick="openModal('invoice-modal')">+ New Invoice</button>
  </div>

  <div class="tabs">
    <button class="tab active" onclick="switchTab('invoice-list')">Invoices</button>
    <button class="tab" onclick="switchTab('so-list')">Sales Orders</button>
    <button class="tab" onclick="switchTab('customer-list')">Customers</button>
    <button class="tab" onclick="switchTab('delivery-list')">Deliveries</button>
  </div>

  <div class="card mt-4">
    <h3>Recent Invoices</h3>
    <table class="data-table">
      <thead>
      <tr><th>Invoice #</th><th>Customer</th><th>Due Date</th><th>Status</th><th>Amount</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>INV-2024-088</td>
          <td>Global Tech Solutions</td>
          <td>Nov 01, 2024</td>
          <td><span class="badge badge-success">Paid</span></td>
          <td>₦3,500,000</td>
          <td><button class="btn-sm" onclick="alert('Open Payment Gateway Link')">Pay Now</button></td>
        </tr>
        <tr>
          <td>INV-2024-089</td>
          <td>StartUp Inc</td>
          <td>Nov 05, 2024</td>
          <td><span class="badge badge-warning">Pending</span></td>
          <td>₦1,200,000</td>
          <td><button class="btn-sm" onclick="alert('Send WhatsApp Reminder')">WhatsApp</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  `;
}

// --- INVENTORY & WAREHOUSE MODULE ---
function renderInventory(container) {
  container.innerHTML = `
  <div class="module-header">
    <h2>📦 Inventory & Warehouse </h2>
    <div class="actions">
      <button class="btn btn-secondary">Stock Count</button>
      <button class="btn btn-primary">+Add Product</button>
    </div>
  </div>

  <div class="kpi-grid small">
  <div class="kpi-card"><span class="kpi-label">Total Value</span><span class="kpi-value">₦ 12.5M</span></div>
  <div class="kpi-card"><span class="kpi-label">Low Stock</span> <span class="kpi-value alert">12</span></div>
  <div class="kpi-card"><span class="kpi-label">Out of Stock</span><span class="kpi-value danger">3</span></div>
</div><div class="card mt-4">
    <h3>Stock Levels (Main Warehouse)</h3>
    <input type="text" placeholder="Search by Name, SKU, or Barcode..." class="search-bar" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ddd; border-radius:4px;">
      <table class="data-table">
        <thead>
          <tr><th>SKU</th><th>Product Name</th><th>Category</th><th>In Stock</th><th>Value</th><th>Status</th></tr>
          </thead>
        <tbody>
          <tr>
            <td>DELL-XPS-15</td>
            <td>Dell XPS 15 Laptop</td>
            <td>Electronics</td>
            <td>2</td>
            <td>₦ 2,400,000</td>
            <td><span class="badge badge-danger">Low Stock</span></td>
            </tr>
          <tr>
            <td>LOG-MX-MASTER</td>
            <td>Logitech MX Master 3</td>
            <td>Accessories</td>
            <td>45</td>
            <td>₦ 4,500,000</td>
            <td><span class="badge badge-success">Healthy</span></td>
            </tr>
          </tbody>
        </table>
      </div>
  `;
}

// --- FINANCE MODULE (GL, Reports) ---
function renderFinance(container) {
  container.innerHTML = `
  <div class="module-header">
      <h2>🏦 Finance & Accounting</h2>
      <button class="btn btn-primary" onclick="alert('Generate Report')">Download P&L </button>
    </div>
    <div class="tabs">
        <button class="tab active">Dashboard</button>
        <button class="tab">General Ledger</button>
        <button class="tab">Reports</button>
        <button class="tab">Bank Rec</button>
      </div>
      
      <div class="dash-grid-2 mt-4">
        <div class="card">
          <h3>Profit & Loss (Current Month)</h3>
          <div class="pl-row"><span>Revenue</span><span>₦ 4,250,000</span></div>
          <div class="pl-row"><span>COGS</span><span>₦ 2,100,000</span></div>
          <div class="pl-row total"><span>Gross Profit</span><span>₦2,150,000</span></div>
          <div class="pl-row"><span>Expenses</span><span>(₦ 800,000)</span></div>
          <div class="pl-row total"><span>Net Income</span><span>₦ 1,350,000</span></div>
        </div>
        <div class="card">
          <h3>Balance Sheet Snapshot</h3>
          <p><strong>Assets:</strong> ₦ 15,000,000</p>
          <p><strong>Liabilities:</strong> ₦ 4,000,000</p>
          <p><strong>Equity:</strong> ₦ 11,000,000</p>
        </div>
      </div>
  `;
}

// --- HR & PAYROLL MODULE ---
function renderHR(container) {
  container.innerHTML = `
  <div class="module-header">
   <h2>👥 Human Resources</h2>
   <button class="btn btn-primary"> + Add Employee</button>
   </div>

   <div class="tabs">
   <button class="tab active">Employees</button>
   <button class="tab">Payroll</button>
   <button class="tab">Attendance</button>
   <button class="tab"> Recruitment</button>
   </div>
   
   <div class="card mt-4">
   <h3>Employee Directory</h3>
   <table class="data-table">
   <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Status</th><th>Action</th></tr></thead>
   <tbody>
   <tr><td>John Doe</td><td>Sales Manager</td><td>Sales</td><td>Active</td><td>View</td></tr>
   <tr><td>Jane Smith</td><td>Accountant</td><td>Finance</td><td>Active</td><td>View</td></tr>
   </tbody>
   </table>
   </div>
  `;
}

// --- AI INTELLIGENCE MODULE ---
function renderIntelligence(container) {
  container.innerHTML = `
    <div class="module-header">
      <h2>🧠 AI Intelligence Hub</h2>
      <button class="btn btn-primary" onclick="alert('Ask AI anything...')">💬 Ask AI Assistant</button>
    </div>
    <div class="dash-grid-2 mt-4">
      <div class="card ai-card">
        <h3>🔮 Demand Forecasting</h3>
        <p>Based on historical sales, demand for <strong>Laptop Dell XPS</strong> is predicted to rise 20% next.</p>
        <button class="btn-sm btn-primary">Create Reorder PO</button>
      </div>
      <div class="card ai-card">
        <h3>⚠️ Anomaly Detection</h3>
        <p>Unusual expense detected in <strong>Travel Category</strong> (₦500k vs avg ₦50k).</p>
        <button class="btn-sm btn-warning">Review Transaction</button>
      </div>
    </div>
    <div class="card mt-4">
      <h3>📚 Knowledge Base Search</h3>
      <input type="text" placeholder="Ask about company policies, past invoices, or procedures..." class="search-bar" style="width:100%; padding:10px;">
    </div>
  `;
}
// --- EVENT LISTENERS & UTILITIES ---
function switchTab(tabId, clickedTab = null) {
  // Simple tab switching logic for demo
  const tabContentBlocks = document.querySelectorAll('.tab-content');
  tabContentBlocks.forEach((el) => {
    el.style.display = el.id === tabId ? 'block' : 'none';
  });

  const tabs = document.querySelectorAll('.tab');
  if (clickedTab) {
    tabs.forEach((el) => el.classList.toggle('active', el === clickedTab));
  } else {
    tabs.forEach((el) => {
      const onclickValue = el.getAttribute('onclick') || '';
      const isActive = onclickValue.includes(`'${tabId}'`) || onclickValue.includes(`"${tabId}"`);
      el.classList.toggle('active', isActive);
    });
  }
}

function openModal(modalId) {
  alert(`Opening Modal: ${modalId}. \n(In full implementation, this renders a form overlay)`);
}

function setupEventListeners() {
  if (window.__butterflyTabsBound) return;

  document.addEventListener('click', (event) => {
    const tabButton = event.target.closest('.tab');
    if (!tabButton) return;

    const onclickValue = tabButton.getAttribute('onclick') || '';
    const match = onclickValue.match(/['"]([^'"]+)['"]/);
    const tabId = match ? match[1] : null;

    if (tabId) switchTab(tabId, tabButton);
  });

  window.__butterflyTabsBound = true;
  console.log('Event Listeners attached');
}
console.log('✅ Bookkeeping App Logic Loaded Successfully');