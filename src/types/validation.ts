import type React from "react";

export interface UploadBoxProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface RulesUploadBoxProps {
    rulesFile: File | null;
    setRulesFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface ValidationErrorDetail {
    sheet: string;
    cell?: string;
    field?: string;
    value?: string;
    message: string;
}

export interface SheetValidationSummary {
    sheetsChecked: number;
    presentSheets: string[];
    missingSheets: string[];
}

export interface FieldValidationSummary {
    passedFieldChecks: number;
    failedFieldChecks: number;
    passedFields: ValidationErrorDetail[];
    failedFields: ValidationErrorDetail[];
}

export interface FileValidationResult {
    fileName: string;
    fileType?: string;
    status: string;
    valid: boolean;
    message?: string;
    totalChecks: number;
    passedChecks: number;
    failedChecks: number;
    sheetValidations: SheetValidationSummary;
    fieldValidations: FieldValidationSummary;
}

export interface ValidationResponse {
    overallStatus: string;
    totalChecks: number;
    passedChecks: number;
    failedChecks: number;
    filesChecked: number;
    passedFiles: number;
    failedFiles: number;
    results: FileValidationResult[];
}
