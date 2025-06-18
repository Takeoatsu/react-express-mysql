

# This file contains the Terraform variables for the React DevOps project.
# Ensure that the values provided here match the requirements of your Azure environment.
# For more information, please refer to the official documentation: https://registry.terraform.io/providers/hash
#icorp/azurerm/latest/docs
# and https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group
subscription_id       = "61eb45e3-eb42-48bf-8cb6-2fa9d1f53eec" # Replace with your actual Azure Subscription ID
resource_group_name   = "react-express-DevRG"
location              = "Canada Central"
storage_account_name  = "reactstaticwebapp1"
acr_name              = "reactexpressacr1"
backend_app_name      = "react-express-backend1"
sql_server_name       = "react-express-db1"
sql_database_name     = "react-express-db1"
image_tag = "v1"
# Note: The SQL admin password should be stored securely and not hard-coded in production environments.
# Ensure that the storage account name is globally unique.