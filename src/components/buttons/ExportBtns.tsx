import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import toastNotify from "../../helpers/toastNotify";
import useAxios from "../../hooks/useAxios";
import { CircleLoader } from "react-spinners";

const ExportBtns = ({
  setShowExports,
}: {
  setShowExports: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({
    docx: false,
    pdf: false,
    email: false,
  });

  const axiosWithToken = useAxios();
  const { date } = useSelector((state: RootState) => state.date);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const formattedDate = new Date(date).toLocaleDateString("en-GB");

  const handleExportDocx = async () => {
    setLoadingStates((prev) => ({ ...prev, docx: true }));
    try {
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

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `tasks_${formattedDate}.docx`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, docx: false }));
      setShowExports(false);
    }
  };

  const handleExportPdf = async () => {
    setLoadingStates((prev) => ({ ...prev, pdf: true }));
    try {
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, pdf: false }));
      setShowExports(false);
    }
  };

  const handleExportEmail = async () => {
    setLoadingStates((prev) => ({ ...prev, email: true }));
    try {
      const { data } = await axiosWithToken.post(
        "http://127.0.0.1:8000/tasks/email",
        {
          userId: currentUser?.id,
          date,
        }
      );
      toastNotify("success", data.message);
    } catch (error: any) {
      console.log(error);
      toastNotify("error", error?.response?.data?.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, email: false }));
      setShowExports(false);
    }
  };

  const exportButtons = [
    { id: "docx", onClick: handleExportDocx, label: "Export as DOCX" },
    { id: "pdf", onClick: handleExportPdf, label: "Export as PDF" },
    { id: "email", onClick: handleExportEmail, label: "Receive via Mail" },
  ];

  return (
    <div className="w-full">
      {exportButtons.map(({ id, onClick, label }) => (
        <button
          key={id}
          onClick={onClick}
          disabled={loadingStates[id]}
          className={`py-3 text-black rounded w-full hover:bg-gray-300 text-[10px] md:text-[13px] ${
            id !== "email" ? "border-b border-gray-400" : ""
          }`}
        >
          {loadingStates[id] ? (
            <div className="flex gap-1 items-center justify-center">
              <span>Loading...</span>
              <CircleLoader size={16} />
            </div>
          ) : (
            label
          )}
        </button>
      ))}
    </div>
  );
};

export default ExportBtns;
