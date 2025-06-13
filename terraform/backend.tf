terraform {
  backend "azurerm" {
    resource_group_name  = "react-express-DevRG"
    storage_account_name = "reactterraformstate"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}