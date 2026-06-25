import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";

function Profile() {
  const [contacts, setContacts] =
    useState([]);

  const [name, setName] =
    useState(
      localStorage.getItem(
        "name"
      ) || "User"
    );

  const [avatar, setAvatar] =
    useState(
      localStorage.getItem(
        "avatar"
      ) || ""
    );

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      relation: "",
    });

  const load = async () => {
    try {
      const res =
        await axios.get(
          "http://localhost:5000/contacts"
        );

      setContacts(
        res.data || []
      );
    } catch {
      alert(
        "Failed to load contacts"
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saveProfile = () => {
    localStorage.setItem(
      "name",
      name
    );

    localStorage.setItem(
      "avatar",
      avatar
    );

    alert(
      "Profile Updated"
    );
  };

  const saveContact =
    async () => {
      try {
        if (
          !form.name ||
          !form.phone ||
          !form.relation
        ) {
          return alert(
            "Fill all fields"
          );
        }

        await axios.post(
          "http://localhost:5000/contacts",
          form
        );

        setForm({
          name: "",
          phone: "",
          relation: "",
        });

        load();
      } catch {
        alert(
          "Save Failed"
        );
      }
    };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <Navbar />

      <div style={styles.grid}>
        {/* PROFILE */}
        <div
          style={
            styles.profileCard
          }
        >
          <img
            src={
              avatar ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="avatar"
            style={
              styles.avatar
            }
          />

          <h2>
            {name}
          </h2>

          <input
            style={
              styles.input
            }
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) =>
              setAvatar(
                e.target.value
              )
            }
          />

          <input
            style={
              styles.input
            }
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <button
            style={
              styles.button
            }
            onClick={
              saveProfile
            }
          >
            Save Profile
          </button>
        </div>

        {/* CONTACTS */}
        <div
          style={
            styles.contactCard
          }
        >
          <h2>
            📞 Emergency
            Contacts
          </h2>

          <input
            style={
              styles.input
            }
            placeholder="Name"
            value={
              form.name
            }
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target
                    .value,
              })
            }
          />

          <input
            style={
              styles.input
            }
            placeholder="Phone"
            value={
              form.phone
            }
            onChange={(e) =>
              setForm({
                ...form,
                phone:
                  e.target
                    .value,
              })
            }
          />

          <input
            style={
              styles.input
            }
            placeholder="Relation"
            value={
              form.relation
            }
            onChange={(e) =>
              setForm({
                ...form,
                relation:
                  e.target
                    .value,
              })
            }
          />

          <button
            style={
              styles.button
            }
            onClick={
              saveContact
            }
          >
            Add Contact
          </button>

          <div
            style={{
              marginTop:
                20,
            }}
          >
            {contacts.map(
              (
                c,
                i
              ) => (
                <div
                  key={i}
                  style={
                    styles.card
                  }
                >
                  <h4>
                    📞{" "}
                    {
                      c.name
                    }
                  </h4>

                  <p>
                    {
                      c.phone
                    }
                  </p>

                  <small>
                    {
                      c.relation
                    }
                  </small>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight:
      "100vh",

    padding: 30,

    background:
      "linear-gradient(135deg,#fff1f2,#ffe4e6)",
  },

  grid: {
    marginTop: 30,

    display: "grid",

    gridTemplateColumns:
      "1fr 1fr",

    gap: 25,
  },

  profileCard: {
    background:
      "white",

    padding: 30,

    borderRadius: 20,

    textAlign:
      "center",
  },

  contactCard: {
    background:
      "white",

    padding: 30,

    borderRadius: 20,
  },

  avatar: {
    width: 130,

    height: 130,

    borderRadius:
      "50%",

    objectFit:
      "cover",

    marginBottom:
      20,
  },

  card: {
    background:
      "#fff5f5",

    padding: 16,

    borderRadius: 14,

    marginBottom:
      12,
  },

  input: {
    width: "100%",

    padding: 14,

    marginBottom: 14,

    borderRadius: 12,

    border:
      "1px solid #ddd",

    boxSizing:
      "border-box",
  },

  button: {
    width: "100%",

    padding: 15,

    background:
      "#dc2626",

    color: "white",

    border: "none",

    borderRadius: 12,

    cursor:
      "pointer",
  },
};

export default Profile;