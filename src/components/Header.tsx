import { Container } from "@mui/material";


const Header = () => {
    return (
        <div className="bg-white border-b">
            <Container maxWidth="lg" className="px-8 py-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">CapyBara</h1>
                    <p className="text-sm text-slate-600">Upload Excel files and a rules JSON file to validate batch documents.</p>
                </div>
            </Container>
        </div>
    );
};

export default Header;
