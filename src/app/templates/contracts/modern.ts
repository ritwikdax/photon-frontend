export const CONTRACT_MODERN: string = `<!DOCTYPE html>
<html lang="en">


    <meta charset="UTF-8">
    <title>Wedding Photography Agreement</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Font (modern look) -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">

    <style>
      .contract-modern-wrapper {
        --page-width: 850px;
        --page-bg: #ffffff;
        --body-bg: #fafafa;
        --primary: #2563eb; /* vibrant blue */
        --primary-light: #dbeafe;
        --accent: #f59e0b; /* amber accent */
        --text-main: #1f2937;
        --text-muted: #6b7280;
        --border-soft: #e5e7eb;
        --section-bg: #f8fafc;
        --heading-size: 14px;
      }

      .contract-modern-wrapper * {
        box-sizing: border-box;
      }

      .contract-modern-wrapper {
        margin: 0;
        padding: 0;
        font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        color: var(--text-main);
        -webkit-font-smoothing: antialiased;
      }

      .contract-modern-wrapper .page {
        max-width: var(--page-width);
        margin: 0 auto;
        background: var(--page-bg);
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.08);
        overflow: hidden;
        border-left: 4px solid var(--primary);
        border-right: 4px solid var(--primary);
      }

      /* HEADER */

      .contract-modern-wrapper .header {
        background: linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%);
        color: #ffffff;
        padding: 40px 48px;
        position: relative;
        overflow: hidden;
      }

      .contract-modern-wrapper .header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -10%;
        width: 300px;
        height: 300px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
      }

      .contract-modern-wrapper .brand {
        font-weight: 700;
        font-size: 28px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        position: relative;
        z-index: 1;
      }

      .contract-modern-wrapper .brand span {
        font-weight: 300;
        font-size: 12px;
        letter-spacing: 0.24em;
        display: block;
        margin-top: 6px;
        opacity: 0.95;
      }

      .contract-modern-wrapper .header-title {
        margin-top: 24px;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        position: relative;
        z-index: 1;
      }

      .contract-modern-wrapper .header-subtitle {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;
        opacity: 0.9;
        position: relative;
        z-index: 1;
      }

      /* BODY CONTENT */

      .contract-modern-wrapper .content {
        padding: 40px 48px 48px;
      }

      .contract-modern-wrapper .card {
        background: var(--primary-light);
        border-radius: 12px;
        padding: 28px 32px;
        border-left: 4px solid var(--primary);
        margin-bottom: 36px;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
      }

      .contract-modern-wrapper h2.section-heading {
        margin: 0 0 16px;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--primary);
      }

      .contract-modern-wrapper p {
        margin: 8px 0;
        font-size: 13px;
        line-height: 1.7;
      }

      .contract-modern-wrapper .note {
        margin-top: 20px;
        font-size: 12px;
        color: var(--text-muted);
        font-style: italic;
        padding: 12px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 6px;
      }

      .contract-modern-wrapper .section {
        margin-top: 32px;
        padding: 24px;
        background: var(--section-bg);
        border-radius: 10px;
        border: 1px solid var(--border-soft);
      }

      .contract-modern-wrapper .section-title {
        font-size: 15px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 16px;
        color: var(--primary);
        padding-bottom: 8px;
        border-bottom: 2px solid var(--accent);
        display: inline-block;
      }

      .contract-modern-wrapper .subheading {
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--primary);
      }

      .contract-modern-wrapper .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        font-size: 13px;
        margin-top: 16px;
      }

      .contract-modern-wrapper .field-label {
        font-weight: 600;
        color: var(--text-main);
      }

      .contract-modern-wrapper .field-row {
        margin-bottom: 6px;
        line-height: 1.6;
      }

      /* TABLES */

      .contract-modern-wrapper .table-wrapper {
        margin-top: 16px;
        border-radius: 10px;
        border: 2px solid var(--border-soft);
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      }

      .contract-modern-wrapper table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      .contract-modern-wrapper thead {
        background: var(--primary);
        color: white;
      }

      .contract-modern-wrapper th,
      .contract-modern-wrapper td {
        padding: 12px 14px;
        text-align: left;
        vertical-align: top;
      }

      .contract-modern-wrapper th {
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .contract-modern-wrapper tbody tr:nth-child(even) {
        background: #f9fafb;
      }

      .contract-modern-wrapper tbody tr:not(:last-child) td {
        border-bottom: 1px solid var(--border-soft);
      }

      .contract-modern-wrapper .muted-small {
        display: block;
        font-size: 11px;
        color: var(--text-muted);
        margin-top: 3px;
      }

      .contract-modern-wrapper .team-size {
        font-size: 11px;
        line-height: 1.5;
      }

      /* TERMS & CONDITIONS */

      .contract-modern-wrapper .terms-section {
        margin-top: 12px;
        font-size: 13px;
      }

      .contract-modern-wrapper .terms-subtitle {
        font-weight: 600;
        margin-top: 16px;
        margin-bottom: 6px;
        color: var(--primary);
        font-size: 13px;
      }

      .contract-modern-wrapper ul.terms-list {
        margin: 0 0 6px 20px;
        padding: 0;
        list-style-type: none;
      }

      .contract-modern-wrapper ul.terms-list li {
        margin-bottom: 4px;
        line-height: 1.6;
        position: relative;
        padding-left: 16px;
      }

      .contract-modern-wrapper ul.terms-list li::before {
        content: '→';
        position: absolute;
        left: 0;
        color: var(--accent);
        font-weight: bold;
      }

      /* SIGNATURES */

      .contract-modern-wrapper .signatures {
        margin-top: 40px;
      }

      .contract-modern-wrapper .signature-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        margin-top: 24px;
        font-size: 13px;
      }

      .contract-modern-wrapper .signature-label {
        font-weight: 600;
        margin-bottom: 60px;
        color: var(--primary);
      }

      .contract-modern-wrapper .signature-line {
        border-bottom: 2px solid var(--primary);
        margin-bottom: 10px;
        height: 0;
      }

      .contract-modern-wrapper .signature-meta {
        font-size: 12px;
      }

      .contract-modern-wrapper .signature-meta span {
        display: inline-block;
        min-width: 60px;
        font-weight: 600;
      }

      .contract-modern-wrapper .footer-note {
        margin-top: 40px;
        text-align: center;
        font-size: 11px;
        color: var(--text-muted);
        padding: 16px;
        background: var(--section-bg);
        border-radius: 8px;
      }

      /* PRINT STYLES (optional, for PDF export) */
      @media print {
        .contract-modern-wrapper {
          padding: 0;
          background: #ffffff;
        }

        .contract-modern-wrapper .page {
          box-shadow: none;
          border-radius: 0;
        }
      }

      @media (max-width: 768px) {
        .contract-modern-wrapper .content,
        .contract-modern-wrapper .header {
          padding: 24px 20px;
        }

        .contract-modern-wrapper .two-column,
        .contract-modern-wrapper .signature-columns {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
    </style>
  
  
    <div class="contract-modern-wrapper">
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
                <tr>
                  <td>Edited Photos</td>
                  <td>Digital</td>
                  <td>90 days</td>
                  <td>Delivery date may vary based on image selection delay</td>
                </tr>
                <tr>
                  <td>Full Cinematic HD Video</td>
                  <td>Digital</td>
                  <td>90 days</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>1 Cinematic HD Teaser</td>
                  <td>Digital</td>
                  <td>90 days</td>
                  <td>Approx: 3 min</td>
                </tr>
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
