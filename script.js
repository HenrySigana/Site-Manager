const app = document.getElementById("app");

function showDashboard() {
  app.innerHTML = `
    <div class="card">
      <h3>Welcome to Site Manager</h3>
      <p>Use the sidebar to navigate between Dashboard, Patients, and Settings.</p>
    </div>
  `;
}

function showPatients() {
  app.innerHTML = `
    <h3>Patients List</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>John Doe</td><td>30</td><td>Active</td></tr>
        <tr><td>2</td><td>Jane Smith</td><td>25</td><td>Inactive</td></tr>
      </tbody>
    </table>
    <button class="primary" onclick="alert('Add Patient clicked')">Add Patient</button>
  `;
}

function showSettings() {
  app.innerHTML = `
    <div class="card">
      <h3>Settings</h3>
      <p>Configure your Site Manager here.</p>
    </div>
  `;
}

// Sidebar links
document.getElementById("dashboard-link").onclick = showDashboard;
document.getElementById("patients-link").onclick = showPatients;
document.getElementById("settings-link").onclick = showSettings;

// Load default
showDashboard();
