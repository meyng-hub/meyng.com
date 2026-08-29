/**
 * The eNdara WhatsApp bot.
 *
 * This is the most directly verifiable claim MEYNG makes: anyone can message
 * the bot from any phone and get a reply, with no install and no account.
 * The site tells readers to do exactly that, so the link has to work.
 *
 * Number: +237 658 763 678 — the Meta Business production number, live since
 * April 2026. Verified 2026-08-29 against the eNdara platform config (the
 * documented number and the WHATSAPP_PHONE_NUMBER_ID in the deployment
 * environment agree). A dead number here is worse than no link at all, so
 * re-check it if the eNdara messaging config ever changes.
 */
export const WHATSAPP_BOT_NUMBER = "237658763678";

/**
 * The bot maps both "HELP" and "AIDE" to its help command, so each locale can
 * pre-fill the keyword its readers would type. The pre-fill turns "message the
 * bot" from an instruction into one tap.
 */
export function whatsappBotLink(locale: string): string {
  return `https://wa.me/${WHATSAPP_BOT_NUMBER}?text=${locale === "fr" ? "AIDE" : "HELP"}`;
}
