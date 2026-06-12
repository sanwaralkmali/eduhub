// Thin wrapper around next-intl (CLAUDE.md Pattern 4).
// Always import the translation hook from here so we can swap the i18n
// backend later without touching every component.
export { useTranslations as useTranslation } from "next-intl";
