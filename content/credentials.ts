/** Items in the navy "Trained & accredited" strip, in display order. */
export const trustItems = ["frcs", "ifso", "asmbs", "strasbourg", "qatar"] as const;

/** Credential bullets in the "Meet your surgeon" section, in display order. */
export const doctorCredentials = ["frcs", "qatar", "strasbourg", "memberships"] as const;

export const doctor = {
  id: "mohsen-karam",
  /** Profile and certificate pages do not exist yet. */
  profileHref: "#",
  certificatesHref: "#",
} as const;
