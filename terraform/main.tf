
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

data "azurerm_resource_group" "main" {
  name = var.resource_group_name
}

data "azurerm_client_config" "current" {}

data "azurerm_key_vault" "main" {
  name                = "react-express-kv"
  resource_group_name = data.azurerm_resource_group.main.name
}

data "azurerm_key_vault_secret" "sql_admin_user" {
  name         = "sqlAdminUser"
  key_vault_id = data.azurerm_key_vault.main.id
}

data "azurerm_key_vault_secret" "sql_admin_password" {
  name         = "sqlAdminPassword"
  key_vault_id = data.azurerm_key_vault.main.id
}

locals {
  db_connection_string = format(
    "Server=tcp:%s.database.windows.net,3306;Initial Catalog=%s;Persist Security Info=False;User ID=%s;Password=%s;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
    var.sql_server_name,
    var.sql_database_name,
    data.azurerm_key_vault_secret.sql_admin_user.value,
    data.azurerm_key_vault_secret.sql_admin_password.value
  )
  }

resource "azurerm_storage_account" "frontend" {
  name                     = var.storage_account_name
  resource_group_name      = data.azurerm_resource_group.main.name
  location                 = data.azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_account_static_website" "frontend" {
  storage_account_id = azurerm_storage_account.frontend.id
  index_document     = "index.html"
  error_404_document = "index.html"
}

resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = data.azurerm_resource_group.main.name
  location            = data.azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_service_plan" "reactAppServicePlan1" {
  name                = "reactAppServicePlan1"
  location            = data.azurerm_resource_group.main.location
  resource_group_name = data.azurerm_resource_group.main.name
  sku_name            = "B1"
  os_type             = "Linux"
}

resource "azurerm_linux_web_app" "backend" {
  name                = var.backend_app_name
  location            = data.azurerm_resource_group.main.location
  resource_group_name = data.azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.reactAppServicePlan1.id
  https_only          = true

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    "DB_CONNECTION_STRING"                 = local.db_connection_string
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE"  = "false"
  }

  site_config {
    }
}

resource "azurerm_role_assignment" "acr_pull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_web_app.backend.identity[0].principal_id
}

resource "azurerm_application_insights" "insights" {
  name                = "reactexpressAppInsights1"
  location            = var.location
  resource_group_name = var.resource_group_name
  application_type    = "web"
}

resource "azurerm_mssql_server" "sqlserver" {
  name                         = var.sql_server_name
  resource_group_name          = data.azurerm_resource_group.main.name
  location                     = data.azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = data.azurerm_key_vault_secret.sql_admin_user.value
  administrator_login_password = data.azurerm_key_vault_secret.sql_admin_password.value
}

resource "azurerm_mssql_database" "sqldb" {
  name      = var.sql_database_name
  server_id = azurerm_mssql_server.sqlserver.id
  sku_name  = "Basic"
}