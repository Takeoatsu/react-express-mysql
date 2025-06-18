
# This file defines the variables used in the Terraform configuration.
variable "subscription_id" {
  description = "The Azure Subscription ID where resources will be created."
  
}
variable "resource_group_name" {
    description = "The name of the resource group where resources will be created."
}
variable "location" {
    description = "The Azure region where resources will be deployed."
}
variable "storage_account_name" {
    description = "The name of the storage account to be created."
}
variable "acr_name" {
    description = "The name of the Azure Container Registry to be created."
}
variable "backend_app_name" {
    description = "The name of the backend App Service to be created."
}
variable "sql_server_name" {
    description = "The name of the SQL Server to be created."
}
variable "sql_database_name" {
    description = "The name of the SQL Database to be created."
}
variable "image_tag" {
    description = "The tag for the Docker image to be used in the backend App Service."
}
variable "aks_name" {
    description = "The name of the Azure Kubernetes Service cluster to be created."
    default = "react-express-aks"
}
variable "dns_prefix" {
    description = "The DNS prefix for the Azure Kubernetes Service cluster."
    default = "reactexpress"
}
variable "node_vm_size" {
    description = "The size of the virtual machines for the AKS cluster nodes."  
    default = "Standard_DS2_v2"
}
variable "node_count" {
    description = "The number of nodes in the AKS cluster."  
    default = 1
}

