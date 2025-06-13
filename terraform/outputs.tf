output "frontend_endpoint" {
  description = "public URL of the frontend static website"
  value       = azurerm_storage_account.frontend.primary_web_endpoint
}

output "backend_url" {
  description = "public URL of the backend API"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}/api"
}