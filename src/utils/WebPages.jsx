import { sidebar } from "../app/classes/sidebar";
import { webPage } from "../app/classes/webPage";
import { ACTION, RESOURCE_TYPE } from "./constants";

import DashboardPage from "../features/dashboard/pages/DashboardPage"
import OperatorPage from "../features/operator/pages/OperatorPage";

export const webPages = [];

const dashboard = new webPage(
    RESOURCE_TYPE.MANAGE_DASHBOARD,
    ACTION.VIEW,
    new sidebar("Dashboard", "dashboard", null, <DashboardPage />)
)

const manageOperator = new webPage(
    RESOURCE_TYPE.MANAGE_OPERATOR,
    ACTION.VIEW,
    new sidebar("Manage Operator", "operator", null, <OperatorPage />)
)

webPages.push(dashboard, manageOperator);
