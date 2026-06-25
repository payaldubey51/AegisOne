import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import L from "leaflet";

const socket = io("http://localhost:5000");

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
});

export default function Dashboard() {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [notifications, setNotifications] = useState(0);

  const load = async () => {
    const res = await axios.get("http://localhost:5000/alerts");
    setAlerts(res.data || []);
  };

  useEffect(() => {
    load();

    socket.on("new-alert", (alert) => {
      setNotifications((v) => v + 1);
      setAlerts((p) => [alert, ...p]);
    });

    socket.on("alert-updated", (updated) => {
      setAlerts((p) =>
        p.map((a) => (a._id === updated._id ? updated : a))
      );
    });

    return () => {
      socket.off("new-alert");
      socket.off("alert-updated");
    };
  }, []);

  const update = async (id, status) => {
    await axios.put(`http://localhost:5000/alerts/${id}`, {
      status,
      volunteer: "Volunteer A",
    });
  };

  const filtered = alerts.filter((a) => {
    const t = `${a.lat} ${a.lng}`.toLowerCase();
    return (
      t.includes(search.toLowerCase()) &&
      (filter === "ALL" || a.status === filter)
    );
  });

  const chartData = [
    { name: "Active", value: alerts.filter((a) => a.status === "ACTIVE").length },
    { name: "Assigned", value: alerts.filter((a) => a.status === "ASSIGNED").length },
    { name: "Resolved", value: alerts.filter((a) => a.status === "RESOLVED").length },
  ];

  return (
    <div style={styles.app}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>⚡ AegisOne</h2>

        <button style={styles.sideBtn}>📊 Dashboard</button>
        <button style={styles.sideBtn}>🚨 Alerts</button>
        <button style={styles.sideBtn}>🗺 Map</button>
        <button style={styles.sideBtn}>👥 Volunteers</button>

        <div style={{ marginTop: "auto" }}>
          <button
            style={styles.logout}
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h2 style={{ margin: 0 }}>Dashboard Overview</h2>
            <p style={styles.sub}>Live emergency monitoring system</p>
          </div>

          <div style={styles.badge}>
            🔔 {notifications} Alerts
          </div>
        </div>

        {/* FILTER BAR */}
        <div style={styles.filterBar}>
          <input
            placeholder="Search location..."
            style={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            style={styles.select}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>ALL</option>
            <option>ACTIVE</option>
            <option>ASSIGNED</option>
            <option>RESOLVED</option>
          </select>
        </div>

        {/* KPI */}
        <div style={styles.grid}>
          <KPI title="Total Alerts" value={alerts.length} />
          <KPI title="Active" value={chartData[0].value} />
          <KPI title="Assigned" value={chartData[1].value} />
          <KPI title="Resolved" value={chartData[2].value} />
        </div>

        {/* CHART + MAP */}
        <div style={styles.row}>

          <div style={styles.card}>
            <h3>Analytics</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.card}>
            <h3>Live Map</h3>
            <MapContainer center={[18.52, 73.85]} zoom={12} style={styles.map}>
              <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {filtered.map((a) => (
                <Marker
                  key={a._id}
                  position={[a.lat, a.lng]}
                  icon={markerIcon}
                >
                  <Popup>
                    <b>🚨 {a.status}</b>
                    <br />
                    {a.lat}, {a.lng}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

        </div>

        {/* ALERTS */}
        <div style={styles.alertGrid}>
          {filtered.map((a) => (
            <div
              key={a._id}
              style={styles.alert}
            >
              <div style={styles.alertTop}>
                <div>
                  <span style={styles.status(a.status)}>
                    {a.status}
                  </span>
                </div>

                <span style={styles.coords}>
                  {a.lat}, {a.lng}
                </span>
              </div>

              <div style={styles.btnRow}>
                <button
                  style={styles.accept}
                  onClick={() => update(a._id, "ASSIGNED")}
                >
                  Accept
                </button>

                <button
                  style={styles.resolve}
                  onClick={() => update(a._id, "RESOLVED")}
                >
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* KPI */
function KPI({ title, value }) {
  return (
    <div style={styles.kpi}>
      <h4 style={{ margin: 0, color: "#6b7280" }}>{title}</h4>
      <h2 style={{ margin: 0, color: "#dc2626" }}>{value}</h2>
    </div>
  );
}

/* ===== IMPROVED RESCUEX STYLE ===== */
const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "system-ui",
    background: "#f8fafc",
  },

  sidebar: {
    width: "230px",
    background: "white",
    borderRight: "1px solid #eee",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  logo: {
    color: "#dc2626",
    fontWeight: "900",
  },

  sideBtn: {
    background: "transparent",
    border: "none",
    textAlign: "left",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.2s",
  },

  logout: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sub: {
    margin: 0,
    fontSize: "13px",
    color: "#6b7280",
  },

  badge: {
    background: "#dc2626",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "20px",
  },

  filterBar: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  select: {
    padding: "10px",
    borderRadius: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "15px",
    marginTop: "15px",
  },

  kpi: {
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginTop: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  map: {
    height: "240px",
    borderRadius: "10px",
  },

  alertGrid: {
    marginTop: "15px",
    display: "grid",
    gap: "10px",
  },

  alert: {
    background: "#fff",
    padding: "14px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },

  alertTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  coords: {
    fontSize: "12px",
    color: "#6b7280",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  accept: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: "8px",
  },

  resolve: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: "8px",
  },

  status: (s) => ({
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    background:
      s === "ACTIVE"
        ? "#fee2e2"
        : s === "ASSIGNED"
        ? "#dbeafe"
        : "#dcfce7",
    color:
      s === "ACTIVE"
        ? "#dc2626"
        : s === "ASSIGNED"
        ? "#2563eb"
        : "#16a34a",
  }),
};