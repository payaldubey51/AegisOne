import AlertMap from "./AlertMap";
import { useEffect, useState } from "react";
import axios from "axios";

function Volunteer() {
  const [alerts, setAlerts] = useState([]);

  // Load alerts from backend
  const loadAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/alerts");
      setAlerts(res.data.alerts);
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  };

  // Accept alert
  const acceptAlert = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/alerts/${id}/accept`,
        {
          responder: "Volunteer-1",
        }
      );

      loadAlerts();
    } catch (error) {
      console.error("Error accepting alert:", error);
    }
  };

  // Mark alert as resolved
  const closeAlert = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/alerts/${id}/close`
      );

      loadAlerts();
    } catch (error) {
      console.error("Error closing alert:", error);
    }
  };

  useEffect(() => {
    loadAlerts();

    const interval = setInterval(loadAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#dc2626",
          marginBottom: "30px",
        }}
      >
        Volunteer Dashboard
      </h1>

      {alerts.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No emergency alerts found.
        </p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>Latitude:</strong> {alert.lat}
            </p>

            <p>
              <strong>Longitude:</strong> {alert.lng}
            </p>

            <p>
              <strong>Status:</strong> {alert.status}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {new Date(alert.time).toLocaleString()}
            </p>

            {/* Map */}
            <AlertMap
              lat={alert.lat}
              lng={alert.lng}
            />

            <div style={{ marginTop: "15px" }}>
              {alert.status === "ACTIVE" && (
                <button
                  onClick={() => acceptAlert(alert._id)}
                  style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Accept Alert
                </button>
              )}

              {alert.status === "ASSIGNED" && (
                <div>
                  <p>
                    <strong>Assigned To:</strong>{" "}
                    {alert.responder}
                  </p>

                  <button
                    onClick={() => closeAlert(alert._id)}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Mark Resolved
                  </button>
                </div>
              )}

              {alert.status === "RESOLVED" && (
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  ✅ Incident Resolved
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Volunteer;