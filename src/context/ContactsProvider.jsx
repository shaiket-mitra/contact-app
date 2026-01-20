import { useEffect, useMemo, useState } from "react";
import { ContactsApi } from "../api/contactsApi";
import { ContactsContext } from "./ContactsContext";

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [sortMode, setSortMode] = useState("default");
  const [activeContact, setActiveContact] = useState(null);

  const [draft, setDraft] = useState(null);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalMode, setContactModalMode] = useState(null);
  const [contactModalContactId, setContactModalContactId] = useState(null);

  // ---------------- API ----------------
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await ContactsApi.list();
      setContacts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (payload) => {
    const created = await ContactsApi.create({
      ...payload,
      createdAt: new Date().toISOString(),
    });
    setContacts((prev) => [created, ...prev]);
    return created;
  };

  const updateContact = async (id, payload) => {
    const updated = await ContactsApi.update(id, payload);
    setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
    setActiveContact(updated);
    return updated;
  };

  const deleteContact = async (id) => {
    await ContactsApi.remove(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // ---------------- CONTACT FINDER ----------------
  const findContact = (contactOrId) => {
    const id =
      typeof contactOrId === "object" ? contactOrId?.id : contactOrId;
    return contacts.find((c) => String(c.id) === String(id)) || null;
  };

  // ---------------- MODAL HELPERS (SHOW/EDIT ONLY) ----------------
  const openShowContactModal = (contactOrId) => {
    const contact =
      typeof contactOrId === "object" ? contactOrId : findContact(contactOrId);
    if (!contact) return;

    setContactModalMode("show");
    setContactModalContactId(contact.id);
    setActiveContact(contact);
    setDraft(null);
    setIsContactModalOpen(true);
  };

  const openEditContactModal = (contactOrId) => {
    const contact =
      typeof contactOrId === "object" ? contactOrId : findContact(contactOrId);
    if (!contact) return;

    setContactModalMode("edit");
    setContactModalContactId(contact.id);
    setActiveContact(contact);

    setDraft({
      first_name: contact.first_name || "",
      last_name: contact.last_name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      address: contact.address || "",
    });

    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setContactModalMode(null);
    setContactModalContactId(null);
    setActiveContact(null);
    setDraft(null);
  };

  const submitEditContactModal = async () => {
    if (!draft) return;
    if (contactModalMode !== "edit") return;
    if (contactModalContactId == null) return;

    await updateContact(contactModalContactId, draft);
    closeContactModal();
  };

  // ---------------- SEARCH + FILTER ----------------
  const visibleContacts = useMemo(() => {
    let filtered = contacts;
    const q = searchText.trim().toLowerCase();

    if (q) {
      filtered = filtered.filter((c) =>
        [c.first_name, c.last_name, c.email, c.phone]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    const sorted = [...filtered];
    if (sortMode === "first_name") {
      sorted.sort((a, b) =>
        (a.first_name || "").localeCompare(b.first_name || "")
      );
    } else if (sortMode === "last_name") {
      sorted.sort((a, b) =>
        (a.last_name || "").localeCompare(b.last_name || "")
      );
    } else if (sortMode === "oldest") {
      sorted.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );
    } else {
      sorted.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    }

    return sorted;
  }, [contacts, searchText, sortMode]);

  // ---------------- CONTEXT VALUE ----------------
  const value = {
    contacts,
    visibleContacts,
    loading,

    searchText,
    setSearchText,
    sortMode,
    setSortMode,

    activeContact,
    setActiveContact,

    draft,
    setDraft,

    fetchContacts,
    addContact,
    updateContact,
    deleteContact,

    isContactModalOpen,
    contactModalMode,
    contactModalContactId,
    openShowContactModal,
    openEditContactModal,
    closeContactModal,
    submitEditContactModal,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}
