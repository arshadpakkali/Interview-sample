import "./pre-start"; // Must be the first import
import "module-alias/register";
import app from "./server";
import "./db/db";
import logger from "./shared/logger";

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info(`Express server started on port: ${port}`);
});
