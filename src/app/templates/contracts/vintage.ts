export const CONTRACT_VINTAGE: string = `<!DOCTYPE html>
<html lang="en">


    <meta charset="UTF-8">
    <title>Wedding Photography Agreement</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Font (typewriter/vintage look) -->
    <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&amp;family=Special+Elite&amp;display=swap" rel="stylesheet">

    <style>
      .contract-vintage-wrapper {
        --page-width: 850px;
        --page-bg: #f5f1e8;
        --paper-bg: #faf8f3;
        --body-bg: #e8e4d9;
        --primary: #3d2817; /* deep brown */
        --accent: #8b4513; /* saddle brown */
        --text-main: #2c1810;
        --text-muted: #6b5d52;
        --border-vintage: #d4c5b0;
        --section-bg: #fff9ed;
        --stamp-color: #a0522d;
        --heading-size: 13px;
      }

      .contract-vintage-wrapper * {
        box-sizing: border-box;
      }

      .contract-vintage-wrapper {
        margin: 0;
        padding: 0;
        font-family: "Courier Prime", "Courier New", monospace;
        color: var(--text-main);
        -webkit-font-smoothing: antialiased;
        background: var(--body-bg);
      }

      .contract-vintage-wrapper .page {
        max-width: var(--page-width);
        margin: 0 auto;
        background: var(--paper-bg);
        box-shadow: 0 0 40px rgba(61, 40, 23, 0.15),
                    inset 0 0 100px rgba(139, 69, 19, 0.03);
        overflow: hidden;
        border: 2px solid var(--border-vintage);
        position: relative;
      }

      .contract-vintage-wrapper .page::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(139, 69, 19, 0.015) 2px,
            rgba(139, 69, 19, 0.015) 4px
          );
        pointer-events: none;
        z-index: 1;
      }

      /* HEADER */

      .contract-vintage-wrapper .header {
        background: var(--primary);
        color: #f5f1e8;
        padding: 32px 48px;
        border-bottom: 4px double var(--accent);
        position: relative;
        text-align: center;
      }

      .contract-vintage-wrapper .header::after {
        content: '✦';
        position: absolute;
        top: 12px;
        right: 24px;
        font-size: 20px;
        color: var(--accent);
      }

      .contract-vintage-wrapper .header::before {
        content: '✦';
        position: absolute;
        top: 12px;
        left: 24px;
        font-size: 20px;
        color: var(--accent);
      }

      .contract-vintage-wrapper .brand {
        font-family: "Special Elite", "Courier Prime", monospace;
        font-weight: 700;
        font-size: 32px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
      }

      .contract-vintage-wrapper .brand span {
        font-family: "Courier Prime", monospace;
        font-weight: 400;
        font-size: 11px;
        letter-spacing: 0.35em;
        display: block;
        margin-top: 8px;
        opacity: 0.9;
      }

      .contract-vintage-wrapper .header-title {
        margin-top: 20px;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        border-top: 1px solid var(--accent);
        border-bottom: 1px solid var(--accent);
        padding: 8px 0;
        display: inline-block;
      }

      .contract-vintage-wrapper .header-subtitle {
        margin-top: 12px;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.05em;
      }

      /* BODY CONTENT */

      .contract-vintage-wrapper .content {
        padding: 36px 48px 44px;
        position: relative;
        z-index: 2;
      }

      .contract-vintage-wrapper .card {
        background: var(--section-bg);
        border: 3px double var(--border-vintage);
        padding: 24px 28px;
        margin-bottom: 32px;
        position: relative;
        box-shadow: inset 0 0 20px rgba(139, 69, 19, 0.04);
      }

      .contract-vintage-wrapper .card::before {
        content: '◆';
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--paper-bg);
        padding: 0 12px;
        color: var(--accent);
        font-size: 16px;
      }

      .contract-vintage-wrapper h2.section-heading {
        margin: 0 0 14px;
        font-size: 15px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        text-align: center;
        color: var(--primary);
        border-bottom: 2px solid var(--accent);
        padding-bottom: 6px;
      }

      .contract-vintage-wrapper p {
        margin: 8px 0;
        font-size: 13px;
        line-height: 1.8;
        text-align: justify;
      }

      .contract-vintage-wrapper .note {
        margin-top: 18px;
        font-size: 11px;
        color: var(--text-muted);
        font-style: italic;
        padding: 10px 14px;
        border-left: 3px solid var(--accent);
        background: rgba(139, 69, 19, 0.03);
      }

      .contract-vintage-wrapper .section {
        margin-top: 28px;
        padding: 20px 24px;
        background: var(--section-bg);
        border: 2px solid var(--border-vintage);
        border-radius: 2px;
        box-shadow: 2px 2px 0 rgba(61, 40, 23, 0.08);
      }

      .contract-vintage-wrapper .section-title {
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        margin-bottom: 14px;
        color: var(--primary);
        text-align: center;
        position: relative;
        padding-bottom: 10px;
      }

      .contract-vintage-wrapper .section-title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 2px;
        background: var(--accent);
      }

      .contract-vintage-wrapper .subheading {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 8px;
        color: var(--primary);
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      .contract-vintage-wrapper .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        font-size: 12px;
        margin-top: 16px;
      }

      .contract-vintage-wrapper .field-label {
        font-weight: 700;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      .contract-vintage-wrapper .field-row {
        margin-bottom: 6px;
        line-height: 1.7;
      }

      /* TABLES */

      .contract-vintage-wrapper .table-wrapper {
        margin-top: 16px;
        border: 3px double var(--border-vintage);
        overflow: hidden;
        background: var(--section-bg);
      }

      .contract-vintage-wrapper table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      .contract-vintage-wrapper thead {
        background: var(--primary);
        color: #f5f1e8;
        border-bottom: 2px solid var(--accent);
      }

      .contract-vintage-wrapper th,
      .contract-vintage-wrapper td {
        padding: 10px 12px;
        text-align: left;
        vertical-align: top;
        border-right: 1px dotted var(--border-vintage);
      }

      .contract-vintage-wrapper th:last-child,
      .contract-vintage-wrapper td:last-child {
        border-right: none;
      }

      .contract-vintage-wrapper th {
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .contract-vintage-wrapper tbody tr {
        background: repeating-linear-gradient(
          180deg,
          transparent,
          transparent 1px,
          rgba(139, 69, 19, 0.02) 1px,
          rgba(139, 69, 19, 0.02) 2px
        );
      }

      .contract-vintage-wrapper tbody tr:not(:last-child) td {
        border-bottom: 1px solid var(--border-vintage);
      }

      .contract-vintage-wrapper .muted-small {
        display: block;
        font-size: 10px;
        color: var(--text-muted);
        margin-top: 3px;
        font-style: italic;
      }

      .contract-vintage-wrapper .team-size {
        font-size: 11px;
        line-height: 1.6;
      }

      /* TERMS & CONDITIONS */

      .contract-vintage-wrapper .terms-section {
        margin-top: 12px;
        font-size: 12px;
      }

      .contract-vintage-wrapper .terms-subtitle {
        font-weight: 700;
        margin-top: 14px;
        margin-bottom: 6px;
        color: var(--primary);
        font-size: 12px;
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      .contract-vintage-wrapper ul.terms-list {
        margin: 0 0 6px 20px;
        padding: 0;
        list-style-type: none;
      }

      .contract-vintage-wrapper ul.terms-list li {
        margin-bottom: 4px;
        line-height: 1.7;
        position: relative;
        padding-left: 18px;
        text-align: justify;
      }

      .contract-vintage-wrapper ul.terms-list li::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--accent);
        font-weight: bold;
      }

      /* SIGNATURES */

      .contract-vintage-wrapper .signatures {
        margin-top: 36px;
        border-top: 2px solid var(--border-vintage);
        padding-top: 24px;
      }

      .contract-vintage-wrapper .signature-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        margin-top: 20px;
        font-size: 12px;
      }

      .contract-vintage-wrapper .signature-label {
        font-weight: 700;
        margin-bottom: 55px;
        color: var(--primary);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 11px;
      }

      .contract-vintage-wrapper .signature-line {
        border-bottom: 2px dotted var(--primary);
        margin-bottom: 8px;
        height: 0;
      }

      .contract-vintage-wrapper .signature-meta {
        font-size: 11px;
      }

      .contract-vintage-wrapper .signature-meta span {
        display: inline-block;
        min-width: 60px;
        font-weight: 700;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      .contract-vintage-wrapper .footer-note {
        margin-top: 36px;
        text-align: center;
        font-size: 10px;
        color: var(--text-muted);
        padding: 14px;
        border: 1px solid var(--border-vintage);
        background: rgba(139, 69, 19, 0.03);
        font-style: italic;
        position: relative;
      }

      .contract-vintage-wrapper .footer-note::before {
        content: '◈';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--paper-bg);
        padding: 0 8px;
        color: var(--accent);
      }

      /* PRINT STYLES (optional, for PDF export) */
      @media print {
        .contract-vintage-wrapper {
          padding: 0;
          background: #ffffff;
        }

        .contract-vintage-wrapper .page {
          box-shadow: none;
          border-radius: 0;
        }
      }

      @media (max-width: 768px) {
        .contract-vintage-wrapper .content,
        .contract-vintage-wrapper .header {
          padding: 24px 20px;
        }

        .contract-vintage-wrapper .two-column,
        .contract-vintage-wrapper .signature-columns {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
    </style>
  
  
    <div class="contract-vintage-wrapper">
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
