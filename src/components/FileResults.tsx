import { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import type { ValidationResponse } from "../types/validation";

interface FileResultsProps {
    validationResponse: ValidationResponse;
    onReset: () => void;
}

const FileResults = ({ validationResponse, onReset }: FileResultsProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-xl font-semibold">By File</h3>
                    <p className="text-sm text-slate-500 mt-1">Review individual workbook scores and open detailed error diagnostics.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                        View Detailed Results
                    </Button>
                    <Button variant="contained" color="primary" onClick={onReset}>
                        Validate Another
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {validationResponse.results.map((file) => {
                    const statusClass = file.valid ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700";
                    return (
                        <Card key={file.fileName} className="p-4 bg-white rounded-3xl shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <div className="font-medium text-slate-800">{file.fileName}</div>
                                    <div className="text-sm text-slate-500">{file.fileType?.replace(/_/g, " ") ?? "Workbook"}</div>
                                    {!file.valid && file.message ? (
                                        <div className="text-sm text-rose-600 mt-1">{file.message}</div>
                                    ) : null}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}>{file.status}</div>
                                    <div className="text-sm text-slate-600">{file.passedChecks} of {file.totalChecks} checks passed</div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="lg">
                <DialogTitle>Detailed Validation Results</DialogTitle>
                <DialogContent dividers className="space-y-4">
                    {validationResponse.results.map((file) => (
                        <Accordion key={file.fileName} defaultExpanded={!file.valid} className="rounded-3xl border border-slate-200">
                            <AccordionSummary expandIcon={<span className="text-slate-500">▼</span>}>
                                <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <div className="font-semibold">{file.fileName}</div>
                                        <div className="text-sm text-slate-500">{file.fileType?.replace(/_/g, " ") ?? "Workbook"}</div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className={`rounded-full px-3 py-1 text-sm font-semibold ${file.valid ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{file.status}</div>
                                        <div className="text-sm text-slate-600">{file.passedChecks} / {file.totalChecks} checks passed</div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {file.errors.length === 0 ? (
                                    <div className="space-y-3">
                                        <div className="text-sm text-slate-600">No validation errors were reported for this file.</div>
                                        {file.message ? (
                                            <div className="text-sm text-rose-600">{file.message}</div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {file.errors.map((error, index) => (
                                            <Card key={`${file.fileName}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <div className="text-xs uppercase tracking-wide text-slate-500">Sheet</div>
                                                        <div className="text-sm text-slate-800">{error.sheet}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs uppercase tracking-wide text-slate-500">Cell</div>
                                                        <div className="text-sm text-slate-800">{error.column ?? "—"} {error.row ? `(${error.row})` : ""}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs uppercase tracking-wide text-slate-500">Field</div>
                                                        <div className="text-sm text-slate-800">{error.field ?? "—"}</div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-sm text-slate-700">
                                                    <div>
                                                        <span className="font-semibold">Message: </span>{error.message}
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className="font-semibold">Value: </span>{error.value || " "}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FileResults;
