import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "~/components/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error {error}</div>;

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar user />
      <section className="main-section">
        <div className="max-w-[1280px] w-full mx-auto">
          <div className="flex flex-col gap-4">
            {files.length === 0 && (
              <div className="flex justify-center flex-col items-center h-[50vh]">
                <img src="/images/pdf.png" alt="Pdf ng" className="w-[100px]" />
                <h2 className="text-2xl text-center">Not Found any files</h2>
                <Link to="/" className="back-button mt-4">
                  <img
                    src="/icons/back.svg"
                    alt="back button"
                    className="w-2.5 h-2.5"
                  />
                  <span className="text-gray-800 text-sm font-semibold">
                    Back to Homepage
                  </span>
                </Link>
              </div>
            )}
            {files.length > 0 && (
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No:</TableHead>
                      <TableHead className="text-left p-3">Name</TableHead>
                      <TableHead className="text-left p-3">Path</TableHead>
                      <TableHead className="text-left p-3">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {files.map((file: any, i: number) => (
                      <TableRow
                        key={file.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <TableCell>{i + 1}</TableCell>
                        <TableCell className="p-3">{file.name}</TableCell>
                        <TableCell className="p-3 text-sm text-gray-500">
                          {file.path}
                        </TableCell>
                        <TableCell className="p-3">
                          {file.isDir ? "Folder" : "File"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          {files.length > 0 && (
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer mt-6"
                onClick={handleDelete}
              >
                Delete all data
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default WipeApp;
