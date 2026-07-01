# Cloudflare infrastructure (Terraform)

Infrastructure-as-code for the site's Cloudflare setup: the Pages project, and
(after the domain cutover) the zone, DNS records, custom domain, and free bot
protection. The 50/50 A/B split itself is **not** here; it lives in the repo as
a Pages Function at `functions/_middleware.js`, so it deploys and versions with
the site.

## Secrets (this is a public repo)

Nothing secret is committed. The only secret is a **Cloudflare API token**, which
is supplied at runtime and never written to the repo:

```bash
export TF_VAR_cloudflare_api_token="<token from Cloudflare > My Profile > API Tokens>"
```

`terraform.tfvars`, `*.tfstate`, and `.terraform/` are gitignored. For CI, store
the token as a GitHub Actions secret (`CLOUDFLARE_API_TOKEN`) and pass it through.

Everything else (PostHog project key, GA4 measurement ID) is a **public,
client-side** key by design and lives in the site code, not here.

## Usage

```bash
cd infra/cloudflare
terraform init
# one-time, to adopt the project wrangler already created:
terraform import cloudflare_pages_project.site 47ac3abdfba61feac39847f19ee678b1/prasad-tech
terraform plan
terraform apply
```

The zone/DNS/custom-domain/bot-management resources are commented in `main.tf`
and get uncommented + applied during the GoDaddy -> Cloudflare cutover.
