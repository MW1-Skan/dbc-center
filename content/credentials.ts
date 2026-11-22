/** Items in the navy "Trained & accredited" strip, in display order. */
export const trustItems = ["frcs", "ifso", "asmbs", "strasbourg", "qatar"] as const;

/** Credential bullets in the "Meet your surgeon" section, in display order. */
export const doctorCredentials = ["frcs", "qatar", "strasbourg", "memberships"] as const;

export const doctor = {
  id: "mohsen-karam",
  profileHref: "/doctor",
  certificatesHref: "/doctor#certificates",
} as const;

export type PublicationItem = {
  id: "p2020" | "p2018a" | "p2017d" | "p2017a" | "p2017b" | "p2017c" | "p2013";
  year: string;
  journal: string;
  doi: string;
  firstAuthor: boolean;
};

export const publications: readonly PublicationItem[] = [
  {
    id: "p2020",
    year: "2020",
    journal: "Surgical Innovation",
    doi: "10.1177/1553350620902550",
    firstAuthor: false,
  },
  {
    id: "p2018a",
    year: "2018",
    journal: "Obesity Surgery",
    doi: "10.1007/s11695-017-2813-4",
    firstAuthor: false,
  },
  {
    id: "p2017d",
    year: "2017",
    journal: "Surgery for Obesity and Related Diseases",
    doi: "10.1016/j.soard.2016.08.489",
    firstAuthor: false,
  },
  {
    id: "p2017a",
    year: "2017",
    journal: "Obesity Surgery",
    doi: "10.1007/s11695-016-2525-1",
    firstAuthor: false,
  },
  {
    id: "p2017b",
    year: "2017",
    journal: "Surgical Endoscopy",
    doi: "10.1007/s00464-017-5434-z",
    firstAuthor: false,
  },
  {
    id: "p2017c",
    year: "2017",
    journal: "Obesity Surgery",
    doi: "10.1007/s11695-017-2609-6",
    firstAuthor: false,
  },
  {
    id: "p2013",
    year: "2013",
    journal: "International Journal of Surgery Case Reports",
    doi: "10.1016/j.ijscr.2011.10.019",
    firstAuthor: true,
  },
] as const;

export const certificateItems = [
  { id: "frcsi", src: "/certificates/frcsi.jpg" },
  { id: "strasbourg", src: "/certificates/strasbourg.jpg" },
  { id: "qmi", src: "/certificates/qmi.jpg" },
  { id: "ifso", src: "/certificates/ifso.jpg" },
  { id: "asmbs", src: "/certificates/asmbs.jpg" },
  { id: "ircad", src: "/certificates/ircad.jpg" },
  { id: "endoscopy", src: "/certificates/endoscopy.jpg" },
  { id: "qrsc", src: "/certificates/qrsc.jpg" },
  { id: "nbc", src: "/certificates/nbc.jpg" },
  { id: "stars", src: "/certificates/stars.jpg" },
  { id: "ms", src: "/certificates/ms.jpg" },
  { id: "mbchb", src: "/certificates/mbchb.jpg" },
] as const;

export type CertificateId = (typeof certificateItems)[number]["id"];

/** Ordered keys for the profile page, matching `DoctorPage` in the messages. */
export const profile = {
  blocks: ["education", "training", "appointments", "memberships"],
  blockItems: {
    education: ["mbchb", "ms"],
    training: ["frcsi", "ircad", "strasbourg", "pancreatic", "endoscopy", "qmi"],
    appointments: ["hmc", "specialist", "consultant"],
    memberships: ["ifso", "asmbs"],
  },
  publications,
  presentations: ["aortogastric", "herniation", "abdominoplasty", "endobag"],
  teaching: ["rounds", "supervision", "instructor"],
  conferences: [
    "c2024",
    "c2023",
    "c2023q",
    "c2022",
    "c2019",
    "c2018",
    "c2017",
    "c2016",
    "c2015b",
    "c2015a",
    "c2014",
    "c2013",
  ],
  honours: ["nbc", "stars", "journalClub"],
  certificates: certificateItems,
  facts: ["procedures", "hmc", "bariatric", "papers"],
} as const;
