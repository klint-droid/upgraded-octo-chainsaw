import type { FileValidationResult } from "../types/validation";
import { apiClient } from "./apiClient";

export async function validateSingle(
    excelFile: File,
    rulesFile: File
): Promise<FileValidationResult> {
    const formData = new FormData();

    formData.append("file", excelFile);
    formData.append("rules", rulesFile);

    const response = await apiClient.post<FileValidationResult>(
        "/api/excel/validate",
        formData
    );

    return response.data;
}
