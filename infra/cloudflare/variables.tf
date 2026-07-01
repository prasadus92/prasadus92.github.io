# Account ID is a non-secret identifier, safe to commit.
variable "cloudflare_account_id" {
  type        = string
  description = "Cloudflare account ID (Prasad Personal)."
  default     = "47ac3abdfba61feac39847f19ee678b1"
}

# SECRET. Never commit. Provide via `export TF_VAR_cloudflare_api_token=...`
# or a gitignored terraform.tfvars. In CI, use a GitHub Actions secret.
variable "cloudflare_api_token" {
  type        = string
  description = "Cloudflare API token with Pages/DNS/Zone edit scope."
  sensitive   = true
}
