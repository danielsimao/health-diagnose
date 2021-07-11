export interface Condition {
  ICD_10: string;
  ICD_10_Description: string;
}

export interface Diagnoses {
  ehr: string;
  caseNumber: number;
  condition: string;
}
