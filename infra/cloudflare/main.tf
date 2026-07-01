terraform {
  required_version = ">= 1.6"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
  # State is kept local by default and gitignored (see ../../.gitignore).
  # For a shared/remote backend later, an r2/s3 backend can go here.
}

# The API token is supplied via the TF_VAR_cloudflare_api_token environment
# variable (or a gitignored terraform.tfvars). It is a SECRET and is never
# committed to this public repo.
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# ---------------------------------------------------------------------------
# Cloudflare Pages project that hosts the site (v1 at /, v2 under /v2). The
# 50/50 A/B split lives in the repo as a Pages Function (functions/_middleware.js),
# so it is version-controlled here, not in Terraform.
#
# This project was first created with `wrangler pages project create`. To bring
# it under Terraform, import it once:
#   terraform import cloudflare_pages_project.site <account_id>/prasad-tech
# ---------------------------------------------------------------------------
resource "cloudflare_pages_project" "site" {
  account_id        = var.cloudflare_account_id
  name              = "prasad-tech"
  production_branch = "main"

  build_config {
    build_command   = "npm run build"
    destination_dir = "dist"
  }

  source {
    type = "github"
    config {
      owner                         = "prasadus92"
      repo_name                     = "prasadus92.github.io"
      production_branch             = "main"
      pr_comments_enabled           = true
      deployments_enabled           = true
      preview_deployment_setting    = "all" # every PR/branch gets a preview URL
      preview_branch_includes       = ["*"]
    }
  }
}

# ---------------------------------------------------------------------------
# Domain cutover (completed during the GoDaddy -> Cloudflare step). Left as a
# template so the plan stays clean until the zone actually moves to Cloudflare.
#
# resource "cloudflare_zone" "prasad_tech" {
#   account_id = var.cloudflare_account_id
#   zone       = "prasad.tech"
#   plan       = "free"
# }
#
# resource "cloudflare_pages_domain" "apex" {
#   account_id   = var.cloudflare_account_id
#   project_name = cloudflare_pages_project.site.name
#   domain       = "prasad.tech"
# }
#
# resource "cloudflare_record" "apex" {
#   zone_id = cloudflare_zone.prasad_tech.id
#   name    = "prasad.tech"
#   type    = "CNAME"
#   content = "${cloudflare_pages_project.site.name}.pages.dev"
#   proxied = true
# }
#
# resource "cloudflare_record" "www" {
#   zone_id = cloudflare_zone.prasad_tech.id
#   name    = "www"
#   type    = "CNAME"
#   content = "${cloudflare_pages_project.site.name}.pages.dev"
#   proxied = true
# }
#
# # Free bot protection (the "bots bombarding the site" concern). No paid WAF.
# resource "cloudflare_bot_management" "prasad_tech" {
#   zone_id     = cloudflare_zone.prasad_tech.id
#   fight_mode  = true
# }
