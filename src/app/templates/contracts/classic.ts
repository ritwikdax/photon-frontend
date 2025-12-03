export const CONTRACT_CLASSIC: string = `<!DOCTYPE html>
<html lang="en">


    <meta charset="UTF-8">
    <title>Wedding Photography Agreement</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Font (similar to PDF look) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">

    <style>
      .contract-classic-wrapper {
        --page-width: 850px;
        --page-bg: #ffffff;
        --body-bg: #f3f4f6;
        --primary: #0d2342; /* deep navy header */
        --text-main: #111827;
        --text-muted: #6b7280;
        --border-soft: #e5e7eb;
        --section-bg: #f9fafb;
        --heading-size: 14px;
      }

      .contract-classic-wrapper * {
        box-sizing: border-box;
      }

      .contract-classic-wrapper {
        margin: 0;
        padding: 0;
        font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        color: var(--text-main);
        -webkit-font-smoothing: antialiased;
      }

      .contract-classic-wrapper .page {
        max-width: var(--page-width);
        margin: 0 auto;
        background: var(--page-bg);
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
        overflow: hidden;
      }

      /* HEADER */

      .contract-classic-wrapper .header {
        background: var(--primary);
        color: #ffffff;
        padding: 28px 48px 32px;
        text-align: center;
      }

      .contract-classic-wrapper .brand {
        font-weight: 700;
        font-size: 24px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .contract-classic-wrapper .brand span {
        font-weight: 400;
        font-size: 11px;
        letter-spacing: 0.28em;
        display: block;
        margin-top: 4px;
      }

      .contract-classic-wrapper .header-title {
        margin-top: 18px;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .contract-classic-wrapper .header-subtitle {
        margin-top: 4px;
        font-size: 13px;
        font-weight: 400;
      }

      /* BODY CONTENT */

      .contract-classic-wrapper .content {
        padding: 32px 48px 40px;
      }

      .contract-classic-wrapper .card {
        background: var(--section-bg);
        border-radius: 10px;
        padding: 24px 28px;
        border: 1px solid var(--border-soft);
        margin-bottom: 32px;
      }

      .contract-classic-wrapper h2.section-heading {
        margin: 0 0 12px;
        font-size: 15px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }

      .contract-classic-wrapper p {
        margin: 6px 0;
        font-size: 13px;
        line-height: 1.6;
      }

      .contract-classic-wrapper .note {
        margin-top: 18px;
        font-size: 12px;
        color: var(--text-muted);
        font-style: italic;
      }

      .contract-classic-wrapper .section {
        margin-top: 24px;
      }

      .contract-classic-wrapper .section-title {
        font-size: var(--heading-size);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 10px;
      }

      .contract-classic-wrapper .subheading {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .contract-classic-wrapper .two-column {
        display: grid;
        grid-template-columns: 1.15fr 1.15fr;
        gap: 48px;
        font-size: 13px;
      }

      .contract-classic-wrapper .field-label {
        font-weight: 600;
      }

      .contract-classic-wrapper .field-row {
        margin-bottom: 4px;
      }

      /* TABLES */

      .contract-classic-wrapper .table-wrapper {
        margin-top: 12px;
        border-radius: 8px;
        border: 1px solid var(--border-soft);
        overflow: hidden;
      }

      .contract-classic-wrapper table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      .contract-classic-wrapper thead {
        background: #f3f4f6;
      }

      .contract-classic-wrapper th,
      .contract-classic-wrapper td {
        padding: 9px 10px;
        text-align: left;
        vertical-align: top;
      }

      .contract-classic-wrapper th {
        font-weight: 600;
        font-size: 12px;
      }

      .contract-classic-wrapper tbody tr:not(:last-child) td {
        border-bottom: 1px solid var(--border-soft);
      }

      .contract-classic-wrapper .muted-small {
        display: block;
        font-size: 11px;
        color: var(--text-muted);
        margin-top: 2px;
      }

      .contract-classic-wrapper .team-size {
        font-size: 11px;
        line-height: 1.5;
      }

      /* TERMS & CONDITIONS */

      .contract-classic-wrapper .terms-section {
        margin-top: 10px;
        font-size: 13px;
      }

      .contract-classic-wrapper .terms-subtitle {
        font-weight: 600;
        margin-top: 12px;
        margin-bottom: 4px;
      }

      .contract-classic-wrapper ul.terms-list {
        margin: 0 0 4px 16px;
        padding: 0;
        list-style-type: disc;
      }

      .contract-classic-wrapper ul.terms-list li {
        margin-bottom: 2px;
        line-height: 1.55;
      }

      /* SIGNATURES */

      .contract-classic-wrapper .signatures {
        margin-top: 32px;
      }

      .contract-classic-wrapper .signature-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        margin-top: 16px;
        font-size: 13px;
      }

      .contract-classic-wrapper .signature-label {
        font-weight: 600;
        margin-bottom: 48px;
      }

      .contract-classic-wrapper .signature-line {
        border-bottom: 1px solid #000000;
        margin-bottom: 8px;
        height: 0;
      }

      .contract-classic-wrapper .signature-meta {
        font-size: 12px;
      }

      .contract-classic-wrapper .signature-meta span {
        display: inline-block;
        min-width: 60px;
        font-weight: 600;
      }

      .contract-classic-wrapper .footer-note {
        margin-top: 32px;
        text-align: center;
        font-size: 11px;
        color: var(--text-muted);
      }

      /* PRINT STYLES (optional, for PDF export) */
      @media print {
        .contract-classic-wrapper {
          padding: 0;
          background: #ffffff;
        }

        .contract-classic-wrapper .page {
          box-shadow: none;
          border-radius: 0;
        }
      }

      @media (max-width: 768px) {
        .contract-classic-wrapper .content,
        .contract-classic-wrapper .header {
          padding: 24px 20px;
        }

        .contract-classic-wrapper .two-column,
        .contract-classic-wrapper .signature-columns {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
    </style>
  
  
    <div class="contract-classic-wrapper">
      <div class="page">
      <!-- HEADER -->
      <header class="header">
        <div class="brand">
          PRANTiK
          <span>PHOTOGRAPHY</span>
        </div>
        <div class="header-title">Agreement Document</div>
        <div class="header-subtitle">Contract Date: <span contenteditable="false">{{ contractDate }}</span> </div>
      </header>

      <!-- CONTENT -->
      <main class="content">
        <!-- MONETARY AGREEMENT CARD -->
        <section class="card">
          <h2 class="section-heading">Monetary Agreement</h2>
          <p>
            This agreement is entered into between the Service Provider and the
            Client for photography services as detailed in this contract. The
            total package cost for all services, including but not limited to
            photography coverage, editing, and deliverables specified herein,
            amounts to ₹ _________ (to be agreed upon by both parties).
          </p>
          <p>
            A non-refundable booking deposit of <strong>30%</strong> of the
            total package cost is required to secure the date and confirm this
            booking. The remaining balance of <strong>70%</strong> must be paid
            at least 7 days prior to the event date. Payment can be made via
            bank transfer, UPI, or any other mutually agreed method. Late
            payments may result in postponement or cancellation of services as
            per the cancellation policy outlined in this agreement.
          </p>

          <p class="note">
            Both parties acknowledge and agree to the monetary terms stated
            above and commit to fulfilling their respective financial
            obligations as outlined in this contract.
          </p>
        </section>

        <!-- 1. PARTIES TO THE AGREEMENT -->
        <section class="section">
          <div class="section-title">1. Parties to the Agreement</div>
          <div class="two-column">
            <div>
              <div class="subheading">Service Provider:</div>
              <div class="field-row">
                <span class="field-label">Business Name:</span> {{merchant.merchantDetails.businessName}}
              </div>
              <div class="field-row">
                <span class="field-label">Phone:</span> {{merchant.merchantDetails.phone}}
              </div>
              <div class="field-row">
                <span class="field-label">Email:</span>
                {{merchant.merchantDetails.email}}
              </div>
              <div class="field-row">{{ merchant.merchantDetails.tagline }}</div>
            </div>

            <div>
              <div class="subheading">Client:</div>
              <div class="field-row">
                <span class="field-label">Name:</span> {{client.name}}
              </div>
              <div class="field-row">
                <span class="field-label">Phone:</span> {{client.phone}}
              </div>
              <div class="field-row">
                <span class="field-label">Email:</span> {{client.email}}
              </div>
              <div class="field-row">
                <span class="field-label">Booking Date:</span> {{project.dateOfBooking}}
              </div>
            </div>
          </div>
        </section>

        <!-- 2. EVENT DETAILS -->
        <section class="section">
          <div class="section-title">2. Event Details</div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Event Date</th>
                  <th>Venue</th>
                  <th>Assignment</th>
                  <th>Team Size</th>
                </tr>
              </thead>
              <tbody>
                    {{#each events}}
                        <tr>
                        <td>{{eventDate}}</td>
                        <td>{{venue}}</td>
                        <td>{{assignment}}</td>
                         <td>{{team}}</td>
                        </tr>
                    {{/each}}

              </tbody>
            </table>
          </div>
        </section>

        <!-- 3. DELIVERABLES -->
        <section class="section">
          <div class="section-title">3. Deliverables</div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Delivery Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                    {{#each deliverables}}
                        <tr>
                        <td>{{eventDate}}</td>
                        <td>{{venue}}</td>
                        <td>{{assignment}}</td>
                         <td>{{team}}</td>
                        </tr>
                    {{/each}}
              </tbody>
            </table>
          </div>
        </section>

        <!-- 4. TERMS AND CONDITIONS -->
        <section class="section">
          <div class="section-title">4. Terms and Conditions</div>

          <div class="terms-section">
            <div class="terms-subtitle">4.1 Payment Terms</div>
            <ul class="terms-list">
              <li>
                A non-refundable deposit of 30% of the total package cost is
                required to confirm the booking.
              </li>
              <li>
                The remaining balance must be paid at least 7 days before the
                event date.
              </li>
              <li>
                All payments should be made via bank transfer or as agreed upon
                by both parties.
              </li>
            </ul>

            <div class="terms-subtitle">4.2 Cancellation Policy</div>
            <ul class="terms-list">
              <li>
                Cancellations made 60+ days before the event: 50% refund of
                deposit.
              </li>
              <li>
                Cancellations made 30–59 days before: 25% refund of deposit.
              </li>
              <li>Cancellations made less than 30 days before: No refund.</li>
            </ul>

            <div class="terms-subtitle">4.3 Photography Coverage</div>
            <ul class="terms-list">
              <li>
                The photographer will arrive at the scheduled time and stay for
                the agreed-upon duration.
              </li>
              <li>
                Overtime charges will apply if coverage extends beyond the
                agreed hours, at the rate specified in the package.
              </li>
              <li>
                We will make every effort to capture all important moments, but
                specific shots cannot be guaranteed.
              </li>
            </ul>

            <div class="terms-subtitle">4.4 Image Editing and Delivery</div>
            <ul class="terms-list">
              <li>
                All images will be professionally edited and color-corrected.
              </li>
              <li>
                Edited photos will be delivered within the timeframe specified
                in the deliverables section.
              </li>
              <li>
                RAW/unedited files are not included unless specifically
                mentioned in the package.
              </li>
              <li>
                Photos will be delivered via online gallery or as specified in
                the deliverables.
              </li>
            </ul>

            <div class="terms-subtitle">4.5 Copyright and Usage Rights</div>
            <ul class="terms-list">
              <li>The photographer retains full copyright of all images.</li>
              <li>
                The client receives a personal use license to print, share, and
                post images on social media with proper credit.
              </li>
              <li>
                Commercial use of images requires written permission from the
                photographer.
              </li>
              <li>
                The photographer reserves the right to use images for portfolio,
                marketing, and promotional purposes.
              </li>
            </ul>

            <div class="terms-subtitle">4.6 Liability</div>
            <ul class="terms-list">
              <li>
                The photographer will take utmost care with equipment but is not
                liable for photos not taken due to camera malfunction or
                circumstances beyond control.
              </li>
              <li>
                Backup equipment will be available on-site to minimize risks.
              </li>
              <li>
                The photographer is not responsible for family disputes, venue
                restrictions, or poor lighting conditions affecting photo
                quality.
              </li>
            </ul>

            <div class="terms-subtitle">4.7 Force Majeure</div>
            <ul class="terms-list">
              <li>
                In case of extreme weather, natural disasters, illness, or other
                unforeseen circumstances, the photographer will make reasonable
                efforts to provide a replacement photographer.
              </li>
              <li>
                If no replacement is available, the deposit will be refunded in
                full.
              </li>
            </ul>

            <div class="terms-subtitle">4.8 Client Responsibilities</div>
            <ul class="terms-list">
              <li>
                The client must inform the photographer of any special shots or
                family groupings required.
              </li>
              <li>
                The client is responsible for obtaining necessary venue
                permissions for photography.
              </li>
              <li>
                The client should designate a point person to assist the
                photographer with family groupings and schedules.
              </li>
            </ul>

            <div class="terms-subtitle">4.9 Data Retention</div>
            <ul class="terms-list">
              <li>
                Digital files will be retained for a minimum of 6 months after
                delivery.
              </li>
              <li>
                After this period, the photographer is not obligated to maintain
                backups.
              </li>
              <li>
                Clients are encouraged to make their own backups upon receiving
                the photos.
              </li>
            </ul>

            <div class="terms-subtitle">4.10 Dispute Resolution</div>
            <ul class="terms-list">
              <li>
                Any disputes arising from this agreement will be resolved
                through mediation.
              </li>
              <li>
                Both parties agree to work in good faith to resolve any issues
                amicably.
              </li>
            </ul>
          </div>
        </section>

        <!-- 5. SIGNATURES -->
        <section class="section signatures">
          <div class="section-title">5. Signatures</div>

          <div class="signature-columns">
            <div>
              <div class="signature-label">Client Signature:</div>
              <div class="signature-line"></div>
              <div class="signature-meta">
                <div><span>Name:</span> Ritwik</div>
                <div><span>Date:</span> ______________</div>
              </div>
            </div>

            <div>
              <div class="signature-label">Service Provider's Signature:</div>
              <div class="signature-line"></div>
              <div class="signature-meta">
                <div><span>Name:</span> ______________</div>
                <div><span>Date:</span> ______________</div>
              </div>
            </div>
          </div>

          <div class="footer-note">
            This agreement is binding upon signing by both parties. Please
            retain a copy for your records.
          </div>
        </section>
      </main>
      </div>
    </div>
</html>`;
