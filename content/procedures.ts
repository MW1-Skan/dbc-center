export type ProcedureKind = "laparoscopic" | "nonSurgical";

export type Procedure = {
  id: "sleeve" | "bypass" | "plication" | "balloon";
  kind: ProcedureKind;
  /** Detail pages do not exist yet. */
  href: "#";
};

export const procedures: readonly Procedure[] = [
  { id: "sleeve", kind: "laparoscopic", href: "#" },
  { id: "bypass", kind: "laparoscopic", href: "#" },
  { id: "plication", kind: "laparoscopic", href: "#" },
  { id: "balloon", kind: "nonSurgical", href: "#" },
] as const;

export type ProcedureId = Procedure["id"];
export const procedureIds = procedures.map((p) => p.id) as [ProcedureId, ...ProcedureId[]];
