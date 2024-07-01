import { useEffect } from "react";
import { Button } from "react-daisyui";
import { FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

interface Props<T> {
  onClick: () => Promise<void>;
  data: T;
  fileName: string;
  bookName: string;
}

export default function CSVDownload<T>({
  onClick,
  data,
  fileName,
  bookName,
}: Props<T>) {
  useEffect(() => {
    if (data !== undefined) {
      if (data && Array.isArray(data) && data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `${bookName}`);

        XLSX.writeFile(wb, `${fileName}.xlsx`);
      } else {
        toast.error("Data is undefined or not a valid array.");
      }
    }
  }, [data]);
  return (
    <Button
      shape="circle"
      className="border-seeds hover:border-seeds"
      onClick={async () => {
        await onClick();
      }}
    >
      <FiDownload color="#3ac4a0" size={20} />
    </Button>
  );
}
