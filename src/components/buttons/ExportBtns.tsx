import React from "react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import axios from "axios";
import toastNotify from "../../helpers/toastNotify";

const ExportBtns = ({
  setShowExports,
}: {
  setShowExports: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { date } = useSelector((state: RootState) => state.date);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  const handleExportDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: `Tasks for ${formattedDate}`,
              heading: HeadingLevel.HEADING_1,
            }),
            ...tasks.map(
              (task) =>
                new Paragraph({
                  children: [
                    new TextRun(task.name),
                    new TextRun(` - ${task.description}`),
                  ],
                })
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `tasks_${formattedDate}.docx`);
    });

    setShowExports(false);
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 10;
    let yPosition = margin;

    doc.setFontSize(18);
    doc.text(`Tasks for ${formattedDate}`, margin, yPosition);

    yPosition += lineHeight + 10;

    doc.setFontSize(10);
    tasks.forEach((task, index) => {
      doc.text(`Task ${index + 1}:`, margin, yPosition);
      yPosition += lineHeight;
      doc.text(`${task.name} - ${task.description}`, margin, yPosition);
      yPosition += lineHeight;
    });

    doc.save(`tasks_${formattedDate}.pdf`);
    setShowExports(false);
  };

  const handleExportEmail = async () => {
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/tasks/email", {
        userId: currentUser?.id,
        date,
      });
      toastNotify("success", data.message);
    } catch (error: any) {
      console.log(error);
      toastNotify("error", error?.response?.data?.message);
    } finally {
      setShowExports(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleExportDocx}
        className="py-3 text-black rounded w-full hover:bg-gray-300 text-[10px] md:text-[13px] border-b border-black/60"
      >
        Export as DOCX
      </button>
      <button
        onClick={handleExportPdf}
        className="py-3 text-black rounded w-full hover:bg-gray-300 text-[10px] md:text-[13px] border-b border-black/60"
      >
        Export as PDF
      </button>
      <button
        onClick={handleExportEmail}
        className="py-3 text-black rounded w-full hover:bg-gray-300 text-[10px] md:text-[13px]"
      >
        Receive via Mail
      </button>
    </div>
  );
};

export default ExportBtns;
