/** Items in the navy "Trained & accredited" strip, in display order. */
export const trustItems = ["frcs", "ifso", "asmbs", "strasbourg", "qatar"] as const;

/** Credential bullets in the "Meet your surgeon" section, in display order. */
export const doctorCredentials = ["frcs", "qatar", "strasbourg", "memberships"] as const;

export const doctor = {
  id: "mohsen-karam",
  profileHref: "/doctor",
  certificatesHref: "/doctor#certificates",
} as const;

/** Ordered keys for the profile page, matching `DoctorPage` in the messages. */
export const profile = {
  blocks: ["education", "training", "appointments", "memberships"],
  blockItems: {
    education: ["mbchb", "ms"],
    training: ["frcsi", "strasbourg", "qmi"],
    appointments: ["hmc", "specialist", "consultant"],
    memberships: ["ifso", "asmbs"],
  },
  publications: ["p2020", "p2018a", "p2018b", "p2017a", "p2017b", "p2017c", "p2011"],
  presentations: ["aortogastric", "herniation", "abdominoplasty", "endobag"],
  teaching: ["rounds", "supervision", "instructor"],
  conferences: ["c2024", "c2023", "c2019", "c2018", "c2017", "c2016", "c2014", "c2013"],
  honours: ["nbc", "stars", "journalClub"],
  certificates: ["frcsi", "strasbourg", "qmi", "ms", "mbchb", "stars"],
  facts: ["hmc", "bariatric", "papers"],
} as const;
