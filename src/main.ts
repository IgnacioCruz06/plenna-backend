import { setupDB } from "./db";
import { log } from "./libraries/Log";
import { setupServer } from "./server";

async function main(): Promise<void> {
  try {
    setupDB();
    setupServer();
  } catch (error) {
    log.error(error);
  }
}

main();
