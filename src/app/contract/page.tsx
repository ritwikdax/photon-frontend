"use client";
import React, { useRef, useState, useMemo } from "react";
import {
  Box,
  Button,
  Stack,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import Handlebars from "handlebars";
import { useProjectSelected } from "../hooks/useProjectSelected";
import { useProjectDeliverables } from "../queries/useProjectDeliverables";
import useProjectEvents from "../queries/useEventsByProjectId";
import { useMerchantDetails } from "../queries/useMerchantDetails";
import NoProjectSelected from "../components/NoProjectSelected";
import dayjs from "dayjs";
import useGenericQueries from "../queries/useGenericQueries";
import { Client, Contract } from "../interfaces/data/interface";
import { CONTRACT_CLASSIC } from "../templates/contracts/classic";
import { CONTRACT_MODERN } from "../templates/contracts/modern";
import { CONTRACT_VINTAGE } from "../templates/contracts/vintage";

// Create classic MUI default theme
const classicTheme = createTheme();

type TemplateType = "classic" | "modern" | "vintage";

export default function ContractPage() {
  const { selectedProject } = useProjectSelected();
  const contractRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic");

  const deliverables = useProjectDeliverables(selectedProject?.id || "");
  const { data: events } = useProjectEvents(selectedProject?.id || "");
  const { data: merchantDetails } = useMerchantDetails();
  const { data: client } = useGenericQueries<Client[]>(
    "clients",
    `id=${selectedProject?.clientId}`
  );

  const today = dayjs().format("MMMM D, YYYY");

  // Get the selected template HTML
  const getTemplateHtml = (templateType: TemplateType) => {
    switch (templateType) {
      case "classic":
        return CONTRACT_CLASSIC;
      case "modern":
        return CONTRACT_MODERN;
      case "vintage":
        return CONTRACT_VINTAGE;
      default:
        return CONTRACT_CLASSIC;
    }
  };

  // Compile template with Handlebars and inject data
  const compiledContract = useMemo(() => {
    const template = Handlebars.compile(getTemplateHtml(selectedTemplate));
    const templateData: Contract = {
      contractDate: today,
      project: selectedProject as any,
      client: client && (client[0] as any),
      merchant: merchantDetails as any,
      events:
        events?.map((e) => {
          const teamParts = [];
          if (e.photographerCount > 0) teamParts.push(`Photographers: ${e.photographerCount}`);
          if (e.videographerCount > 0) teamParts.push(`Videographers: ${e.videographerCount}`);
          if (e.droneOperatorCount > 0) teamParts.push(`Drone Operators: ${e.droneOperatorCount}`);
          if (e.lightmanCount > 0) teamParts.push(`Lightmen: ${e.lightmanCount}`);
          if (e.helperCount > 0) teamParts.push(`Helpers: ${e.helperCount}`);
          
          return {
            eventDate: dayjs(e.eventDate).format("MMMM D, YYYY"),
            venue: e.venue,
            assignment: e.assignment,
            team: teamParts.join(", "),
          };
        }) || [],
      deliverables: deliverables || [],
    };
    return template(templateData);
  }, [selectedProject, client, merchantDetails, events, deliverables, today, selectedTemplate]);

  if (!selectedProject) {
    return <NoProjectSelected />;
  }

  const handleGetEditedContent = () => {
    if (!contractRef.current) return;

    // Get the edited HTML content
    const editedHTML = contractRef.current.innerHTML;
    console.log("Edited HTML:", editedHTML);
    return editedHTML;
  };

  const handleDownloadPDF = async () => {
    if (!contractRef.current) return;
    try {
      // Original Styling Mode - Using html2canvas + jsPDF
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      const canvas = await html2canvas(contractRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with custom height to fit entire content on one page
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [imgWidth, imgHeight], // Custom page size matching content
      });
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.save(
        `Wedding_Photography_Contract_${selectedProject.name}_${dayjs().format(
          "YYYY-MM-DD"
        )}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      {/* First Column - Controls */}
      <Box sx={{ width: 300, flexShrink: 0 }}>
        <Stack spacing={2}>
          <FormControl size="medium" fullWidth>
            <InputLabel id="template-label">Contract Template</InputLabel>
            <Select
              labelId="template-label"
              id="template-select"
              value={selectedTemplate}
              label="Contract Template"
              onChange={(e) => setSelectedTemplate(e.target.value as TemplateType)}
            >
              <MenuItem value="classic">Classic</MenuItem>
              <MenuItem value="modern">Modern</MenuItem>
              <MenuItem value="vintage">Vintage</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Get Edited Content">
            <Button
              onClick={handleGetEditedContent}
              variant="outlined"
              fullWidth
            >
              Get Edited HTML
            </Button>
          </Tooltip>

          <Tooltip title="Download PDF">
            <Button
              onClick={handleDownloadPDF}
              variant="contained"
              startIcon={<Download />}
              fullWidth
            >
              Download PDF
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {/* Second Column - HTML Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          maxHeight: "calc(100vh - 64px)",
        }}
      >
        <ThemeProvider theme={classicTheme}>
          <Box
            sx={{
              maxWidth: "850px",
            }}
          >
            <div
              ref={contractRef}
              contentEditable
              dangerouslySetInnerHTML={{ __html: compiledContract }}
            ></div>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
