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
                children: [
                  new TextRun({
                    text: "Habithub",
                    bold: true,
                    size: 32,
                  }),
                ],
                alignment: "center",
                spacing: {
                  after: 400, // Larger space after the header
                },
              }),
              new Paragraph({
                text: `Tasks for ${formattedDate}`,
                heading: HeadingLevel.HEADING_1,
                alignment: "center",
                spacing: {
                  after: 400, // Larger space after the header
                },
              }),
              ...tasks.map(
                (task, index) =>
                  new Paragraph({
                    children: [
                      new TextRun(`Task ${index + 1}: `),
                      new TextRun({
                        text: task.name,
                        break: 1,
                      }),
                      new TextRun(` - ${task.description}`),
                      new TextRun(
                        ` - ${
                          task.priority === 1
                            ? "Urgent 🚀"
                            : task.priority === 0
                            ? "Important 🔥"
                            : "Deferred 🍀"
                        }`
                      ),
                    ],
                    spacing: {
                      after: 100, // Smaller space between tasks
                    },
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
      const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin; // Page width minus margins
      const pageHeight = doc.internal.pageSize.getHeight() - 2 * margin; // Page height minus margins
      let yPosition = margin;

      // Function to add a new page if needed
      const addPageIfNeeded = () => {
        if (yPosition + 10 > pageHeight) {
          // If there's no space left
          doc.addPage(); // Add a new page
          yPosition = margin; // Reset yPosition for the new page
        }
      };

      // Add title
      const title = "Habithub";
      doc.setFontSize(18);
      doc.text(title, doc.internal.pageSize.getWidth() / 2, yPosition, {
        align: "center",
      });
      yPosition += 20; // Move down after the title

      // Add subtitle
      const subtitle = `Tasks for ${formattedDate}`;
      doc.setFontSize(14);
      doc.text(subtitle, doc.internal.pageSize.getWidth() / 2, yPosition, {
        align: "center",
      });
      yPosition += 20; // Move down after the subtitle

      // Add tasks with formatting
      doc.setFontSize(10);
      tasks.forEach((task, index) => {
        // Split text into lines that fit within the page width
        const taskLines = doc.splitTextToSize(`Task ${index + 1}:`, pageWidth);
        const nameLines = doc.splitTextToSize(task.name, pageWidth);
        const description = ` - ${task.description} => ${
          task.priority === 1
            ? "Urgent"
            : task.priority === 0
            ? "Important"
            : "Deferred"
        }`;

        taskLines.forEach((line: string) => {
          addPageIfNeeded(); // Check if we need to add a new page before adding a line
          doc.setFont("Helvetica", "bold"); // Set bold font for "Task X: "
          doc.text(line, margin, yPosition);
          yPosition += 5; // Move down after the bold text
        });

        doc.setTextColor(255, 0, 0); // Set text color to red for task name
        nameLines.forEach((line: string) => {
          addPageIfNeeded(); // Check if we need to add a new page before adding a line
          doc.text(line, margin + 5, yPosition); // Adjust x position if needed
          yPosition += 5; // Move down after the red text
        });

        doc.setTextColor(0, 0, 0); // Reset text color to black
        const descriptionLines = doc.splitTextToSize(description, pageWidth);
        descriptionLines.forEach((line: string) => {
          addPageIfNeeded(); // Check if we need to add a new page before adding a line
          doc.text(line, margin + 5, yPosition); // Adjust x position if needed
          yPosition += 5; // Move down after the description
        });

        yPosition += 5; // Add space between tasks

        addPageIfNeeded(); // Check if we need to add a new page after each task
      });

      doc.save(`tasks_${formattedDate}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Check the console for more details.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, pdf: false }));
      setShowExports(false);
    }
  };

  const handleExportEmail = async () => {
    setLoadingStates((prev) => ({ ...prev, email: true }));
    try {
      const { data } = await axiosWithToken.post(`tasks/email`, {
        userId: currentUser?.id,
        date,
      });
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
              <CircleLoader size={16} className="text-black dark:text-white" />
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
