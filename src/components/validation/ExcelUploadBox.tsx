import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import type { UploadBoxProps } from "../../types/validation";

const ExcelUploadBox = ({ files, setFiles }: UploadBoxProps) => {
    const onDrop = (acceptedFiles: File[]) => {
        const deduplicated = acceptedFiles.filter(
            file => !files.some(existing => existing.name === file.name)
        );
        if (deduplicated.length > 0) {
            setFiles(prev => [...prev, ...deduplicated]);
        }
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            "application/vnd.ms-excel": [".xls"]
        }
    });

    const removeFile = (fileName: string) => {
        setFiles(prev => prev.filter(file => file.name !== fileName));
    };

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-slate-300 rounded-3xl p-5 min-h-[280px] bg-slate-50 hover:border-slate-400 transition cursor-pointer"
        >
            <input {...getInputProps()} />
            <div className="flex flex-col h-full">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Excel documents</h3>
                        <p className="text-sm text-slate-500 mt-1">Drag and drop files or click Add files.</p>
                    </div>
                    <Button variant="outlined" size="small" onClick={(event) => { event.stopPropagation(); open(); }}>
                        Add files
                    </Button>
                </div>
                {files.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center text-slate-500 gap-2">
                        <div className="text-4xl">📄</div>
                        <div className="text-sm">Drag and drop or click to browse.</div>
                        <div className="text-xs text-slate-400">Accepts .xlsx and .xls files.</div>
                    </div>
                ) : (
                    <div className="space-y-3 overflow-y-auto pb-2">
                        {files.map((file) => (
                            <div key={file.name} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3 border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">📄</span>
                                    <div>
                                        <div className="font-medium text-slate-700">{file.name}</div>
                                        <div className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="text-slate-500 hover:text-rose-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(file.name);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExcelUploadBox;
