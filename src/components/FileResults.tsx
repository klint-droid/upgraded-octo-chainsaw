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
    DialogTitle,
    Tabs,
    Tab,
    Box
} from "@mui/material";
import type { ValidationResponse } from "../types/validation";

interface FileResultsProps {
    validationResponse: ValidationResponse;
    onReset: () => void;
}

import type { FileValidationResult } from "../types/validation";

const FileAccordion = ({ file }: { file: FileValidationResult }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Accordion defaultExpanded={!file.valid} className="rounded-3xl border border-slate-200">
            <AccordionSummary expandIcon={<span className="text-slate-500">▼</span>}>
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <div className="font-semibold">{file.fileName}</div>
                            <div className="text-sm text-slate-500">{file.fileType?.replace(/_/g, " ") ?? "Workbook"}</div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className={`rounded-full px-3 py-1 text-sm font-semibold ${file.valid ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{file.status}</div>
                            <div className="text-sm text-slate-600">{file.passedChecks} / {file.totalChecks} checks passed</div>
                        </div>
                    </div>
                    
                    {/* Sheet Indicators directly below the file name */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mr-2">Sheets:</span>
                        {file.sheetValidations.presentSheets.map((sheet) => (
                            <span key={sheet} className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                                {sheet}
                            </span>
                        ))}
                        {file.sheetValidations.missingSheets.map((sheet) => (
                            <span key={sheet} className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                                {sheet} (Missing)
                            </span>
                        ))}
                        {file.sheetValidations.sheetsChecked === 0 && (
                            <span className="text-xs text-slate-400 italic">No required sheets configured</span>
                        )}
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabIndex} onChange={(_, nv) => setTabIndex(nv)} aria-label="validation tabs">
                        <Tab label={`Failed Fields (${file.fieldValidations.failedFieldChecks})`} />
                        <Tab label={`Passed Fields (${file.fieldValidations.passedFieldChecks})`} />
                    </Tabs>
                </Box>
                
                {tabIndex === 0 && (
                    <div className="pt-5 space-y-4">
                        {file.fieldValidations.failedFields.length === 0 ? (
                            <div className="text-sm text-slate-600 py-2">No failed field validations.</div>
                        ) : (
                            file.fieldValidations.failedFields.map((error, index) => (
                                <Card key={index} className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 shadow-none">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-xs uppercase tracking-wide text-rose-500">Sheet</div>
                                            <div className="text-sm font-medium text-slate-800">{error.sheet}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-wide text-rose-500">Cell</div>
                                            <div className="text-sm font-medium text-slate-800">{error.cell ?? "—"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-wide text-rose-500">Field</div>
                                            <div className="text-sm font-medium text-slate-800">{error.field ?? "—"}</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-slate-700 bg-white p-3 rounded-lg border border-rose-100">
                                        <div><span className="font-semibold text-rose-700">Error: </span><span>{error.message}</span></div>
                                        <div className="mt-2 text-slate-600">
                                            <span className="font-semibold">Value found: </span>
                                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs text-rose-900 border border-slate-200">{error.value || " "}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {tabIndex === 1 && (
                    <div className="pt-5 space-y-4">
                        {file.fieldValidations.passedFields.length === 0 ? (
                            <div className="text-sm text-slate-600 py-2">No passed field validations.</div>
                        ) : (
                            file.fieldValidations.passedFields.map((pass, index) => (
                                <Card key={index} className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 shadow-none">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-xs uppercase tracking-wide text-emerald-600/70">Sheet</div>
                                            <div className="text-sm font-medium text-emerald-900">{pass.sheet}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-wide text-emerald-600/70">Cell</div>
                                            <div className="text-sm font-medium text-emerald-900">{pass.cell ?? "—"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase tracking-wide text-emerald-600/70">Field</div>
                                            <div className="text-sm font-medium text-emerald-900">{pass.field ?? "—"}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-sm bg-white p-3 rounded-lg border border-emerald-100">
                                        <div><span className="font-semibold text-emerald-700">Result: </span><span className="text-emerald-800">{pass.message}</span></div>
                                        <div className="mt-2 text-slate-600">
                                            <span className="font-semibold">Value found: </span>
                                            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs text-emerald-900 border border-slate-200">{pass.value || " "}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

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
                        <FileAccordion key={file.fileName} file={file} />
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
