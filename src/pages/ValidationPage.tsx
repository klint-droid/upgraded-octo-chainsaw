import { useState } from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import ValidationSummary from "../components/ValidationSummary";
import FileResults from "../components/FileResults";
import type { FileValidationResult } from "../types/validation";
import { validateSingle } from "../services/validationService";

const ValidationPage = () => {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [rulesFile, setRulesFile] = useState<File | null>(null);
    const [validationResult, setValidationResult] = useState<FileValidationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isReady = Boolean(excelFile) && Boolean(rulesFile);

    const handleValidate = async () => {
        if (!isReady || !excelFile || !rulesFile) {
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);
        setValidationResult(null);

        try {
            const result = await validateSingle(excelFile, rulesFile);
            setValidationResult(result);
        } catch (error) {
            setErrorMessage("Validation failed to complete. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setExcelFile(null);
        setRulesFile(null);
        setValidationResult(null);
        setErrorMessage(null);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />

            <Container maxWidth="lg" className="pt-10 pb-10">
                <UploadSection
                    excelFile={excelFile}
                    setExcelFile={setExcelFile}
                    rulesFile={rulesFile}
                    setRulesFile={setRulesFile}
                    onValidate={handleValidate}
                    isLoading={isLoading}
                    isReady={isReady}
                />

                {errorMessage && (
                    <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
                        {errorMessage}
                    </div>
                )}

                {validationResult && (
                    <>
                        <ValidationSummary result={validationResult} />
                        <FileResults result={validationResult} onReset={handleReset} />
                    </>
                )}
            </Container>
        </div>
    );
};

export default ValidationPage;
