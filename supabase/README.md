# Supabase (enquiries backend)

| Item         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| Organisation | Apexon Global Technologies (owned by apexontech2@gmail.com)            |
| Project ref  | `aakehgdlubuzjdswzuvk` (region eu-west-1, Ireland)                     |
| Function URL | `https://aakehgdlubuzjdswzuvk.supabase.co/functions/v1/submit-enquiry` |
| Plan         | Free                                                                   |

- `migrations/` creates the locked `enquiries` table (RLS on, no policies, no
  privileges for anon/authenticated). Read enquiries in the dashboard Table Editor.
- `functions/submit-enquiry/` validates, filters spam, stores and emails each enquiry.
  Deployed with JWT verification off because it is a public form; it protects itself.
- Secrets (Dashboard, Edge Functions, Secrets): `RESEND_API_KEY` (set by the owner),
  optional `NOTIFY_TO`. Never commit keys.

An earlier test project, `apexon-website` (`zzmddcygrtdtaumrgdkk`) in the personal
organisation jbonyo_056, is not used by the site and can be deleted by its owner.
