import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTS } from "@/lib/vendors";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="view">
      <div className="wrap">
        <span className="eyebrow">About Libango Holdings · LEC Super Vendor</span>
        <p className="about-lede">
          Electricity in Liberia is prepaid — but buying it shouldn&apos;t cost you a journey. As
          LEC&apos;s super vendor, we buy power at scale and put it everywhere you already are.
        </p>
        <div className="about-body">
          <p>
            Libango Holdings is an authorized super vendor of the Liberia Electricity Corporation. We
            purchase prepaid electricity tokens from LEC in bulk and move them through two channels: a
            network of more than 180 registered retail vendors — business centers, provision shops,
            forex bureaus, market stalls — and direct integrations with the third-party platforms
            Liberians use every day.
          </p>
          <p>
            Every vendor in the network is registered, trained, and settles through Libango&apos;s
            platform, so a token bought at a roadside kiosk is exactly as good as one bought at a head
            office: the same 20 digits, the same kilowatt-hours, recorded against the same meter.
          </p>
          <p>
            Beyond the physical network, Libango is integrated with the telcos (MTN Mobile Money,
            Orange Money), the banks (EcoBank, UBA, SIB Bank, GT Bank), and the payment and top-up
            platforms powering everyday transactions (TIPME, KOLA Financial, SOCHITEL) — so customers
            buy tokens comfortably from the accounts and apps already in their pockets.
          </p>
        </div>
        <div className="value-row">
          <div className="value">
            <h3>Reliability</h3>
            <p>Tokens clear against LEC in real time. What you buy is on your meter, every time.</p>
          </div>
          <div className="value">
            <h3>Proximity</h3>
            <p>
              Vendors where people actually are — markets, junctions, and neighborhoods, not just city
              centers.
            </p>
          </div>
          <div className="value">
            <h3>Accountability</h3>
            <p>Every sale is receipted and retrievable. Lose the slip and your last token is one lookup away.</p>
          </div>
        </div>

        <div className="faq">
          <span className="eyebrow">Frequently asked questions</span>
          <h2>Quick answers</h2>
          <details>
            <summary>What exactly does Libango do?</summary>
            <div className="a">
              <p>
                Libango Holdings is an authorized super vendor of the Liberia Electricity Corporation.
                We buy prepaid electricity tokens from LEC in bulk and distribute them through 180+
                registered retail vendors and through the banks, telcos, and payment apps we&apos;re
                integrated with — so power is always on sale near you.
              </p>
            </div>
          </details>
          <details>
            <summary>How do I buy an electricity token?</summary>
            <div className="a">
              <p>
                Give any Libango vendor your meter number and the amount you want to buy, in LRD or
                USD. You&apos;ll receive a 20-digit token — key it into your prepaid meter and the
                units load immediately. You can also buy directly inside your bank, mobile money, or
                payment app.
              </p>
            </div>
          </details>
          <details>
            <summary>I lost my token before entering it. What now?</summary>
            <div className="a">
              <p>
                Use <Link href="/token">Retrieve Last Token</Link>. Enter your meter number, pass the
                quick human check, and we&apos;ll show the most recent token issued to that meter —
                the same 20 digits that were on your receipt. It can only reveal your last token; it
                can never create new credit.
              </p>
            </div>
          </details>
          <details>
            <summary>How do I know I got the full amount I paid for?</summary>
            <div className="a">
              <p>
                Every token tells on itself. Run <Link href="/token">Retrieve Last Token</Link> for
                your meter and it shows the token alongside the exact amount paid and the
                kilowatt-hours it carries — so what you handed the vendor and what landed on your
                meter are never a matter of trust, just a lookup. If the numbers don&apos;t match what
                you paid, call Customer Service on{" "}
                <span className="mono">{CONTACTS.customerService}</span>.
              </p>
            </div>
          </details>
          <details>
            <summary>Which platforms can I buy from?</summary>
            <div className="a">
              <p>
                MTN Mobile Money and Orange Money; EcoBank, UBA, SIB Bank, and GT Bank; and TIPME,
                KOLA Financial, and SOCHITEL. The token you receive is the same LEC token no matter
                where you buy — check each platform for its own service charges.
              </p>
            </div>
          </details>
          <details>
            <summary>My token won&apos;t load on my meter. What should I check?</summary>
            <div className="a">
              <p>
                Confirm you&apos;re entering all 20 digits, on the same meter number the token was
                bought for — tokens are locked to one meter. If it still fails, call Customer Service
                on <span className="mono">{CONTACTS.customerService}</span> with your meter number and
                receipt.
              </p>
            </div>
          </details>
          <details>
            <summary>How do I become a Libango vendor?</summary>
            <div className="a">
              <p>
                Apply on the <Link href="/apply">Become a Vendor</Link> page with your business name,
                contacts, location, and your business registration document (PDF or JPG). Our vendor
                team reviews every application and responds within 5 working days. For existing-vendor
                questions, call Vendor Support on{" "}
                <span className="mono">{CONTACTS.vendorSupport}</span>.
              </p>
            </div>
          </details>
        </div>
      </div>
    </main>
  );
}
