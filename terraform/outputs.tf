output "frontend_endpoint" {
  description = "public URL of the frontend static website"
  value       = azurerm_storage_account.frontend.primary_web_endpoint
}

output "backend_url" {
  description = "public URL of the backend API"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}/api"
}

output "kube_config" {
  description = "Kubeconfig for the AKS cluster"
  value       = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive = true
}
output "aks_cluster_name" {
  description = "Name of the AKS cluster"
  value       = azurerm_kubernetes_cluster.aks.name 
}