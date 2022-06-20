import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles, createDocuments, createSetting } from "./libs/initialSetup";

import coursesRoutes from "./routes/courses.routes";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import documentsRoutes from "./routes/documents.routes";
import employeesRoutes from "./routes/employees.routes";
import providersRoutes from "./routes/providers.routes";
import positionsRoutes from "./routes/positions.routes";
import courseTypesRoutes from "./routes/courseTypes.routes";
import statusProspectsRoutes from "./routes/statusProspects.routes";
import leadSourcesRoutes from "./routes/leadSources.routes";
import mediumContactsRoutes from "./routes/mediumContacts.routes";
import settingsRoutes from "./routes/settings.routes";
import topicsRoutes from "./routes/topics.routes";
import clientsRoutes from "./routes/clients.routes";
import ordersRoutes from "./routes/orders.routes";
import purchasesRoutes from "./routes/purchases.routes";
import salesRoutes from "./routes/sales.routes";
import profilesRoutes from "./routes/profiles.routes";
import goalsRoutes from "./routes/goals.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import centersRoutes from "./routes/centers.routes";

const app = express();
const cors = require("cors");
createRoles();
createDocuments();
createSetting();

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/courses", coursesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/providers", providersRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/courseTypes", courseTypesRoutes);
app.use("/api/statusProspects", statusProspectsRoutes);
app.use("/api/prospectOrigins", leadSourcesRoutes);
app.use("/api/contactForms", mediumContactsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/centers", centersRoutes);

export default app;
