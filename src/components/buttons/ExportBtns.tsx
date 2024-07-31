import React, { useState } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun,
} from "docx";
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
      const imageBuffer = await fetch(`
        ${process.env.REACT_APP_AWS_S3_BASE_URL}habitHub.png`).then((res) =>
        res.arrayBuffer()
      );

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBuffer,
                    transformation: {
                      width: 50,
                      height: 50,
                    },
                  }),
                ],
                alignment: "center",
                spacing: {
                  after: 200,
                },
              }),
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
      const lineHeight = 10;
      let yPosition = margin;

      const imgData = await fetch(`
        ${process.env.REACT_APP_AWS_S3_BASE_URL}habitHub.png`).then((res) =>
        res.blob()
      );
      const reader = new FileReader();
      reader.readAsDataURL(imgData);
      reader.onloadend = () => {
        const imgWidth = 20;
        const imgHeight = 20;
        const text = "Habithub";
        const textWidth = doc.getTextWidth(text);
        const totalWidth = imgWidth + textWidth + 10; // Adding some padding
        const xPosition = (doc.internal.pageSize.getWidth() - totalWidth) / 2;

        doc.addImage(
          reader.result as string,
          "PNG",
          xPosition,
          yPosition,
          imgWidth,
          imgHeight
        );
        doc.text(text, xPosition + imgWidth + 2, yPosition + imgHeight / 2 + 5); // Centering the text vertically with the image

        yPosition += imgHeight + 10;

        doc.setFontSize(18);
        doc.text(
          `Tasks for ${formattedDate}`,
          doc.internal.pageSize.getWidth() / 2,
          yPosition,
          { align: "center" }
        );

        yPosition += lineHeight + 10;

        doc.setFontSize(10);
        tasks.forEach((task, index) => {
          doc.text(`Task ${index + 1}:`, margin, yPosition);
          yPosition += lineHeight;
          doc.text(
            `${task.name} - ${task.description} => ${
              task.priority === 1
                ? "Urgent"
                : task.priority === 0
                ? "Important"
                : "Deferred"
            }`,
            margin,
            yPosition
          );
          yPosition += lineHeight;
        });

        doc.save(`tasks_${formattedDate}.pdf`);
      };
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
        `${process.env.REACT_APP_BASE_URL}/tasks/email`,
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
