import { Button, Card } from "@mui/material";
import ExcelUploadBox from "./validation/ExcelUploadBox";
import RulesUploadBox from "./validation/RulesUploadBox";
import type { RulesUploadBoxProps } from "../types/validation";

interface UploadSectionProps extends RulesUploadBoxProps {
    excelFile: File | null;
    setExcelFile: React.Dispatch<React.SetStateAction<File | null>>;
    onValidate: () => void;
    isLoading: boolean;
    isReady: boolean;
}

const UploadSection = ({
    excelFile,
    setExcelFile,
    rulesFile,
    setRulesFile,
    onValidate,
    isLoading,
    isReady
}: UploadSectionProps) => {
    return (
        <Card className="bg-white mt-6 p-6 rounded-3xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-semibold">Validate release document</h2>
                    <p className="text-slate-600 mt-2 max-w-2xl">
                        Upload an Excel workbook and a validation rules JSON file. The system will automatically detect the document type and apply the matching validation rules.
                    </p>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!isReady || isLoading}
                    onClick={onValidate}
                    className="h-12"
                >
                    {isLoading ? "Validating…" : "Validate Document"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ExcelUploadBox file={excelFile} setFile={setExcelFile} />
                <RulesUploadBox rulesFile={rulesFile} setRulesFile={setRulesFile} />
            </div>
        </Card>
    );
};

export default UploadSection;
