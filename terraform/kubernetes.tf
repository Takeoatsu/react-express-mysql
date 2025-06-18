# This file contains the Kubernetes provider configuration and resources.
provider "kubernetes" {
  # Configure the Kubernetes provider to use the AKS cluster
  host                   = azurerm_kubernetes_cluster.aks.kube_config[0].host
  # Use the client certificate and key from the AKS cluster
  client_certificate     = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].client_certificate)
  # Use the client key from the AKS cluster
  client_key             = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].client_key)
  # Use the cluster CA certificate from the AKS cluster
  cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].cluster_ca_certificate)
}

# This file contains the Kubernetes resources for the backend application.
resource "kubernetes_secret" "backend_db_connection" {
  # Create a Kubernetes secret to store the database connection string
  metadata {
    name = "backend-secret"
  }

    # The secret data is the base64-encoded database connection string
  data = {
    db_connection_string = base64encode(local.db_connection_string)
  }
}
