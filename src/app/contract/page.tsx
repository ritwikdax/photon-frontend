"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Download, Print } from "@mui/icons-material";
import { useProjectSelected } from "../hooks/useProjectSelected";
import { useProjectDeliverables } from "../queries/useProjectDeliverables";
import useProjectEvents from "../queries/useEventsByProjectId";
import { useMerchantDetails } from "../queries/useMerchantDetails";
import NoProjectSelected from "../components/NoProjectSelected";
import dayjs from "dayjs";
import useGenericQueries from "../queries/useGenericQueries";
import { Client } from "../interfaces/data/interface";

type PdfMode = "original" | "text";

export default function ContractPage() {
  const { selectedProject } = useProjectSelected();
  const contractRef = useRef<HTMLDivElement>(null);
  const [pdfMode, setPdfMode] = useState<PdfMode>("text");

  const deliverables = useProjectDeliverables(selectedProject?.id || "");
  const { data: events } = useProjectEvents(selectedProject?.id || "");
  const { data: merchantDetails } = useMerchantDetails();
   const { data: client } = useGenericQueries<Client[]>(
     "clients",
     `id=${selectedProject?.clientId}`
   );

  if (!selectedProject) {
    return <NoProjectSelected />;
  }

  const handleDownloadPDF = async () => {
    if (!contractRef.current) return;

    try {
      if (pdfMode === "original") {
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
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(
          `Wedding_Photography_Contract_${selectedProject.name}_${dayjs().format("YYYY-MM-DD")}.pdf`
        );
      } else {
        // Text-Based PDF Mode - Using jsPDF with native text rendering
        const { default: jsPDF } = await import("jspdf");
        const autoTable = (await import("jspdf-autotable")).default;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        }) as any;

        let yPos = 20;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pageWidth - (2 * margin);

        // Helper function to check if we need a new page
        const checkPageBreak = (spaceNeeded: number) => {
          if (yPos + spaceNeeded > pageHeight - margin) {
            pdf.addPage();
            yPos = margin;
            return true;
          }
          return false;
        };

      // Header with background
      pdf.setFillColor(0, 28, 61); // #001C3D
      pdf.rect(0, 0, pageWidth, 60, 'F');
      
      // Logo if available
      if (merchantDetails?.merchantDetails?.logo) {
        try {
          const imgData = merchantDetails.merchantDetails.logo;
          pdf.addImage(imgData, 'PNG', pageWidth / 2 - 20, 12, 40, 13);
          yPos = 32;
        } catch (e) {
          yPos = 20;
        }
      } else {
        yPos = 20;
      }

      // Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('WEDDING PHOTOGRAPHY AGREEMENT', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 8;
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Contract Date: ${today}`, pageWidth / 2, yPos, { align: 'center' });

      // Reset text color for body
      pdf.setTextColor(0, 0, 0);
      yPos = 70;

      // 1. PARTIES TO THE AGREEMENT
      checkPageBreak(50);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1. PARTIES TO THE AGREEMENT', margin, yPos);
      yPos += 3;
      pdf.setDrawColor(224, 224, 224); // Light gray line
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Service Provider:', margin, yPos);
      pdf.text('Client:', pageWidth / 2 + 5, yPos);
      yPos += 7;

      pdf.setFont('helvetica', 'normal');
      const businessName = merchantDetails?.merchantDetails?.businessName || "N/A";
      const businessPhone = merchantDetails?.merchantDetails?.phone || "N/A";
      const businessEmail = merchantDetails?.merchantDetails?.email || "N/A";
      const clientName = (client && client.length > 0 ? client[0].name : "N/A");

      pdf.text(`Business: ${businessName}`, margin, yPos);
      pdf.text(`Name: ${clientName}`, pageWidth / 2 + 5, yPos);
      yPos += 5;
      pdf.text(`Phone: ${businessPhone}`, margin, yPos);
      pdf.text(`Phone: ${selectedProject.phone}`, pageWidth / 2 + 5, yPos);
      yPos += 5;
      pdf.text(`Email: ${businessEmail}`, margin, yPos);
      pdf.text(`Email: ${selectedProject.email}`, pageWidth / 2 + 5, yPos);
      yPos += 5;
      pdf.text(`Booking: ${dayjs(selectedProject.dateOfBooking).format("MMMM D, YYYY")}`, pageWidth / 2 + 5, yPos);
      yPos += 12;

      // Add divider line
      pdf.setDrawColor(224, 224, 224);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      // 2. EVENT DETAILS
      checkPageBreak(50);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('2. EVENT DETAILS', margin, yPos);
      yPos += 3;
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      if (events && events.length > 0) {
        const eventTableData = events.map((event: any) => {
          // Convert eventDate and eventStartTime to Date objects
          const eventDate = new Date(event.eventDate);
          const [hours, minutes] = event.eventStartTime.split(':');
          const eventStart = new Date(eventDate);
          eventStart.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
          
          // Assume 4 hour duration for end time
          const eventEnd = new Date(eventStart);
          eventEnd.setHours(eventEnd.getHours() + 4);
          
          return [
            `${dayjs(eventStart).format("MMM D, YYYY")}\n${dayjs(eventStart).format("h:mm A")} - ${dayjs(eventEnd).format("h:mm A")}`,
            event.venue,
            event.assignment,
            `P: ${event.photographerCount}\nV: ${event.videographerCount}${event.droneOperatorCount > 0 ? `\nD: ${event.droneOperatorCount}` : ''}`
          ];
        });

        autoTable(pdf, {
          startY: yPos,
          head: [['Date & Time', 'Venue', 'Assignment', 'Team']],
          body: eventTableData,
          theme: 'striped',
          headStyles: { 
            fillColor: [0, 28, 61], 
            textColor: [255, 255, 255], 
            fontStyle: 'bold',
            fontSize: 10,
            halign: 'left'
          },
          margin: { left: margin, right: margin },
          styles: { 
            fontSize: 9,
            cellPadding: 3,
            lineColor: [224, 224, 224],
            lineWidth: 0.1
          },
          alternateRowStyles: {
            fillColor: [249, 249, 249]
          }
        });
        yPos = pdf.lastAutoTable.finalY + 12;
      } else {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text('No events scheduled yet.', margin, yPos);
        pdf.setTextColor(0, 0, 0);
        yPos += 12;
      }

      // Add divider line
      pdf.setDrawColor(224, 224, 224);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      // 3. DELIVERABLES
      checkPageBreak(50);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('3. DELIVERABLES', margin, yPos);
      yPos += 3;
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      if (deliverables && deliverables.length > 0) {
        const deliverableTableData = deliverables.map((d) => [
          d.displayName,
          d.assetType,
          d.deliveryTime > 0 ? `${d.deliveryTime} days` : 'TBD',
          d.additionalDetails || '-'
        ]);

        autoTable(pdf, {
          startY: yPos,
          head: [['Item', 'Type', 'Delivery Time', 'Details']],
          body: deliverableTableData,
          theme: 'striped',
          headStyles: { 
            fillColor: [0, 28, 61], 
            textColor: [255, 255, 255], 
            fontStyle: 'bold',
            fontSize: 10,
            halign: 'left'
          },
          margin: { left: margin, right: margin },
          styles: { 
            fontSize: 9,
            cellPadding: 3,
            lineColor: [224, 224, 224],
            lineWidth: 0.1
          },
          alternateRowStyles: {
            fillColor: [249, 249, 249]
          }
        });
        yPos = pdf.lastAutoTable.finalY + 12;
      } else {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text('No deliverables specified yet.', margin, yPos);
        pdf.setTextColor(0, 0, 0);
        yPos += 12;
      }

      // Add divider line
      pdf.setDrawColor(224, 224, 224);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      // 4. TERMS AND CONDITIONS
      checkPageBreak(40);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('4. TERMS AND CONDITIONS', margin, yPos);
      yPos += 3;
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      const terms = [
        {
          title: '4.1 Payment Terms',
          items: [
            'A non-refundable deposit of 30% of the total package cost is required to confirm the booking.',
            'The remaining balance must be paid at least 7 days before the event date.',
            'All payments should be made via bank transfer or as agreed upon by both parties.'
          ]
        },
        {
          title: '4.2 Cancellation Policy',
          items: [
            'Cancellations made 60+ days before the event: 50% refund of deposit.',
            'Cancellations made 30-59 days before: 25% refund of deposit.',
            'Cancellations made less than 30 days before: No refund.'
          ]
        },
        {
          title: '4.3 Photography Coverage',
          items: [
            'The photographer will arrive at the scheduled time and stay for the agreed-upon duration.',
            'Overtime charges will apply if coverage extends beyond the agreed hours.',
            'We will make every effort to capture all important moments, but specific shots cannot be guaranteed.'
          ]
        },
        {
          title: '4.4 Image Editing and Delivery',
          items: [
            'All images will be professionally edited and color-corrected.',
            'Edited photos will be delivered within the timeframe specified in the deliverables section.',
            'RAW/unedited files are not included unless specifically mentioned in the package.',
            'Photos will be delivered via online gallery or as specified in the deliverables.'
          ]
        },
        {
          title: '4.5 Copyright and Usage Rights',
          items: [
            'The photographer retains full copyright of all images.',
            'The client receives a personal use license to print, share, and post images on social media with proper credit.',
            'Commercial use of images requires written permission from the photographer.',
            'The photographer reserves the right to use images for portfolio, marketing, and promotional purposes.'
          ]
        },
        {
          title: '4.6 Liability',
          items: [
            'The photographer will take utmost care with equipment but is not liable for photos not taken due to camera malfunction.',
            'Backup equipment will be available on-site to minimize risks.',
            'The photographer is not responsible for family disputes, venue restrictions, or poor lighting conditions.'
          ]
        },
        {
          title: '4.7 Force Majeure',
          items: [
            'In case of extreme weather, natural disasters, illness, or other unforeseen circumstances, the photographer will make reasonable efforts to provide a replacement.',
            'If no replacement is available, the deposit will be refunded in full.'
          ]
        },
        {
          title: '4.8 Client Responsibilities',
          items: [
            'The client must inform the photographer of any special shots or family groupings required.',
            'The client is responsible for obtaining necessary venue permissions for photography.',
            'The client should designate a point person to assist the photographer with family groupings.'
          ]
        },
        {
          title: '4.9 Data Retention',
          items: [
            'Digital files will be retained for a minimum of 6 months after delivery.',
            'After this period, the photographer is not obligated to maintain backups.',
            'Clients are encouraged to make their own backups upon receiving the photos.'
          ]
        },
        {
          title: '4.10 Dispute Resolution',
          items: [
            'Any disputes arising from this agreement will be resolved through mediation.',
            'Both parties agree to work in good faith to resolve any issues amicably.'
          ]
        }
      ];

      pdf.setFontSize(10);
      terms.forEach(term => {
        checkPageBreak(20 + (term.items.length * 5));
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.text(term.title, margin, yPos);
        yPos += 6;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        term.items.forEach(item => {
          const lines = pdf.splitTextToSize(`• ${item}`, contentWidth - 5);
          lines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 3, yPos);
            yPos += 4.5;
          });
        });
        yPos += 4;
      });

      // Add divider line before signatures
      yPos += 4;
      pdf.setDrawColor(224, 224, 224);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      // 5. SIGNATURES
      checkPageBreak(45);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('5. SIGNATURES', margin, yPos);
      yPos += 3;
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 12;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Client Signature:', margin, yPos);
      pdf.text('Photographer Signature:', pageWidth / 2 + 5, yPos);
      yPos += 18;
      
      pdf.setDrawColor(0, 0, 0);
      pdf.line(margin, yPos, pageWidth / 2 - 10, yPos);
      pdf.line(pageWidth / 2 + 5, yPos, pageWidth - margin, yPos);
      yPos += 6;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(`Name: ${selectedProject.name}`, margin, yPos);
      pdf.text('Name: _________________', pageWidth / 2 + 5, yPos);
      yPos += 5;
      pdf.text('Date: _________________', margin, yPos);
      pdf.text('Date: _________________', pageWidth / 2 + 5, yPos);

      // Footer with top border
      yPos += 12;
      checkPageBreak(15);
      pdf.setDrawColor(224, 224, 224);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 6;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(128, 128, 128);
      const footerText = 'This agreement is binding upon signing by both parties. Please retain a copy for your records.';
      pdf.text(footerText, pageWidth / 2, yPos, { align: 'center', maxWidth: contentWidth });

      pdf.save(
        `Wedding_Photography_Contract_${selectedProject.name}_${dayjs().format("YYYY-MM-DD")}.pdf`
      );
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    if (!contractRef.current) return;

    // Get all stylesheets from the current document
    const styleSheets = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          // Cross-origin stylesheets may throw an error
          return '';
        }
      })
      .join('\n');

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const contractHTML = contractRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Wedding Photography Contract</title>
          <meta charset="UTF-8">
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
          <style>
            ${styleSheets}
            
            body {
              margin: 0;
              padding: 20px;
              font-family: 'Roboto', sans-serif;
            }
            
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
            }
            
            @page {
              margin: 10mm;
            }
          </style>
        </head>
        <body>
          <div style="padding: 48px; background-color: white;">
            ${contractHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    
    // Wait for content and styles to load before printing
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const today = dayjs().format("MMMM D, YYYY");

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="pdf-mode-label">PDF Generation Mode</InputLabel>
            <Select
              labelId="pdf-mode-label"
              id="pdf-mode-select"
              value={pdfMode}
              label="PDF Generation Mode"
              onChange={(e) => setPdfMode(e.target.value as PdfMode)}
            >
              <MenuItem value="text">Text-Based PDF</MenuItem>
              <MenuItem value="original">Keep Original Styling</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Download PDF">
              <IconButton
                onClick={handleDownloadPDF}
                color="primary"
                size="large"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton
                onClick={handlePrint}
                color="primary"
                size="large"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <Print />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Box
          sx={{
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Paper
            ref={contractRef}
            elevation={3}
            sx={{
              p: 6,
              bgcolor: "white",
            }}
          >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4, bgcolor: "#001C3D", py: 4, px: 3, mx: -6, mt: -6 }}>
            {merchantDetails?.merchantDetails?.logo && (
              <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                <img
                  src={merchantDetails.merchantDetails.logo}
                  alt={merchantDetails.merchantDetails.businessName || "Business Logo"}
                  style={{ maxHeight: "50px", objectFit: "contain" }}
                />
              </Box>
            )}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "white" }}>
              AGREEMENT DOCUMENT
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Contract Date: {today}
            </Typography>
          </Box>


          {/* Monetary Agreement Section */}
          <Box sx={{ mb: 4, pageBreakInside: "avoid", bgcolor: "#f8f9fa", p: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "#001C3D" }}>
              MONETARY AGREEMENT
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
              This agreement is entered into between the Service Provider and the Client for photography services 
              as detailed in this contract. The total package cost for all services, including but not limited to 
              photography coverage, editing, and deliverables specified herein, amounts to{" "}
              <strong>₹</strong>
              <strong 
                contentEditable 
                suppressContentEditableWarning
                style={{ 
                  minWidth: '100px', 
                  display: 'inline-block',
                  borderBottom: '1px solid #ccc',
                  padding: '2px 4px',
                  cursor: 'text'
                }}
              >
                __________
              </strong> (to be agreed upon by both parties).
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
              A non-refundable booking deposit of <strong>30%</strong> of the total package cost is 
              required to secure the date and confirm this booking. The remaining balance of{" "}
              <strong>70%</strong> must be paid at least 7 days prior to the event date. Payment can be made via 
              bank transfer, UPI, or any other mutually agreed method. Late payments may result in postponement 
              or cancellation of services as per the cancellation policy outlined in this agreement.
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, fontStyle: "italic", color: "text.secondary" }}>
              Both parties acknowledge and agree to the monetary terms stated above and commit to fulfilling 
              their respective financial obligations as outlined in this contract.
            </Typography>
          </Box>

          {/* Parties Section */}
          <Box sx={{ mb: 4, pageBreakInside: "avoid" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              1. PARTIES TO THE AGREEMENT
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Service Provider:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Business Name:</strong>{" "}
                  {merchantDetails?.merchantDetails?.businessName || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Phone:</strong>{" "}
                  {merchantDetails?.merchantDetails?.phone || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Email:</strong> {merchantDetails?.merchantDetails?.email || "N/A"}
                </Typography>
                {merchantDetails?.merchantDetails?.tagline && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {merchantDetails.merchantDetails.tagline}
                  </Typography>
                )}
              </Grid>
              <Grid size={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Client:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Name:</strong> {client && client.length > 0 ? client[0].name : "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Phone:</strong> {selectedProject.phone}
                </Typography>
                {selectedProject.alternatePhone && (
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Alt Phone:</strong> {selectedProject.alternatePhone}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Email:</strong> {selectedProject.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Booking Date:</strong>{" "}
                  {dayjs(selectedProject.dateOfBooking).format("MMMM D, YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Events Section */}
          <Box sx={{ mb: 4, pageBreakInside: "avoid" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              2. EVENT DETAILS
            </Typography>
            {events && events.length > 0 ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Venue</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Assignment</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Team Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((event: any, index: number) => {
                      // Convert eventDate and eventStartTime to Date objects
                      const eventDate = new Date(event.eventDate);
                      const [hours, minutes] = event.eventStartTime.split(':');
                      const eventStart = new Date(eventDate);
                      eventStart.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
                      
                      // Assume 4 hour duration for end time
                      const eventEnd = new Date(eventStart);
                      eventEnd.setHours(eventEnd.getHours() + 4);
                      
                      return (
                        <TableRow key={event.id || index}>
                          <TableCell>
                            <Typography variant="body2">
                              {dayjs(eventStart).format("MMM D, YYYY")}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {dayjs(eventStart).format("h:mm A")} -{" "}
                              {dayjs(eventEnd).format("h:mm A")}
                            </Typography>
                          </TableCell>
                          <TableCell>{event.venue}</TableCell>
                          <TableCell>{event.assignment}</TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              Photographers: {event.photographerCount}
                            </Typography>
                            <Typography variant="body2">
                              Videographers: {event.videographerCount}
                            </Typography>
                            {event.droneOperatorCount > 0 && (
                              <Typography variant="body2">
                                Drone: {event.droneOperatorCount}
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No events scheduled yet.
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Deliverables Section */}
          <Box sx={{ mb: 4, pageBreakInside: "avoid" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              3. DELIVERABLES
            </Typography>
            {deliverables && deliverables.length > 0 ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Delivery Time</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deliverables.map((deliverable, index) => (
                      <TableRow key={deliverable.id || index}>
                        <TableCell>{deliverable.displayName}</TableCell>
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {deliverable.assetType}
                        </TableCell>
                        <TableCell>
                          {deliverable.deliveryTime > 0
                            ? `${deliverable.deliveryTime} days`
                            : "TBD"}
                        </TableCell>
                        <TableCell>
                          {deliverable.additionalDetails || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No deliverables specified yet.
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Terms and Conditions */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              4. TERMS AND CONDITIONS
            </Typography>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.1 Payment Terms
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • A non-refundable deposit of 30% of the total package cost is required to
                confirm the booking.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The remaining balance must be paid at least 7 days before the event date.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • All payments should be made via bank transfer or as agreed upon by both
                parties.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.2 Cancellation Policy
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Cancellations made 60+ days before the event: 50% refund of deposit.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Cancellations made 30-59 days before: 25% refund of deposit.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Cancellations made less than 30 days before: No refund.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.3 Photography Coverage
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The photographer will arrive at the scheduled time and stay for the
                agreed-upon duration.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Overtime charges will apply if coverage extends beyond the agreed hours,
                at the rate specified in the package.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • We will make every effort to capture all important moments, but specific
                shots cannot be guaranteed.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.4 Image Editing and Delivery
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • All images will be professionally edited and color-corrected.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Edited photos will be delivered within the timeframe specified in the
                deliverables section.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • RAW/unedited files are not included unless specifically mentioned in the
                package.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Photos will be delivered via online gallery or as specified in the
                deliverables.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.5 Copyright and Usage Rights
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The photographer retains full copyright of all images.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The client receives a personal use license to print, share, and post
                images on social media with proper credit.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Commercial use of images requires written permission from the
                photographer.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The photographer reserves the right to use images for portfolio,
                marketing, and promotional purposes.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.6 Liability
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The photographer will take utmost care with equipment but is not liable
                for photos not taken due to camera malfunction or circumstances beyond
                control.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Backup equipment will be available on-site to minimize risks.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The photographer is not responsible for family disputes, venue
                restrictions, or poor lighting conditions affecting photo quality.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.7 Force Majeure
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • In case of extreme weather, natural disasters, illness, or other
                unforeseen circumstances, the photographer will make reasonable efforts to
                provide a replacement photographer.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • If no replacement is available, the deposit will be refunded in full.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.8 Client Responsibilities
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The client must inform the photographer of any special shots or family
                groupings required.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The client is responsible for obtaining necessary venue permissions for
                photography.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • The client should designate a point person to assist the photographer
                with family groupings and schedules.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.9 Data Retention
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Digital files will be retained for a minimum of 6 months after delivery.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • After this period, the photographer is not obligated to maintain backups.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Clients are encouraged to make their own backups upon receiving the
                photos.
              </Typography>
            </Box>

            <Box sx={{ mb: 2, pageBreakInside: "avoid" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                4.10 Dispute Resolution
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Any disputes arising from this agreement will be resolved through
                mediation.
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, pl: 2 }}>
                • Both parties agree to work in good faith to resolve any issues amicably.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Signatures */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              5. SIGNATURES
            </Typography>
            <Grid container spacing={4}>
              <Grid size={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    <strong>Client Signature:</strong>
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid #000",
                      width: "100%",
                      mb: 1,
                      height: 40,
                    }}
                  />
                  <Typography variant="body2">
                    <strong>Name:</strong> {client && client.length > 0 ? client[0].name : "_________________"  }
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> _________________
                  </Typography>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    <strong>Service Provider's Signature:</strong>
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid #000",
                      width: "100%",
                      mb: 1,
                      height: 40,
                    }}
                  />
                  <Typography variant="body2">
                    <strong>Name:</strong> _________________
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> _________________
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              This agreement is binding upon signing by both parties. Please retain a copy for
              your records.
            </Typography>
          </Box>
        </Paper>
        </Box>
      </Container>
    </Box>
  );
}
