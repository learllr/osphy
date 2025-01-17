import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import Body from "../common/Body.jsx";

export default function AccountManagement() {
  const { user, update } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newsletterAccepted: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        newsletterAccepted: user.newsletterAccepted || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update(user.id, formData);
  };

  return (
    <Body>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Mon compte</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block">
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block">
              Nom
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="newsletterAccepted" className="block">
              Accepter la newsletter
            </label>
            <input
              type="checkbox"
              id="newsletterAccepted"
              name="newsletterAccepted"
              checked={formData.newsletterAccepted}
              onChange={handleChange}
              className="border p-2"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2">
            Mettre à jour
          </button>
        </form>
      </div>
    </Body>
  );
}
