import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import type { RulesUploadBoxProps } from "../../types/validation";

const RulesUploadBox = ({ rulesFile, setRulesFile }: RulesUploadBoxProps) => {
    const { getRootProps, getInputProps, open } = useDropzone({
        maxFiles: 1,
        noClick: true,
        accept: {
            "application/json": [".json"]
        },
        onDrop: (files: File[]) => {
            setRulesFile(files[0]);
        }
    });

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-slate-300 rounded-3xl p-5 min-h-[280px] bg-slate-50 hover:border-slate-400 transition cursor-pointer"
        >
            <input {...getInputProps()} />
            <div className="flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                        <div>
                            <h3 className="text-lg font-semibold">Validation rules</h3>
                            <p className="text-sm text-slate-500 mt-1">Drop a JSON file or click Browse.</p>
                        </div>
                        <Button variant="outlined" size="small" onClick={(event) => { event.stopPropagation(); open(); }}>
                            Browse
                        </Button>
                    </div>

                    {!rulesFile ? (
                        <div className="flex flex-1 flex-col items-center justify-center text-center text-slate-500 gap-2">
                            <div className="text-4xl">📘</div>
                            <div className="text-sm">Drag and drop or click to browse.</div>
                            <div className="text-xs text-slate-400">Accepts a single .json rules file.</div>
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="text-slate-700 font-medium">{rulesFile.name}</div>
                                    <div className="text-xs text-slate-500">JSON validation rules</div>
                                </div>
                                <button
                                    type="button"
                                    className="text-slate-500 hover:text-rose-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setRulesFile(null);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RulesUploadBox;
