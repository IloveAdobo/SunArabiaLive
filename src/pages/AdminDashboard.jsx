import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState("week");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New consultation request from TechFlow Solutions", time: "5 min ago", read: false },
    { id: 2, message: "Workshop booking: Global Dynamics Inc", time: "1 hour ago", read: false },
    { id: 3, message: "Monthly report ready for download", time: "3 hours ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const stats = [
    { label: "Total Clients", value: "124", change: "+12%", icon: "👥", color: "#C5A059" },
    { label: "Active Projects", value: "38", change: "+5%", icon: "⚡", color: "#E8CA8A" },
    { label: "Revenue (MTD)", value: "$847K", change: "+23%", icon: "💰", color: "#C5A059" },
    { label: "Conversion Rate", value: "14.2%", change: "+2.1%", icon: "📈", color: "#E8CA8A" },
  ];

  const recentConsultations = [
    { id: 1, name: "Khalid Al Mansouri", company: "TechFlow Solutions", email: "khalid@techflow.com", date: "2024-01-15", status: "pending" },
    { id: 2, name: "Sarah Johnson", company: "Global Dynamics Inc", email: "sarah@globaldynamics.com", date: "2024-01-14", status: "contacted" },
    { id: 3, name: "Michael Chen", company: "Enterprise Nexus", email: "michael@nexus.com", date: "2024-01-13", status: "completed" },
    { id: 4, name: "Emma Williams", company: "Apex Solutions", email: "emma@apex.com", date: "2024-01-12", status: "pending" },
  ];

  const performanceData = {
    weekly: { leads: 245, conversions: 35, revenue: 847000 },
    monthly: { leads: 982, conversions: 142, revenue: 3240000 },
    yearly: { leads: 11840, conversions: 1680, revenue: 38900000 },
  };

  const currentData = performanceData[dateRange];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0D0D0E", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');
        :root {
          --gold: #C5A059;
          --gold-light: #E8CA8A;
          --gold-dim: #7A6030;
          --obsidian: #1A1A1B;
          --flint: #4A4E51;
          --alabaster: #F7F7F7;
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 3px; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* SIDEBAR */}
      <div style={{
        width: sidebarCollapsed ? "80px" : "280px",
        background: "linear-gradient(180deg, #1A1A1B 0%, #0D0D0E 100%)",
        borderRight: "1px solid rgba(197,160,89,0.1)",
        transition: "width 0.3s ease",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        overflowX: "hidden",
        overflowY: "auto"
      }}>
        {/* Logo */}
        <div style={{
          padding: sidebarCollapsed ? "1.5rem 0" : "1.5rem 1.5rem",
          borderBottom: "1px solid rgba(197,160,89,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarCollapsed ? "center" : "space-between"
        }}>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "'Cormorant Garamond', serif" }}>
                Sun <span style={{ color: "var(--gold)" }}>Arabia</span>
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--flint)", letterSpacing: "2px", marginTop: "0.25rem" }}>ADMIN</div>
            </div>
          )}
          {sidebarCollapsed && (
            <div style={{ fontSize: "1.8rem", color: "var(--gold)" }}>◆</div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: "rgba(197,160,89,0.1)",
              border: "none",
              borderRadius: "8px",
              color: "var(--gold)",
              cursor: "pointer",
              padding: "0.5rem",
              fontSize: "1rem",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "1.5rem 0" }}>
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "clients", label: "Clients", icon: "👥" },
            { id: "consultations", label: "Consultations", icon: "📝" },
            { id: "workshops", label: "Workshops", icon: "🎯" },
            { id: "reports", label: "Reports", icon: "📄" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: sidebarCollapsed ? "0.875rem 0" : "0.875rem 1.5rem",
                margin: "0.25rem 0",
                cursor: "pointer",
                background: activeTab === item.id ? "rgba(197,160,89,0.1)" : "transparent",
                borderLeft: activeTab === item.id ? `3px solid var(--gold)` : "3px solid transparent",
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
              {!sidebarCollapsed && (
                <span style={{
                  fontSize: "0.85rem",
                  fontWeight: activeTab === item.id ? 500 : 400,
                  color: activeTab === item.id ? "var(--gold)" : "rgba(247,247,247,0.6)"
                }}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User section */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: sidebarCollapsed ? "1rem 0" : "1rem 1.5rem",
          borderTop: "1px solid rgba(197,160,89,0.1)",
          background: "#0D0D0E"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: sidebarCollapsed ? "center" : "flex-start" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem"
            }}>
              A
            </div>
            {!sidebarCollapsed && (
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>Admin User</div>
                <div style={{ fontSize: "0.7rem", color: "var(--flint)" }}>admin@sunarabia.com</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        marginLeft: sidebarCollapsed ? "80px" : "280px",
        transition: "margin-left 0.3s ease",
        padding: "1.5rem 2rem"
      }}>
        {/* TOP BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(197,160,89,0.1)"
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 600,
              margin: 0
            }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p style={{ color: "var(--flint)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
              Welcome back, Admin
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Date range selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                background: "rgba(247,247,247,0.05)",
                border: "1px solid rgba(197,160,89,0.2)",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                color: "#F7F7F7",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  background: "rgba(247,247,247,0.05)",
                  border: "1px solid rgba(197,160,89,0.2)",
                  borderRadius: "8px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                🔔
                {notifications.filter(n => !n.read).length > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "var(--gold)",
                    color: "#1A1A1B",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    fontSize: "0.7rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "0.5rem",
                  width: "300px",
                  background: "#1A1A1B",
                  border: "1px solid rgba(197,160,89,0.2)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                  zIndex: 200
                }}>
                  <div style={{ padding: "1rem", borderBottom: "1px solid rgba(197,160,89,0.1)" }}>
                    <strong>Notifications</strong>
                  </div>
                  {notifications.map(notif => (
                    <div key={notif.id} style={{
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid rgba(197,160,89,0.05)",
                      opacity: notif.read ? 0.6 : 1,
                      background: notif.read ? "transparent" : "rgba(197,160,89,0.05)"
                    }}>
                      <div style={{ fontSize: "0.8rem" }}>{notif.message}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--flint)", marginTop: "0.25rem" }}>{notif.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={() => window.location.href = "/login"}
              style={{
                background: "transparent",
                border: "1px solid rgba(197,160,89,0.3)",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                color: "var(--gold)",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "1px"
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ animation: "fadeInUp 0.4s ease" }}>
            {/* Stats Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              marginBottom: "2rem"
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  background: "#1A1A1B",
                  border: "1px solid rgba(197,160,89,0.1)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  transition: "transform 0.2s ease, border-color 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(197,160,89,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(197,160,89,0.1)";
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2rem" }}>{stat.icon}</span>
                    <span style={{ color: stat.change.startsWith("+") ? "#4ADE80" : "#EF4444", fontSize: "0.75rem", fontWeight: 500 }}>
                      {stat.change}
                    </span>
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.25rem" }}>{stat.value}</div>
                  <div style={{ color: "var(--flint)", fontSize: "0.8rem" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "1.5rem",
              marginBottom: "2rem"
            }}>
              {/* Performance Chart */}
              <div style={{
                background: "#1A1A1B",
                border: "1px solid rgba(197,160,89,0.1)",
                borderRadius: "16px",
                padding: "1.5rem"
              }}>
                <h3 style={{ marginBottom: "1.5rem", fontSize: "1rem", fontWeight: 500 }}>Performance Metrics</h3>
                <div style={{ display: "flex", justifyContent: "space-around", gap: "2rem" }}>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--flint)", marginBottom: "0.5rem" }}>LEADS</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--gold)" }}>{currentData.leads}</div>
                    <div style={{ height: "4px", background: "rgba(197,160,89,0.2)", borderRadius: "2px", marginTop: "0.5rem", overflow: "hidden" }}>
                      <div style={{ width: `${(currentData.leads / 2000) * 100}%`, height: "100%", background: "var(--gold)" }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--flint)", marginBottom: "0.5rem" }}>CONVERSIONS</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--gold-light)" }}>{currentData.conversions}</div>
                    <div style={{ height: "4px", background: "rgba(197,160,89,0.2)", borderRadius: "2px", marginTop: "0.5rem", overflow: "hidden" }}>
                      <div style={{ width: `${(currentData.conversions / 300) * 100}%`, height: "100%", background: "var(--gold-light)" }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--flint)", marginBottom: "0.5rem" }}>REVENUE</div>
                    <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--gold)" }}>${(currentData.revenue / 1000).toFixed(0)}K</div>
                    <div style={{ height: "4px", background: "rgba(197,160,89,0.2)", borderRadius: "2px", marginTop: "0.5rem", overflow: "hidden" }}>
                      <div style={{ width: `${(currentData.revenue / 50000000) * 100}%`, height: "100%", background: "var(--gold)" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{
                background: "#1A1A1B",
                border: "1px solid rgba(197,160,89,0.1)",
                borderRadius: "16px",
                padding: "1.5rem"
              }}>
                <h3 style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: 500 }}>Quick Stats</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div><span style={{ color: "var(--flint)" }}>Conversion Rate:</span> <strong>{(currentData.conversions / currentData.leads * 100).toFixed(1)}%</strong></div>
                  <div><span style={{ color: "var(--flint)" }}>Avg. Deal Size:</span> <strong>${Math.round(currentData.revenue / currentData.conversions).toLocaleString()}</strong></div>
                  <div><span style={{ color: "var(--flint)" }}>Client Satisfaction:</span> <strong>98%</strong> <span style={{ color: "#4ADE80" }}>↑</span></div>
                  <div><span style={{ color: "var(--flint)" }}>Retention Rate:</span> <strong>94%</strong></div>
                </div>
              </div>
            </div>

            {/* Recent Consultations */}
            <div style={{
              background: "#1A1A1B",
              border: "1px solid rgba(197,160,89,0.1)",
              borderRadius: "16px",
              padding: "1.5rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 500 }}>Recent Consultations</h3>
                <button onClick={() => setActiveTab("consultations")} style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--gold)",
                  fontSize: "0.75rem",
                  cursor: "pointer"
                }}>View All →</button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(197,160,89,0.1)", textAlign: "left" }}>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Name</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Company</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Date</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentConsultations.map(consult => (
                      <tr key={consult.id} style={{ borderBottom: "1px solid rgba(197,160,89,0.05)" }}>
                        <td style={{ padding: "0.75rem", fontSize: "0.85rem" }}>{consult.name}</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.85rem", color: "var(--gold)" }}>{consult.company}</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.85rem" }}>{consult.date}</td>
                        <td style={{ padding: "0.75rem" }}>
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            background: consult.status === "pending" ? "rgba(197,160,89,0.2)" : consult.status === "contacted" ? "rgba(59,130,246,0.2)" : "rgba(74,222,128,0.2)",
                            color: consult.status === "pending" ? "var(--gold)" : consult.status === "contacted" ? "#60A5FA" : "#4ADE80"
                          }}>
                            {consult.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONSULTATIONS TAB */}
        {activeTab === "consultations" && (
          <div style={{ animation: "fadeInUp 0.4s ease" }}>
            <div style={{
              background: "#1A1A1B",
              border: "1px solid rgba(197,160,89,0.1)",
              borderRadius: "16px",
              padding: "1.5rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 500 }}>All Consultations</h3>
                <button style={{
                  background: "rgba(197,160,89,0.1)",
                  border: "1px solid rgba(197,160,89,0.2)",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  color: "var(--gold)",
                  fontSize: "0.75rem",
                  cursor: "pointer"
                }}>Export CSV</button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(197,160,89,0.1)", textAlign: "left" }}>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>ID</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Name</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Company</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Email</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Date</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Status</th>
                      <th style={{ padding: "0.75rem", fontSize: "0.7rem", color: "var(--flint)", fontWeight: 400 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...recentConsultations, 
                      { id: 5, name: "James Wilson", company: "Innovate Corp", email: "james@innovate.com", date: "2024-01-11", status: "pending" },
                      { id: 6, name: "Maria Garcia", company: "Creative Labs", email: "maria@creativelabs.com", date: "2024-01-10", status: "contacted" },
                    ].map(consult => (
                      <tr key={consult.id} style={{ borderBottom: "1px solid rgba(197,160,89,0.05)" }}>
                        <td style={{ padding: "0.75rem", fontSize: "0.8rem", color: "var(--flint)" }}>#{consult.id}</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.85rem" }}>{consult.name}</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.85rem", color: "var(--gold)" }}>{consult.company}</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.8rem", color: "var(--flint)" }}>{consult.email}</td>
                        <td style={{ padding: "0.75rem", fontSize: "0.8rem" }}>{consult.date}</td>
                        <td style={{ padding: "0.75rem" }}>
                          <select value={consult.status} style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            background: "rgba(247,247,247,0.05)",
                            border: "1px solid rgba(197,160,89,0.2)",
                            color: "#F7F7F7"
                          }}>
                            <option>pending</option>
                            <option>contacted</option>
                            <option>completed</option>
                            <option>archived</option>
                          </select>
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <button style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--gold)",
                            cursor: "pointer",
                            fontSize: "0.8rem"
                          }}>✎</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PLACEHOLDER FOR OTHER TABS */}
        {(activeTab === "clients" || activeTab === "workshops" || activeTab === "reports" || activeTab === "settings") && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            background: "#1A1A1B",
            border: "1px solid rgba(197,160,89,0.1)",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔧</div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
              <p style={{ color: "var(--flint)" }}>This section is under development</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}