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
    row?: number;
    column?: string;
    field?: string;
    value?: string;
    message: string;
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
    errorCount: number;
    errors: ValidationErrorDetail[];
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
